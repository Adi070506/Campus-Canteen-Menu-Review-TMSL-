'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import { LeaderboardUser } from '@/app/actions/leaderboard'

interface LeaderboardListProps {
    users: LeaderboardUser[]
    startIndex: number
}

export function LeaderboardList({ users, startIndex }: LeaderboardListProps) {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            {users.map((user, index) => (
                <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (index * 0.05), duration: 0.3 }}
                >
                    <Card className="border shadow-premium hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="font-bold text-2xl w-8 text-center text-muted-foreground">
                                {startIndex + index}
                            </div>

                            <Avatar className="h-12 w-12">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <div className="font-semibold text-base">{user.name}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Flame className="w-3 h-3 text-orange-500 fill-orange-500" /> {user.streak} Day Streak
                                </div>
                            </div>

                            <div className="font-bold text-lg text-orange-600 dark:text-orange-400">{user.points}</div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}
