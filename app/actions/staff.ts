'use server'

import { createClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function updateItemStatus(itemId: string, status: 'Available' | 'Low' | 'Out of Stock') {
    const supabase = createClient()

    // Check if user is authenticated and is staff
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'You must be logged in' }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'staff') {
        return { success: false, error: 'Only staff members can update availability' }
    }

    const { error } = await supabase
        .from('daily_menu_items')
        .update({ status })
        .eq('id', itemId)

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/staff')
    revalidatePath('/')
    return { success: true }
}
