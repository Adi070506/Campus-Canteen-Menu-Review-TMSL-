import { getDailyMenu, getLocations } from '@/app/actions/menu'
import { getTopAndBottomDishes } from '@/app/actions/analytics'
import { HeroSection } from '@/components/hero-section'
import { MenuSection } from '@/components/menu-section'
import { BattleCards } from '@/components/battle-cards'

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const locations = await getLocations()

  // Fetch menus for all locations in parallel
  const menus = await Promise.all(
    locations.map(async (loc) => ({
      id: loc.id,
      name: loc.name,
      items: await getDailyMenu(loc.name)
    }))
  )

  // Fetch top and bottom dishes for battle cards
  const { topDish, bottomDish } = await getTopAndBottomDishes()

  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Battle Cards Section */}
      <BattleCards topDish={topDish} bottomDish={bottomDish} />

      <MenuSection locations={locations} menus={menus} />
    </main>
  )
}
