'use server'

import { supabase } from '@/lib/supabase'
import { DailyMenuItem, Dish } from '@/types'

export async function getDailyMenu(locationName: string) {
    const today = new Date().toISOString().split('T')[0]

    // First get the location ID
    const { data: location } = await supabase
        .from('locations')
        .select('id')
        .eq('name', locationName)
        .single()

    if (!location) return []

    // Get the daily menu for this location and date
    const { data: dailyMenu } = await supabase
        .from('daily_menus')
        .select('id')
        .eq('location_id', location.id)
        .eq('date', today)
        .single()

    if (!dailyMenu) return []

    // Get items
    const { data: items } = await supabase
        .from('daily_menu_items')
        .select(`
      *,
      dish:dishes(*)
    `)
        .eq('daily_menu_id', dailyMenu.id)

    return items as DailyMenuItem[]
}

export async function getLocations() {
    const { data } = await supabase.from('locations').select('*')
    return data || []
}

export async function getAllMenuItems() {
    const today = new Date().toISOString().split('T')[0]

    const { data: items } = await supabase
        .from('daily_menu_items')
        .select(`
            *,
            dish:dishes(*),
            daily_menu:daily_menus!inner(
                id,
                date,
                location:locations(name)
            )
        `)
        .eq('daily_menu.date', today)

    return items || []
}
