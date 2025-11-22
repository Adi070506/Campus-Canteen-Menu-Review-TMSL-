'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { signIn, signUp } from '@/lib/auth-helpers'
import { toast } from 'sonner'

interface LoginDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
    const [mode, setMode] = useState<'login' | 'signup'>('login')
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        role: 'student' as 'student' | 'staff',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (mode === 'login') {
                const result = await signIn(formData.email, formData.password)
                if (result.success) {
                    toast.success('Logged in successfully!')
                    onOpenChange(false)
                } else {
                    toast.error(result.error || 'Login failed')
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
        } catch (error) {
            console.error('Form submission error:', error)
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
                                <Select value={formData.role} onValueChange={(value: 'student' | 'staff') => setFormData({ ...formData, role: value })}>
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
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            minLength={6}
                        />
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
