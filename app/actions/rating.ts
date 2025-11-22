'use server'

import { createClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function submitRating(
    dishId: string,
    rating: number,
    tags: string[],
    comment?: string
) {
    const supabase = createClient()

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'You must be logged in to submit a rating' }
    }

    // Insert rating
    const { error } = await supabase.from('ratings').insert({
        dish_id: dishId,
        user_id: user.id,
        rating,
        tags,
        comment,
    })

    if (error) {
        console.error('Error submitting rating:', error)
        return { success: false, error: error.message }
    }

    revalidatePath(`/dish/${dishId}`)
    return { success: true }
}
