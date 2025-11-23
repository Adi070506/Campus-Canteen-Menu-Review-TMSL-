import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, ArrowRight } from 'lucide-react'
import { DailyMenuItem } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface DishCardProps {
    item: DailyMenuItem
}

export function DishCard({ item }: DishCardProps) {
    const { dish, status } = item
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadRating() {
            if (!dish?.id) return

            const { data } = await supabase
                .from('ratings')
                .select('rating')
                .eq('dish_id', dish.id)

            if (data && data.length > 0) {
                const avg = data.reduce((acc, curr) => acc + curr.rating, 0) / data.length
                setRating(Number(avg.toFixed(1)))
            } else {
                setRating(0)
            }
            setLoading(false)
        }
        loadRating()
    }, [dish?.id])

    if (!dish) return null

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'Available': return { color: 'bg-emerald-500/90', text: 'Available' }
            case 'Low': return { color: 'bg-amber-500/90', text: 'Low Stock' }
            case 'Out of Stock': return { color: 'bg-rose-500/90', text: 'Sold Out' }
            default: return { color: 'bg-slate-500', text: status }
        }
    }

    const statusConfig = getStatusConfig(status)

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <Card className="overflow-hidden border shadow-premium hover:shadow-xl transition-all duration-300 bg-card h-full flex flex-col rounded-xl p-0">
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={dish.image_url || '/placeholder-food.jpg'}
                        alt={dish.name}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                    <Badge className={`absolute top-3 right-3 ${statusConfig.color} text-white border-none px-3 py-1 shadow-sm backdrop-blur-md`}>
                        {statusConfig.text}
                    </Badge>

                    <div className="absolute bottom-3 left-3 text-white">
                        <h3 className="font-bold text-lg leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{dish.name}</h3>
                    </div>
                </div>

                <CardContent className="p-4 flex-1">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-xl text-primary">₹{dish.price}</span>
                        {rating > 0 && (
                            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-md border border-yellow-200 dark:border-yellow-700">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-bold text-yellow-700 dark:text-yellow-400">{rating}</span>
                            </div>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {dish.description}
                    </p>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                    <Button asChild className="w-full rounded-xl font-semibold shadow-md hover:shadow-lg transition-all group" size="lg">
                        <Link href={`/dish/${dish.id}`} className="flex items-center justify-center gap-2">
                            Rate & Review
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
