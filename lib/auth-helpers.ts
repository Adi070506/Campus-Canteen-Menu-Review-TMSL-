'use server'

import { createClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function signUp(email: string, password: string, fullName: string, role: 'student' | 'staff') {
    const supabase = createClient()

    // Sign up with email confirmation disabled for development
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
            data: {
                full_name: fullName,
                role: role,
            }
        }
    })

    if (authError) {
        console.error('Auth error:', authError)
        return { success: false, error: authError.message }
    }

    if (!authData.user) {
        return { success: false, error: 'Failed to create user' }
    }

    // Create user profile
    const { error: profileError } = await supabase
        .from('profiles')
        .insert({
            id: authData.user.id,
            email: email,
            full_name: fullName,
            role: role,
        })

    if (profileError) {
        console.error('Profile error:', profileError)
        return { success: false, error: profileError.message }
    }

    revalidatePath('/', 'layout')

    // Check if email confirmation is required
    if (authData.user.identities && authData.user.identities.length === 0) {
        return {
            success: true,
            message: 'Account created! Please check your email to confirm your account before signing in.'
        }
    }

    return { success: true, message: 'Account created successfully! You can now sign in.' }
}

export async function signIn(email: string, password: string) {
    // Import the browser client directly
    const { createClient: createSupabaseClient } = await import('@supabase/supabase-js')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        },
    })

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
}

export async function getCurrentUser() {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return {
        id: user.id,
        email: user.email!,
        profile: profile || null,
    }
}
