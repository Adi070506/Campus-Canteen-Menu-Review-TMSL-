'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Star, ChevronLeft, Clock, Flame, ThumbsUp, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { RatingForm } from '@/components/rating-form'

export default function DishDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [dish, setDish] = useState<any>(null)
    const [ratings, setRatings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [ratingStats, setRatingStats] = useState({
        average: 0,
        total: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>
    })

    useEffect(() => {
        async function loadDishData() {
            if (!params.id) return

            try {
                // Fetch dish details
                const { data: dishData, error: dishError } = await supabase
                    .from('dishes')
                    .select('*')
                    .eq('id', params.id)
                    .single()

                if (dishError) throw dishError

                // Fetch ratings with user profiles
                const { data: ratingsData, error: ratingsError } = await supabase
                    .from('ratings')
                    .select(`
            *,
            profiles (
              full_name,
              email
            )
          `)
                    .eq('dish_id', params.id)
                    .order('created_at', { ascending: false })

                if (ratingsError) throw ratingsError

                setDish(dishData)
                setRatings(ratingsData || [])

                // Calculate stats
                if (ratingsData && ratingsData.length > 0) {
                    const total = ratingsData.length
                    const sum = ratingsData.reduce((acc, r) => acc + r.rating, 0)
                    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

                    ratingsData.forEach(r => {
                        const rating = Math.round(r.rating)
                        if (rating >= 1 && rating <= 5) {
                            distribution[rating as keyof typeof distribution]++
                        }
                    })

                    setRatingStats({
                        average: Number((sum / total).toFixed(1)),
                        total,
                        distribution
                    })
                }

            } catch (error) {
                console.error('Error loading dish data:', error)
            } finally {
                setLoading(false)
            }
        }

        loadDishData()
    }, [params.id])

    if (loading) {
        return (
            <div className="min-h-screen bg-background pb-20">
                <div className="h-64 bg-muted animate-pulse" />
                <div className="container mx-auto px-4 -mt-8">
                    <div className="bg-card rounded-3xl p-6 shadow-lg space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            </div>
        )
    }

    if (!dish) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Dish not found</h2>
                    <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Hero Image */}
            <div className="relative h-72 w-full">
                <Image
                    src={dish.image_url || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                    alt={dish.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 left-4 text-white hover:bg-white/20"
                    onClick={() => router.back()}
                >
                    <ChevronLeft className="w-6 h-6" />
                </Button>
            </div>

            {/* Dish Info Card */}
            <div className="container mx-auto px-4 -mt-12 relative z-10">
                <Card className="border shadow-premium rounded-3xl overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h1 className="text-2xl font-black">{dish.name}</h1>
                                <p className="text-muted-foreground text-sm font-medium">{dish.category}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-black text-orange-600">₹{dish.price}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-4 mb-6">
                            <Badge variant={dish.is_veg ? "success" : "destructive"} className="rounded-full px-3">
                                {dish.is_veg ? '🥬 Veg' : '🍖 Non-Veg'}
                            </Badge>
                            <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400 font-bold">
                                <Star className="w-4 h-4 fill-current" />
                                <span>{ratingStats.average}</span>
                                <span className="text-muted-foreground font-normal text-sm">({ratingStats.total})</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                <Flame className="w-4 h-4 text-orange-500" />
                                <span>{dish.calories || '250'} cal</span>
                            </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                            {dish.description || 'A delicious and freshly prepared dish made with high-quality ingredients. Perfect for a quick meal or a hearty snack.'}
                        </p>

                        <div className="mt-6 flex gap-3">
                            <RatingForm
                                dishId={dish.id}
                                dishName={dish.name}
                                onSuccess={() => window.location.reload()}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Rating Stats */}
                <Card className="mt-6 border shadow-premium rounded-3xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Rating Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map((stars) => (
                                <div key={stars} className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-12 text-sm font-medium text-muted-foreground">
                                        <span>{stars}</span>
                                        <Star className="w-3 h-3 fill-slate-400 text-slate-400" />
                                    </div>
                                    <Progress
                                        value={ratingStats.total > 0 ? (ratingStats.distribution[stars] / ratingStats.total) * 100 : 0}
                                        className="h-2"
                                    />
                                    <span className="text-xs text-muted-foreground w-8 text-right">
                                        {ratingStats.distribution[stars]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="mt-8 mb-20">
                    <h3 className="text-lg font-bold mb-4 px-2">Recent Reviews</h3>

                    {ratings.length === 0 ? (
                        <div className="text-center py-10 bg-card rounded-3xl shadow-sm border">
                            <MessageSquare className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                            <p className="text-muted-foreground font-medium">No reviews yet</p>
                            <p className="text-muted-foreground/70 text-sm">Be the first to rate this dish!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {ratings.map((review) => (
                                <Card key={review.id} className="border shadow-premium hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-8 h-8">
                                                    <AvatarFallback className="bg-orange-100 text-orange-600 text-xs font-bold">
                                                        {review.profiles?.full_name?.[0] || 'U'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-bold">
                                                        {review.profiles?.full_name || 'Anonymous User'}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-lg">
                                                <span className="text-sm font-bold text-green-700 dark:text-green-400">{review.rating}</span>
                                                <Star className="w-3 h-3 text-green-700 dark:text-green-400 fill-current ml-1" />
                                            </div>
                                        </div>

                                        {review.comment && (
                                            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                                                {review.comment}
                                            </p>
                                        )}

                                        {/* Tags if any */}
                                        {review.tags && review.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {review.tags.map((tag: string) => (
                                                    <span key={tag} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
