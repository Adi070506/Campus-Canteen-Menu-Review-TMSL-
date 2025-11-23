'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

/**
 * Server action to submit a rating for a dish.
 * Expects the client to pass a FormData object or individual arguments.
 * Returns a simple success/error object.
 */
export async function submitRating(
    dishId: string,
    rating: number,
    tags: string[],
    comment?: string
) {
    // Obtain request cookies for authentication
    // Await cookies() because in Next.js 15 it returns a Promise
    const cookieStore = await cookies()

    // Initialise Supabase client that can read the auth cookies
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                }
                // No setAll needed – Supabase will manage session cookies automatically
            }
        }
    )

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        console.error('Auth error in submitRating:', authError)
        return { success: false, error: 'You must be logged in to submit a rating' }
    }

    console.log('Submitting rating for user:', user.id, 'Dish:', dishId)

    // Insert rating into the database
    const { error } = await supabase.from('ratings').insert({
        dish_id: dishId,
        user_id: user.id,
        rating,
        tags,
        comment,
    })

    if (error) {
        console.error('Error submitting rating to DB:', error)
        return { success: false, error: error.message }
    }

    console.log('Rating submitted successfully')

    // Re-validate the dish page so the new rating appears immediately
    revalidatePath(`/dish/${dishId}`)
    return { success: true }
}
