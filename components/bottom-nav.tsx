'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Trophy, User, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function BottomNav() {
    const pathname = usePathname()
    const [role, setRole] = useState<string | null>(null)

    // Fetch user role on mount
    useEffect(() => {
        async function fetchRole() {
            const { data: { session } } = await supabase.auth.getSession()
            if (session?.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .maybeSingle()
                setRole(profile?.role ?? null)
            }
        }
        fetchRole()
    }, [])

    const isActive = (path: string) => pathname === path

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t h-16 flex items-center justify-around z-50 shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
            <Link
                href="/"
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-primary/70'}`}
            >
                <Home className="w-6 h-6" />
                <span className="text-xs font-medium">Menu</span>
            </Link>

            <Link
                href="/leaderboard"
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive('/leaderboard') ? 'text-primary' : 'text-muted-foreground hover:text-primary/70'}`}
            >
                <Trophy className="w-6 h-6" />
                <span className="text-xs font-medium">Leaderboard</span>
            </Link>

            <Link
                href="/profile"
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive('/profile') ? 'text-primary' : 'text-muted-foreground hover:text-primary/70'}`}
            >
                <User className="w-6 h-6" />
                <span className="text-xs font-medium">Profile</span>
            </Link>

            {role === 'staff' && (
                <Link
                    href="/staff"
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive('/staff') ? 'text-primary' : 'text-muted-foreground hover:text-primary/70'}`}
                >
                    <Settings className="w-6 h-6" />
                    <span className="text-xs font-medium">Staff</span>
                </Link>
            )}
        </div>
    )
}
