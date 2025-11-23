'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { Trophy, Star, TrendingUp, LogOut, User as UserIcon, Edit, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'

export default function ProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [editForm, setEditForm] = useState({ fullName: '' })
    const [recentActivity, setRecentActivity] = useState<any[]>([])
    const [stats, setStats] = useState({
        totalRatings: 0,
        avgRating: 0,
        points: 0,
        streak: 0
    })

    useEffect(() => {
        async function loadUserData() {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session?.user) {
                setLoading(false)
                return
            }

            // Use maybeSingle() to avoid 406 error if profile doesn't exist
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle()

            if (error) {
                console.error('Error fetching profile:', error)
            }

            // Fetch user's ratings for recent activity
            const { data: ratings, error: ratingsError } = await supabase
                .from('ratings')
                .select(`
                    *,
                    dishes (
                        name,
                        image_url
                    )
                `)
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false })
                .limit(5)

            if (ratingsError) {
                console.error('Error fetching ratings:', ratingsError)
            } else if (ratings) {
                setRecentActivity(ratings)

                // Calculate stats based on real data
                const total = ratings.length
                const avg = total > 0
                    ? (ratings.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1)
                    : 0

                setStats({
                    totalRatings: total,
                    avgRating: Number(avg),
                    points: total * 10, // Simple points logic: 10 pts per rating
                    streak: 1 // Mock streak for now
                })
            }

            setUser({
                id: session.user.id,
                email: session.user.email!,
                profile: profile || null,
            })

            setLoading(false)
        }

        loadUserData()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .maybeSingle()
                    .then(({ data: profile }) => {
                        setUser({
                            id: session.user.id,
                            email: session.user.email!,
                            profile: profile || null,
                        })
                    })
            } else {
                setUser(null)
                setLoading(false)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut()
        } catch (error) {
            console.error('Error signing out:', error)
        } finally {
            toast.success('Signed out successfully')
            router.push('/')
            router.refresh()
        }
    }

    const openEditDialog = () => {
        setEditForm({ fullName: user?.profile?.full_name || '' })
        setEditDialogOpen(true)
    }

    const handleEditProfile = async () => {
        if (!user) return

        try {
            console.log('Updating profile for:', user.id, 'New name:', editForm.fullName)

            // Upsert to handle both update and insert (if profile missing)
            // Removed updated_at as it's handled by database default and caused issues
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    full_name: editForm.fullName,
                })

            if (error) {
                console.error('Update error:', error)
                toast.error('Failed to update profile: ' + error.message)
                return
            }

            toast.success('Profile updated! Refreshing...')

            // Update local state
            setUser({
                ...user,
                profile: { ...user.profile, full_name: editForm.fullName }
            })

            setEditDialogOpen(false)

            // Refresh the page to update all components
            window.location.reload()

        } catch (error: any) {
            console.error('Unexpected error:', error)
            toast.error('An error occurred: ' + error.message)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background pb-20">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <Skeleton className="h-48 w-full rounded-3xl mb-6" />
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <Skeleton className="h-40 rounded-2xl" />
                        <Skeleton className="h-40 rounded-2xl" />
                        <Skeleton className="h-40 rounded-2xl" />
                        <Skeleton className="h-40 rounded-2xl" />
                    </div>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
                <Card className="max-w-md mx-4 border shadow-premium">
                    <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserIcon className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-black">Sign In Required</CardTitle>
                        <CardDescription>
                            Please sign in to view your profile and stats
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Button
                            onClick={() => router.push('/')}
                            className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                        >
                            Go to Home
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const initials = user.profile?.full_name
        ?.split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase() || user.email[0].toUpperCase()

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Hero Card */}
                <Card className="mb-8 overflow-hidden border shadow-premium">
                    <div className="h-32 md:h-40 bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 dark:from-orange-600 dark:via-rose-600 dark:to-purple-700" />
                    <CardContent className="pt-0 pb-8">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-20">
                            <div className="flex flex-col md:flex-row md:items-end gap-6">
                                <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                                    <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-orange-500 to-purple-600 text-white">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="mb-4 md:mb-0">
                                    <h1 className="text-3xl md:text-4xl font-black mb-2">
                                        {user.profile?.full_name || 'User'}
                                    </h1>
                                    <p className="text-muted-foreground text-base mb-3">{user.email}</p>
                                    <Badge variant="secondary" className="text-sm px-3 py-1">
                                        {user.profile?.role === 'staff' ? '👨‍🍳 Staff Member' : '🎓 Student'}
                                    </Badge>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-4 md:mt-0">
                                <Button
                                    variant="outline"
                                    onClick={openEditDialog}
                                    className="gap-2 flex-1 md:flex-none"
                                    size="lg"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit Profile
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={handleSignOut}
                                    className="gap-2 flex-1 md:flex-none"
                                    size="lg"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    <Card className="border shadow-premium hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                                    <Star className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <CardTitle className="text-sm font-semibold text-muted-foreground">Total Ratings</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-black">{stats.totalRatings}</p>
                            <p className="text-xs text-muted-foreground mt-1">Reviews submitted</p>
                        </CardContent>
                    </Card>

                    <Card className="border shadow-premium hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
                                    <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <CardTitle className="text-sm font-semibold text-muted-foreground">Avg Rating</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-black">{stats.avgRating}</p>
                            <p className="text-xs text-muted-foreground mt-1">Out of 5 stars</p>
                        </CardContent>
                    </Card>

                    <Card className="border shadow-premium hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                                    <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <CardTitle className="text-sm font-semibold text-muted-foreground">Points</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-black">{stats.points}</p>
                            <p className="text-xs text-muted-foreground mt-1">Leaderboard score</p>
                        </CardContent>
                    </Card>

                    <Card className="border shadow-premium hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-rose-100 dark:bg-rose-900/30">
                                    <span className="text-2xl">🔥</span>
                                </div>
                                <CardTitle className="text-sm font-semibold text-muted-foreground">Streak</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-black">{stats.streak}</p>
                            <p className="text-xs text-muted-foreground mt-1">Days active</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card className="border shadow-premium">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <MessageSquare className="w-6 h-6 text-primary" />
                            <div>
                                <CardTitle className="text-2xl font-black">Recent Activity</CardTitle>
                                <CardDescription className="text-base">Your latest ratings and reviews</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {recentActivity.length === 0 ? (
                            <div className="text-center py-16">
                                <UserIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                                <p className="text-lg font-semibold mb-2">No recent activity</p>
                                <p className="text-sm text-muted-foreground">Start rating dishes to see your activity here!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex gap-4 p-6 bg-muted/50 dark:bg-muted/20 rounded-xl hover:bg-muted/70 dark:hover:bg-muted/30 transition-colors">
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-lg">{activity.dishes?.name || 'Unknown Dish'}</h4>
                                                <div className="flex items-center bg-background px-3 py-1.5 rounded-lg shadow-sm border">
                                                    <span className="text-base font-bold text-orange-600 dark:text-orange-400">{activity.rating}</span>
                                                    <Star className="w-4 h-4 text-orange-600 dark:text-orange-400 fill-current ml-1" />
                                                </div>
                                            </div>
                                            {activity.comment && (
                                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">"{activity.comment}"</p>
                                            )}
                                            <div className="flex justify-between items-center mt-3">
                                                <div className="flex gap-2 flex-wrap">
                                                    {activity.tags?.map((tag: string) => (
                                                        <span key={tag} className="text-xs px-3 py-1 bg-background text-muted-foreground rounded-full border">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Update your profile information
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Full Name</Label>
                            <Input
                                id="edit-name"
                                value={editForm.fullName}
                                onChange={(e) => setEditForm({ fullName: e.target.value })}
                                placeholder="Enter your full name"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEditProfile}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
