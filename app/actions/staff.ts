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
    const { data: allRatings } = await supabase
        .from('ratings')
        .select('rating, dish_id')
        .gte('created_at', todayStart)

    const positiveCount = allRatings?.filter(r => r.rating >= 4).length || 0
    const positivePercentage = allRatings?.length
        ? Math.round((positiveCount / allRatings.length) * 100)
        : 0

    // Get negative alerts (1-2 star ratings)
    const { count: negativeAlerts } = await supabase
        .from('ratings')
        .select('*', { count: 'exact', head: true })
        .lte('rating', 2)
        .gte('created_at', todayStart)

    // Get top rated dish today
    const { data: topDishData } = await supabase
        .from('ratings')
        .select('dish_id, dishes(name)')
        .gte('created_at', todayStart)
        .order('rating', { ascending: false })
        .limit(1)
        .maybeSingle()

    const topDishName = topDishData?.dishes && typeof topDishData.dishes === 'object' && 'name' in topDishData.dishes
        ? (topDishData.dishes as any).name
        : 'N/A'

    return {
        totalRatings: totalRatings || 0,
        positivePercentage,
        negativeAlerts: negativeAlerts || 0,
        topDish: topDishName
    }
}
