import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getDailyMenu, getLocations } from '@/app/actions/menu'
import { AvailabilityManager } from '@/components/availability-manager'
import { AlertTriangle, ThumbsUp, ThumbsDown, TrendingUp } from 'lucide-react'

export default async function StaffDashboard() {
    const locations = await getLocations()

    // For MVP, just fetch Canteen menu for management
    // In real app, staff would select their location
    const canteenMenu = await getDailyMenu('Canteen')

    return (
        <div className="min-h-screen bg-background p-6 pb-20">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Staff Dashboard</h1>
                    <p className="text-muted-foreground">Manage menu & view insights</p>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium">
                    Canteen Manager
                </div>
            </header>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Ratings Today</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">124</div>
                        <p className="text-xs text-muted-foreground">+12% from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Positive Feedback</CardTitle>
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">82%</div>
                        <p className="text-xs text-muted-foreground">Top Dish: Chicken Biryani</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Negative Alerts</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">"Cold Coffee" reported watery</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Wastage Risk</CardTitle>
                        <ThumbsDown className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Low</div>
                        <p className="text-xs text-muted-foreground">Based on current consumption</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="menu" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="menu">Menu Management</TabsTrigger>
                    <TabsTrigger value="analytics">AI Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="menu" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Update Availability</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AvailabilityManager initialItems={canteenMenu} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics">
                    <Card>
                        <CardHeader>
                            <CardTitle>Daily AI Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-muted p-4 rounded-lg border">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    ✨ AI Analysis
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>Students are loving the <strong>Chicken Biryani</strong> today, but many mentioned it was slightly spicy.</li>
                                    <li><strong>Cold Coffee</strong> has received multiple complaints about being "too watery". Consider adjusting the milk ratio.</li>
                                    <li><strong>Veg Thali</strong> sales are steady, but feedback suggests the Dal is cold.</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
