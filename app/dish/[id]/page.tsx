import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { RatingForm } from '@/components/rating-form'

export default async function DishPage({ params }: { params: { id: string } }) {
    const { id } = params

    const { data: dish } = await supabase
        .from('dishes')
        .select('*')
        .eq('id', id)
        .single()

    if (!dish) return <div>Dish not found</div>

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="relative h-64 md:h-80 w-full">
                <Image
                    src={dish.image_url || '/placeholder-food.jpg'}
                    alt={dish.name}
                    fill
                    className="object-cover"
                />
                <Link href="/" className="absolute top-4 left-4">
                    <Button variant="secondary" size="icon" className="rounded-full shadow-md">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-10">
                <Card className="shadow-xl border-none">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <Badge variant="outline" className="mb-2">{dish.category}</Badge>
                                <CardTitle className="text-2xl md:text-3xl font-bold">{dish.name}</CardTitle>
                            </div>
                            <div className="text-xl font-bold text-primary">₹{dish.price}</div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-muted-foreground text-lg">{dish.description}</p>

                        <div className="flex items-center gap-2 text-yellow-500 text-lg font-medium">
                            <Star className="w-6 h-6 fill-current" />
                            <span>4.5</span>
                            <span className="text-muted-foreground text-base">(24 ratings)</span>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">Rate this Dish</h3>
                            <RatingForm dishId={dish.id} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
