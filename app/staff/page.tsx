import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getAllMenuItems } from '@/app/actions/menu'
import { getStaffStatistics } from '@/app/actions/staff'
import { AvailabilityManager } from '@/components/availability-manager'
import { AlertTriangle, ThumbsUp, ThumbsDown, TrendingUp, Users, Star, Clock, ChefHat } from 'lucide-react'
import { createServerClient } from '@/lib/supabase-server'
import { Progress } from '@/components/ui/progress'
import { AIInsights } from '@/components/ai-insights'

export default async function StaffDashboard() {
    // Check authentication and authorization
    const supabase = await createServerClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Access Denied</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-muted-foreground">You must be logged in to access the staff portal.</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Check if user has staff role
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle()

    if (profile?.role !== 'staff') {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Access Denied</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-muted-foreground">This area is restricted to staff members only.</p>
                        <p className="text-sm text-muted-foreground">If you believe this is an error, please contact an administrator.</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Fetch all menu items from all locations and real statistics
    const allMenuItems = await getAllMenuItems()
    const statistics = await getStaffStatistics()

    // Calculate additional metrics
    const availableItems = allMenuItems.filter(item => item.status === 'Available').length
    const lowStockItems = allMenuItems.filter(item => item.status === 'Low').length
    const outOfStockItems = allMenuItems.filter(item => item.status === 'Out of Stock').length
    const availabilityRate = allMenuItems.length > 0 ? Math.round((availableItems / allMenuItems.length) * 100) : 0

    return (
        <div className="min-h-screen bg-background p-6 pb-20">
            <header className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Staff Dashboard</h1>
                        <p className="text-muted-foreground">Real-time analytics & menu management</p>
                    </div>
                    <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                        <ChefHat className="h-5 w-5" />
                        Canteen Manager
                    </div>
                </div>
                <div className="text-sm text-muted-foreground">
                    Last updated: {new Date().toLocaleTimeString()}
                </div>
            </header>

            {/* Key Metrics Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Ratings Today</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statistics.totalRatings}</div>
                        <p className="text-xs text-muted-foreground mt-1">Real-time feedback</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Positive Feedback</CardTitle>
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statistics.positivePercentage}%</div>
                        <Progress value={statistics.positivePercentage} className="mt-2 h-2" />
                        <p className="text-xs text-muted-foreground mt-1">4-5 star ratings</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Negative Alerts</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statistics.negativeAlerts}</div>
                        <p className="text-xs text-muted-foreground mt-1">1-2 star ratings</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Food Wastage</CardTitle>
                        <ThumbsDown className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Low</div>
                        <p className="text-xs text-muted-foreground mt-1">Based on consumption</p>
                    </CardContent>
                </Card>
            </div>

            {/* Inventory Overview */}
            <div className="grid gap-4 md:grid-cols-3 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            Top Dish Today
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">{statistics.topDish}</div>
                        <p className="text-xs text-muted-foreground mt-1">Highest rated</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            Availability Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">{availabilityRate}%</div>
                        <Progress value={availabilityRate} className="mt-2 h-2" />
                        <p className="text-xs text-muted-foreground mt-1">{availableItems} of {allMenuItems.length} items</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Users className="h-4 w-4 text-purple-500" />
                            Stock Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Available:</span>
                                <span className="font-semibold text-green-600">{availableItems}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Low Stock:</span>
                                <span className="font-semibold text-yellow-600">{lowStockItems}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Out of Stock:</span>
                                <span className="font-semibold text-red-600">{outOfStockItems}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="menu" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2 h-auto">
                    <TabsTrigger value="menu" className="flex items-center gap-2 py-3">
                        <ChefHat className="h-4 w-4" />
                        <span className="font-semibold">Menu Management</span>
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="flex items-center gap-2 py-3">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-semibold">AI Insights & Analytics</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="menu" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Update Availability - All Locations</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Manage stock levels across all locations. Changes are reflected immediately.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <AvailabilityManager initialItems={allMenuItems} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics">
                    <AIInsights />
                </TabsContent>
            </Tabs>
        </div>
    )
}
