'use server'

import { createServerClient } from '@/lib/supabase-server'

export async function getTopAndBottomDishes() {
    const supabase = await createServerClient()

    // Get all dishes with their average ratings
    const { data: dishes } = await supabase
        .from('dishes')
        .select(`
            id,
            name,
            image_url,
            category,
            price,
            ratings (
                rating
            )
        `)

    if (!dishes || dishes.length === 0) {
        return { topDish: null, bottomDish: null }
    }

    // Calculate average ratings and total reviews for each dish
    const dishesWithStats = dishes.map(dish => {
        const ratings = (dish.ratings as any[]) || []
        const totalReviews = ratings.length
        const avgRating = totalReviews > 0
            ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalReviews
            : 0

        return {
            id: dish.id,
            name: dish.name,
            image_url: dish.image_url,
            category: dish.category,
            price: dish.price,
            avgRating,
            totalReviews
        }
    })

    // Filter dishes with at least 3 reviews for more reliable data
    const dishesWithEnoughReviews = dishesWithStats.filter(d => d.totalReviews >= 3)

    if (dishesWithEnoughReviews.length < 2) {
        // If not enough dishes with reviews, use all dishes
        const sorted = dishesWithStats.sort((a, b) => b.avgRating - a.avgRating)
        return {
            topDish: sorted[0] || null,
            bottomDish: sorted[sorted.length - 1] || null
        }
    }

    // Sort by average rating
    const sorted = dishesWithEnoughReviews.sort((a, b) => b.avgRating - a.avgRating)

    return {
        topDish: sorted[0],
        bottomDish: sorted[sorted.length - 1]
    }
}
