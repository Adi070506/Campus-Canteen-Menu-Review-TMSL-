'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, LogIn } from 'lucide-react'
import Link from 'next/link'
import { LoginDialog } from '@/components/login-dialog'
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
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-rose-500 to-purple-600">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_50%)]" />
                </div>

                {/* Floating shapes */}
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"
                    animate={{
                        y: [0, 40, 0],
                        x: [0, -30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Login/User Menu in top right */}
                <div className="absolute top-6 right-6 z-20">
                    {user ? (
                        <UserMenu user={user} />
                    ) : (
                        <Button
                            onClick={() => setLoginOpen(true)}
                            className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 font-medium shadow-lg"
                        >
                            <LogIn className="w-4 h-4 mr-2" />
                            Sign In
                        </Button>
                    )}
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-yellow-200" />
                            <span className="text-sm font-medium text-white">TMSL & TIU Campus Dining</span>
                        </motion.div>

                        {/* Main heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight"
                        >
                            Feel the
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200">
                                Pulse
                            </span>
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light"
                        >
                            Real-time menus. Live availability. Student ratings.
                            <br />
                            Never miss your favorite dish again.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Button
                                size="lg"
                                className="bg-white text-purple-600 hover:bg-white/90 rounded-full text-lg px-8 h-14 font-bold shadow-2xl shadow-black/20 group"
                                asChild
                            >
                                <Link href="#menu" className="flex items-center gap-2">
                                    View Today's Menu
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                className="bg-orange-500 text-white hover:bg-orange-600 rounded-full text-lg px-8 h-14 font-semibold shadow-xl"
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
                            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                        >
                            {[
                                { value: '3', label: 'Locations' },
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

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
                        <motion.div
                            className="w-1.5 h-1.5 bg-white rounded-full"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
        </>
    )
}
