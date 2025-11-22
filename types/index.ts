export type Location = 'Canteen' | 'Food Truck' | 'Snack Store'

export type AvailabilityStatus = 'Available' | 'Low' | 'Out of Stock'

export interface Dish {
    id: string
    name: string
    description?: string
    price: number
    category?: string
    image_url?: string
    created_at: string
}

export interface DailyMenuItem {
    id: string
    daily_menu_id: string
    dish_id: string
    status: AvailabilityStatus
    dish?: Dish
}

export interface Rating {
    id: string
    dish_id: string
    user_id: string
    rating: number
    tags: string[]
    comment?: string
    sentiment?: 'Positive' | 'Negative' | 'Neutral'
    created_at: string
}
