'use client'

import { useState } from 'react'
import { DailyMenuItem } from '@/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { updateItemStatus } from '@/app/actions/staff'
import { toast } from 'sonner'
import Image from 'next/image'

interface AvailabilityManagerProps {
    initialItems: DailyMenuItem[]
}

export function AvailabilityManager({ initialItems }: AvailabilityManagerProps) {
    const [items, setItems] = useState(initialItems)

    const handleStatusChange = async (itemId: string, newStatus: string) => {
        // Optimistic update
        setItems(items.map(item =>
            item.id === itemId ? { ...item, status: newStatus as any } : item
        ))

        try {
            await updateItemStatus(itemId, newStatus)
            toast.success('Status updated')
        } catch (error) {
            toast.error('Failed to update status')
            // Revert
            setItems(initialItems)
        }
    }

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                    <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden">
                            <Image
                                src={item.dish?.image_url || '/placeholder-food.jpg'}
                                alt={item.dish?.name || 'Dish'}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold">{item.dish?.name}</h4>
                            <p className="text-sm text-muted-foreground">₹{item.dish?.price}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Select
                            defaultValue={item.status}
                            onValueChange={(val) => handleStatusChange(item.id, val)}
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Available">
                                    <span className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-green-500" /> Available
                                    </span>
                                </SelectItem>
                                <SelectItem value="Low">
                                    <span className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-yellow-500" /> Low Stock
                                    </span>
                                </SelectItem>
                                <SelectItem value="Out of Stock">
                                    <span className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-red-500" /> Out of Stock
                                    </span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            ))}
        </div>
    )
}
