'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supabase } from '@/lib/supabase'
import { signUp } from '@/lib/auth-helpers'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'

import React from 'react'

interface LoginDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
    const [mode, setMode] = useState<'login' | 'signup'>('login')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        role: 'student' as 'student' | 'staff',
    })
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (mode === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                })
                if (error) {
                    toast.error(error.message || 'Login failed')
                } else {
                    toast.success('Logged in successfully!')
                    const { data: { session } } = await supabase.auth.getSession()
                    if (session?.user) {
                        const { data: profile } = await supabase
                            .from('profiles')
                            .select('role')
                            .eq('id', session.user.id)
                            .maybeSingle()
                        const role = profile?.role
                        if (role === 'staff') {
                            router.push('/staff')
                        } else {
                            router.push('/')
                        }
                    }
                    onOpenChange(false)
                }
            } else {
                const result = await signUp(formData.email, formData.password, formData.fullName, formData.role)
                if (result.success) {
                    toast.success(result.message || 'Account created successfully!')
                    setMode('login')
                    setFormData({ ...formData, password: '' })
                } else {
                    toast.error(result.error || 'Signup failed')
                }
            }
        } catch (err) {
            console.error('Form submission error:', err)
            toast.error('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</DialogTitle>
                    <DialogDescription>
                        {mode === 'login'
                            ? 'Sign in to rate dishes and track your streak'
                            : 'Join Canteen Pulse to start rating and reviewing'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">I am a</Label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(value: 'student' | 'staff') => setFormData({ ...formData, role: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="student">Student</SelectItem>
                                        <SelectItem value="staff">Staff Member</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            {mode === 'login' && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        onOpenChange(false)
                                        router.push('/auth/forgot-password')
                                    }}
                                    className="text-xs text-primary hover:underline"
                                >
                                    Forgot password?
                                </button>
                            )}
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                minLength={6}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                    </Button>
                    <div className="text-center text-sm">
                        {mode === 'login' ? (
                            <p>
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setMode('signup')}
                                    className="text-primary font-semibold hover:underline"
                                >
                                    Sign up
                                </button>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setMode('login')}
                                    className="text-primary font-semibold hover:underline"
                                >
                                    Sign in
                                </button>
                            </p>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
