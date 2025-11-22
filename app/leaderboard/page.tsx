'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, Flame, Crown } from 'lucide-react'
import { motion } from 'framer-motion'

const LEADERBOARD_DATA = [
    { id: 1, name: 'Rahul K.', points: 1250, streak: 12, avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Priya S.', points: 980, streak: 8, avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Amit D.', points: 850, streak: 5, avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'Sneha M.', points: 720, streak: 3, avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, name: 'Vikram R.', points: 650, streak: 2, avatar: 'https://i.pravatar.cc/150?u=5' },
]

export default function LeaderboardPage() {
    const topThree = LEADERBOARD_DATA.slice(0, 3)
    const rest = LEADERBOARD_DATA.slice(3)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24 p-4">
            <header className="mb-8 text-center pt-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600 mb-2">
                        Foodie Hall of Fame
                    </h1>
                    <p className="text-slate-600">Who's ruling the canteen today?</p>
                </motion.div>
            </header>

            {/* Podium */}
            <div className="flex justify-center items-end gap-4 mb-10 max-w-md mx-auto">
                {/* 2nd Place */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center"
                >
                    <div className="relative">
                        <Avatar className="h-16 w-16 border-4 border-slate-300 shadow-lg">
                            <AvatarImage src={topThree[1].avatar} />
                            <AvatarFallback>{topThree[1].name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-full border border-white">
                            #2
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <div className="font-bold text-sm text-slate-900">{topThree[1].name}</div>
                        <div className="text-xs text-orange-600 font-semibold">{topThree[1].points} pts</div>
                    </div>
                    <div className="h-24 w-20 bg-slate-100 rounded-t-lg mt-2 shadow-inner border-t border-slate-200" />
                </motion.div>

                {/* 1st Place */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center z-10"
                >
                    <div className="relative">
                        <Crown className="w-8 h-8 text-yellow-500 absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce" />
                        <Avatar className="h-24 w-24 border-4 border-yellow-400 shadow-xl">
                            <AvatarImage src={topThree[0].avatar} />
                            <AvatarFallback>{topThree[0].name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-0.5 rounded-full border border-white">
                            #1
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <div className="font-bold text-lg text-slate-900">{topThree[0].name}</div>
                        <div className="text-sm text-orange-600 font-bold">{topThree[0].points} pts</div>
                    </div>
                    <div className="h-32 w-24 bg-yellow-50 rounded-t-lg mt-2 shadow-inner border-t border-yellow-200 flex items-end justify-center pb-4">
                        <Trophy className="text-yellow-200 w-12 h-12 opacity-50" />
                    </div>
                </motion.div>

                {/* 3rd Place */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center"
                >
                    <div className="relative">
                        <Avatar className="h-16 w-16 border-4 border-orange-300 shadow-lg">
                            <AvatarImage src={topThree[2].avatar} />
                            <AvatarFallback>{topThree[2].name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-orange-300 text-orange-900 text-xs font-bold px-2 py-0.5 rounded-full border border-white">
                            #3
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <div className="font-bold text-sm text-slate-900">{topThree[2].name}</div>
                        <div className="text-xs text-orange-600 font-semibold">{topThree[2].points} pts</div>
                    </div>
                    <div className="h-20 w-20 bg-orange-50 rounded-t-lg mt-2 shadow-inner border-t border-orange-200" />
                </motion.div>
            </div>

            {/* List for the rest */}
            <div className="max-w-md mx-auto space-y-3">
                {rest.map((user, index) => (
                    <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                    >
                        <Card className="border-none shadow-sm bg-white hover:bg-slate-50 transition-colors">
                            <CardContent className="p-3 flex items-center gap-4">
                                <div className="font-bold text-lg w-6 text-center text-slate-600">
                                    {index + 4}
                                </div>

                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                    <div className="font-semibold text-slate-900">{user.name}</div>
                                    <div className="text-xs text-slate-600 flex items-center gap-1">
                                        <Flame className="w-3 h-3 text-orange-500 fill-orange-500" /> {user.streak} Day Streak
                                    </div>
                                </div>

                                <div className="font-bold text-orange-600">{user.points}</div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
