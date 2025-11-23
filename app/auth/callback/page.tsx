'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

export default function AuthCallbackPage() {
    const router = useRouter()

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Get the hash fragment from the URL
                const hashParams = new URLSearchParams(window.location.hash.substring(1))
                const accessToken = hashParams.get('access_token')
                const refreshToken = hashParams.get('refresh_token')
                const type = hashParams.get('type')

                if (type === 'recovery' && accessToken) {
                    // This is a password recovery link
                    // The session is already set by Supabase
                    router.push('/auth/reset-password')
                } else if (accessToken && refreshToken) {
                    // Set the session manually
                    await supabase.auth.setSession({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    })
                    router.push('/profile')
                } else {
                    // No valid tokens, redirect to sign in
                    router.push('/auth/signin')
                }

                router.refresh()
            } catch (error) {
                console.error('Auth callback error:', error)
                router.push('/auth/signin')
            }
        }

        handleCallback()
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Verifying your link...</p>
            </div>
        </div>
    )
}
