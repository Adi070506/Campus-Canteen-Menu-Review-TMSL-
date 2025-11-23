'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DishCard } from '@/components/dish-card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { UtensilsCrossed, Leaf, Drumstick } from 'lucide-react'
import { DailyMenuItem } from '@/types'

interface MenuSectionProps {
    locations: { id: string; name: string }[]
    menus: { id: string; name: string; items: DailyMenuItem[] }[]
}

export function MenuSection({ locations, menus }: MenuSectionProps) {
    const [activeTab, setActiveTab] = useState(locations[0]?.name)
    const [foodFilter, setFoodFilter] = useState<'all' | 'veg' | 'non-veg'>('all')

    const activeMenu = menus.find(m => m.name === activeTab)

    // Filter items based on veg/non-veg selection
    const filteredItems = activeMenu?.items.filter(item => {
        if (!item.dish) return false
        if (foodFilter === 'all') return true
        if (foodFilter === 'veg') return item.dish.is_veg === true
        if (foodFilter === 'non-veg') return item.dish.is_veg === false
        return true
    }) || []

    return (
        <div id="menu" className="container mx-auto px-4 pb-20">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="sticky top-[80px] z-20 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 mb-6">
                    <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-muted/50 rounded-xl scrollbar-hide">
                        {locations.map((loc) => (
                            <TabsTrigger
                                key={loc.id}
                                value={loc.name}
                                className="flex-1 min-w-[100px] py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-300"
                            >
                                {loc.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Veg/Non-Veg Filter */}
                    <div className="flex gap-2 mt-3 justify-center">
                        <Button
                            variant={foodFilter === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFoodFilter('all')}
                            className="gap-2"
                        >
                            All Items
                        </Button>
                        <Button
                            variant={foodFilter === 'veg' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFoodFilter('veg')}
                            className={`gap-2 ${foodFilter === 'veg' ? 'bg-green-600 hover:bg-green-700' : 'border-green-600 text-green-600 hover:bg-green-50'}`}
                        >
                            <Leaf className="w-4 h-4" />
                            Veg
                        </Button>
                        <Button
                            variant={foodFilter === 'non-veg' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFoodFilter('non-veg')}
                            className={`gap-2 ${foodFilter === 'non-veg' ? 'bg-red-600 hover:bg-red-700' : 'border-red-600 text-red-600 hover:bg-red-50'}`}
                        >
                            <Drumstick className="w-4 h-4" />
                            Non-Veg
                        </Button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {!activeMenu || filteredItems.length === 0 ? (
                            <Alert className="bg-muted/50 border-dashed">
                                <UtensilsCrossed className="h-4 w-4" />
                                <AlertTitle>No Items Available</AlertTitle>
                                <AlertDescription>
                                    {!activeMenu
                                        ? `The menu for ${activeTab} hasn't been updated for today yet.`
                                        : `No ${foodFilter === 'veg' ? 'vegetarian' : foodFilter === 'non-veg' ? 'non-vegetarian' : ''} items available at ${activeTab}.`
                                    }
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <DishCard item={item} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </Tabs>
        </div>
    )
}
