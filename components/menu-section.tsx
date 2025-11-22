'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DishCard } from '@/components/dish-card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { UtensilsCrossed } from 'lucide-react'
import { DailyMenuItem } from '@/types'

interface MenuSectionProps {
    locations: { id: string; name: string }[]
    menus: { id: string; name: string; items: DailyMenuItem[] }[]
}

export function MenuSection({ locations, menus }: MenuSectionProps) {
    const [activeTab, setActiveTab] = useState(locations[0]?.name)

    const activeMenu = menus.find(m => m.name === activeTab)

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
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {!activeMenu || activeMenu.items.length === 0 ? (
                            <Alert className="bg-muted/50 border-dashed">
                                <UtensilsCrossed className="h-4 w-4" />
                                <AlertTitle>No Menu Available</AlertTitle>
                                <AlertDescription>
                                    The menu for {activeTab} hasn't been updated for today yet.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {activeMenu.items.map((item, index) => (
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
