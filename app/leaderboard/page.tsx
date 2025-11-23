import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, Flame, Crown, Medal } from 'lucide-react'
import { getLeaderboardData } from '@/app/actions/leaderboard'
import { LeaderboardList } from '@/components/leaderboard-list'

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function LeaderboardPage() {
    const leaderboardData = await getLeaderboardData()
    const topThree = leaderboardData.slice(0, 3)
    const rest = leaderboardData.slice(3)

    return (
        <div className="min-h-screen bg-background pb-24 p-4 md:p-8">
            <div className="container mx-auto max-w-6xl">
                <header className="mb-12 text-center pt-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Trophy className="w-10 h-10 text-yellow-500" />
                        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600 dark:from-orange-500 dark:to-rose-500">
                            Foodie Hall of Fame
                        </h1>
                        <Trophy className="w-10 h-10 text-yellow-500" />
                    </div>
                    <p className="text-muted-foreground text-lg">Who's ruling the canteen today?</p>
                </header>

                {/* Podium */}
                {topThree.length > 0 && (
                    <div className="flex justify-center items-end gap-6 md:gap-8 mb-16 max-w-3xl mx-auto">
                        {/* 2nd Place */}
                        {topThree[1] && (
                            <div className="flex flex-col items-center flex-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                                <div className="relative mb-4">
                                    <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-muted shadow-xl">
                                        <AvatarImage src={topThree[1].avatar} />
                                        <AvatarFallback>{topThree[1].name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-muted text-foreground text-sm font-bold px-3 py-1 rounded-full border-2 border-background shadow-lg">
                                        #2
                                    </div>
                                </div>
                                <div className="text-center mb-3">
                                    <div className="font-bold text-base md:text-lg">{topThree[1].name}</div>
                                    <div className="text-sm text-orange-600 dark:text-orange-400 font-semibold">{topThree[1].points} pts</div>
                                </div>
                                <div className="h-28 md:h-32 w-full bg-muted/50 dark:bg-muted/20 rounded-t-xl shadow-inner border-t-4 border-muted flex items-center justify-center">
                                    <Medal className="text-muted-foreground/30 w-12 h-12" />
                                </div>
                            </div>
                        )}

                        {/* 1st Place */}
                        {topThree[0] && (
                            <div className="flex flex-col items-center z-10 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                                <div className="relative mb-4">
                                    <Crown className="w-10 h-10 md:w-12 md:h-12 text-yellow-500 absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2 animate-bounce" />
                                    <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-yellow-400 shadow-2xl ring-4 ring-yellow-400/20">
                                        <AvatarImage src={topThree[0].avatar} />
                                        <AvatarFallback>{topThree[0].name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-sm font-bold px-4 py-1 rounded-full border-2 border-background shadow-lg">
                                        #1
                                    </div>
                                </div>
                                <div className="text-center mb-3">
                                    <div className="font-bold text-xl md:text-2xl">{topThree[0].name}</div>
                                    <div className="text-base md:text-lg text-orange-600 dark:text-orange-400 font-bold">{topThree[0].points} pts</div>
                                </div>
                                <div className="h-36 md:h-40 w-full bg-yellow-50 dark:bg-yellow-900/20 rounded-t-xl shadow-inner border-t-4 border-yellow-400 flex items-end justify-center pb-6">
                                    <Trophy className="text-yellow-400/30 w-16 h-16" />
                                </div>
                            </div>
                        )}

                        {/* 3rd Place */}
                        {topThree[2] && (
                            <div className="flex flex-col items-center flex-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                                <div className="relative mb-4">
                                    <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-orange-300 dark:border-orange-700 shadow-xl">
                                        <AvatarImage src={topThree[2].avatar} />
                                        <AvatarFallback>{topThree[2].name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-orange-300 dark:bg-orange-700 text-orange-900 dark:text-orange-100 text-sm font-bold px-3 py-1 rounded-full border-2 border-background shadow-lg">
                                        #3
                                    </div>
                                </div>
                                <div className="text-center mb-3">
                                    <div className="font-bold text-base md:text-lg">{topThree[2].name}</div>
                                    <div className="text-sm text-orange-600 dark:text-orange-400 font-semibold">{topThree[2].points} pts</div>
                                </div>
                                <div className="h-24 md:h-28 w-full bg-orange-50 dark:bg-orange-900/20 rounded-t-xl shadow-inner border-t-4 border-orange-300 dark:border-orange-700 flex items-center justify-center">
                                    <Medal className="text-orange-300/30 dark:text-orange-700/30 w-12 h-12" />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* List for the rest */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Flame className="w-6 h-6 text-orange-500" />
                        Rising Stars
                    </h2>
                    <LeaderboardList users={rest} startIndex={4} />
                </div>
            </div>
        </div>
    )
}
