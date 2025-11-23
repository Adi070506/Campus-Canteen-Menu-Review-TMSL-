'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, LogIn, User as UserIcon } from 'lucide-react'
import Link from 'next/link'
import { LoginDialog } from '@/components/login-dialog'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserMenu } from '@/components/user-menu'

interface HeroClientProps {
    user: {
        id: string
        email: string
        profile: {
            full_name: string
            role: string
        } | null
    } | null
}

export function HeroClient({ user }: HeroClientProps) {
    const [loginOpen, setLoginOpen] = useState(false)

    return (
        <>
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Animated gradient background - Blue to Purple to Pink */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03),transparent_50%)]" />
                </div>

                {/* Floating shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
                        animate={{
                            x: [0, -100, 0],
                            y: [0, 50, 0],
                        }}
                        transition={{ duration: 25, repeat: Infinity }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="absolute top-4 right-4 flex items-center gap-3">
                            <ThemeToggle />
                            {user ? (
                                <UserMenu user={user} />
                            ) : (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setLoginOpen(true)}
                                    className="gap-2 text-white hover:bg-white/10 hover:text-white"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Sign In
                                </Button>
                            )}
                        </div>

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20"
                        >
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                            <span className="text-white/90 text-sm font-medium">Real-time Campus Dining</span>
                        </motion.div>

                        {/* Main heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
                        >
                            <span className="whitespace-nowrap">The Future of Campus Dining:</span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
                                Pulse
                            </span>
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl md:text-2xl text-white/90 mb-4 max-w-2xl mx-auto font-light"
                        >
                            Real-time menus. Live availability. Student ratings.
                            <br />
                            Never miss your favourite dish again.
                        </motion.p>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg md:text-xl text-white/80 mb-12 font-semibold italic"
                        >
                            Your Voice, Our Menu
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Button
                                size="lg"
                                className="bg-white text-purple-700 hover:bg-white/90 rounded-full text-lg px-8 h-14 font-semibold shadow-2xl shadow-black/20 group"
                                asChild
                            >
                                <Link href="#menu" className="flex items-center gap-2">
                                    See the Menu
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                className="bg-pink-500 text-white hover:bg-pink-600 rounded-full text-lg px-8 h-14 font-semibold shadow-xl"
                                asChild
                            >
                                <Link href="/leaderboard">
                                    Leaderboard
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-8"
                        >
                            {[
                                { value: '4', label: 'Locations' },
                                { value: '50+', label: 'Dishes' },
                                { value: 'Live', label: 'Updates' },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
                                    <div className="text-sm text-white/70 font-medium uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
        </>
    )
}
