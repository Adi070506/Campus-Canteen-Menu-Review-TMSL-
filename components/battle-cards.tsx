'use client'

import { motion } from 'framer-motion'
import { Trophy, AlertTriangle, Star, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

interface Dish {
    id: string
    name: string
    image_url: string
    category: string
    price: number
    avgRating: number
    totalReviews: number
}

interface BattleCardsProps {
    topDish: Dish | null
    bottomDish: Dish | null
}

export function BattleCards({ topDish, bottomDish }: BattleCardsProps) {
    if (!topDish || !bottomDish) {
        return null
    }

    return (
        <section className="container mx-auto px-4 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Favourites</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                    See what's trending and what needs improvement
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {/* Crowd Favourite Card */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Link href={`/dish/${topDish.id}`}>
                        <Card className="group relative overflow-hidden border-2 border-green-500/50 hover:border-green-500 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                            {/* Glowing effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <CardContent className="relative p-6">
                                {/* Badge */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-green-500 rounded-full">
                                        <Trophy className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-green-700 dark:text-green-400 flex items-center gap-1">
                                            🔥 CROWD FAVOURITE
                                        </h3>
                                        <p className="text-xs text-muted-foreground">Most loved this week</p>
                                    </div>
                                </div>

                                {/* Dish Image */}
                                <div className="relative h-48 rounded-lg overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-500 ease-out">
                                    <Image
                                        src={topDish.image_url}
                                        alt={topDish.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <h4 className="text-2xl font-bold text-white mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{topDish.name}</h4>
                                        <p className="text-sm text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{topDish.category}</p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 transition-all duration-300 ${i < Math.floor(topDish.avgRating)
                                                    ? 'fill-yellow-500 text-yellow-500'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                        <span className="ml-2 font-bold text-lg">{topDish.avgRating.toFixed(1)}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">{topDish.totalReviews} reviews</p>
                                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-semibold">
                                            <TrendingUp className="h-4 w-4" />
                                            Trending
                                        </div>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                                    <span className="text-2xl font-bold text-green-700 dark:text-green-400">₹{topDish.price}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </motion.div>

                {/* Needs Attention Card */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Link href={`/dish/${bottomDish.id}`}>
                        <Card className="group relative overflow-hidden border-2 border-orange-500/50 hover:border-orange-500 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
                            {/* Pulsing effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <CardContent className="relative p-6">
                                {/* Badge */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-orange-500 rounded-full">
                                        <AlertTriangle className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-orange-700 dark:text-orange-400 flex items-center gap-1">
                                            ⚠️ NEEDS ATTENTION
                                        </h3>
                                        <p className="text-xs text-muted-foreground">Room for improvement</p>
                                    </div>
                                </div>

                                {/* Dish Image */}
                                <div className="relative h-48 rounded-lg overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-500 ease-out">
                                    <Image
                                        src={bottomDish.image_url}
                                        alt={bottomDish.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <h4 className="text-2xl font-bold text-white mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{bottomDish.name}</h4>
                                        <p className="text-sm text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{bottomDish.category}</p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 transition-all duration-300 ${i < Math.floor(bottomDish.avgRating)
                                                    ? 'fill-yellow-500 text-yellow-500'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                        <span className="ml-2 font-bold text-lg">{bottomDish.avgRating.toFixed(1)}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">{bottomDish.totalReviews} reviews</p>
                                        <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 text-sm font-semibold">
                                            <TrendingDown className="h-4 w-4" />
                                            Needs Love
                                        </div>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-800">
                                    <span className="text-2xl font-bold text-orange-700 dark:text-orange-400">₹{bottomDish.price}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
