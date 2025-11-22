'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { HeroClient } from '@/components/hero-client'

export function HeroSection() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                // Fetch profile
                supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single()
                    .then(({ data: profile }) => {
                        setUser({
                            id: session.user.id,
                            email: session.user.email!,
                            profile: profile || null,
                        })
                        setLoading(false)
                    })
            } else {
                setLoading(false)
            }
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single()
                    .then(({ data: profile }) => {
                        setUser({
                            id: session.user.id,
                            email: session.user.email!,
                            profile: profile || null,
                        })
                    })
            } else {
                setUser(null)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    if (loading) {
        return <div className="min-h-[90vh]" /> // Loading placeholder
    }

    return <HeroClient user={user} />
}
