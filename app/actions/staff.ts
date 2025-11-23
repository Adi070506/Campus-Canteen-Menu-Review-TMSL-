'use server'

import { createServerClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function updateItemStatus(itemId: string, status: 'Available' | 'Low' | 'Out of Stock') {
    console.log('[updateItemStatus] Starting update:', { itemId, status })

    const supabase = await createServerClient()

    // Check if user is authenticated and is staff
    const { data: { user } } = await supabase.auth.getUser()
    console.log('[updateItemStatus] User:', user?.id)

    if (!user) {
        console.log('[updateItemStatus] No user found')
        return { success: false, error: 'You must be logged in' }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle()

    console.log('[updateItemStatus] Profile:', profile)

    if (profile?.role !== 'staff') {
        console.log('[updateItemStatus] User is not staff')
        return { success: false, error: 'Only staff members can update availability' }
    }

    const { error, data } = await supabase
        .from('daily_menu_items')
        .update({ status })
        .eq('id', itemId)
        .select()

    console.log('[updateItemStatus] Update result:', { error, data })

    if (error) {
        console.error('[updateItemStatus] Update failed:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/staff')
    revalidatePath('/')
    console.log('[updateItemStatus] Success, paths revalidated')
    return { success: true }
}

export async function getStaffStatistics() {
    const supabase = await createServerClient()
    const today = new Date().toISOString().split('T')[0]
    const todayStart = new Date(today).toISOString()

    // Get today's ratings count
    const { count: totalRatings } = await supabase
        .from('ratings')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', todayStart)

    // Get all ratings for today to calculate percentages
    const { data: todayRatings } = await supabase
        .from('ratings')
        .select('rating')
        .gte('created_at', todayStart)

    const positiveCount = todayRatings?.filter(r => r.rating >= 4).length || 0
    const positivePercentage = todayRatings?.length
        ? Math.round((positiveCount / todayRatings.length) * 100)
        : 0

    // Get negative alerts (1-2 star ratings today)
    const { count: negativeAlerts } = await supabase
        .from('ratings')
        .select('*', { count: 'exact', head: true })
        .lte('rating', 2)
        .gte('created_at', todayStart)

    // Get Top Dish (ALL TIME - same logic as Crowd Favourite)
    // This ensures consistency between Staff Dashboard and Home Page
    const { data: dishes } = await supabase
        .from('dishes')
        .select(`
            id,
            name,
            ratings (
                rating
            )
        `)

    let topDishName = 'No ratings yet'

    if (dishes && dishes.length > 0) {
        const dishesWithStats = dishes.map(dish => {
            const ratings = (dish.ratings as any[]) || []
            const totalReviews = ratings.length
            const avgRating = totalReviews > 0
                ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalReviews
                : 0

            return {
                name: dish.name,
                avgRating,
                totalReviews
            }
        })

        // Filter dishes with at least 3 reviews for reliability
        const dishesWithEnoughReviews = dishesWithStats.filter(d => d.totalReviews >= 3)

        if (dishesWithEnoughReviews.length > 0) {
            // Sort by average rating (descending)
            const sorted = dishesWithEnoughReviews.sort((a, b) => b.avgRating - a.avgRating)
            topDishName = sorted[0].name
        } else if (dishesWithStats.length > 0) {
            // Fallback: use all dishes if not enough have 3+ reviews
            const sorted = dishesWithStats.sort((a, b) => b.avgRating - a.avgRating)
            topDishName = sorted[0].name
        }
    }

    return {
        totalRatings: totalRatings || 0,
        positivePercentage,
        negativeAlerts: negativeAlerts || 0,
        topDish: topDishName
    }
}
