import { getDailyMenu, getLocations } from '@/app/actions/menu'
import { HeroSection } from '@/components/hero-section'
import { MenuSection } from '@/components/menu-section'

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

  return (
    <main className="min-h-screen">
      <HeroSection />

      <div className="container mx-auto px-4 py-12">
        {/* Daily Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-8 transition-all hover:shadow-2xl hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="relative flex items-center gap-4">
              <div className="text-6xl group-hover:scale-110 transition-transform duration-300">🏆</div>
              <div className="text-white">
                <span className="text-xs font-bold uppercase tracking-wider opacity-90">Don't Miss Out</span>
                <h3 className="text-2xl font-black mt-1">Dish of the Day</h3>
                <p className="text-lg font-semibold opacity-95">Chicken Biryani</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 p-8 transition-all hover:shadow-2xl hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="relative flex items-center gap-4">
              <div className="text-6xl group-hover:scale-110 transition-transform duration-300">💀</div>
              <div className="text-white">
                <span className="text-xs font-bold uppercase tracking-wider opacity-90">Proceed with Caution</span>
                <h3 className="text-2xl font-black mt-1">Roast of the Day</h3>
                <p className="text-lg font-semibold opacity-95">Cold Coffee</p>
                <p className="text-sm mt-1 opacity-80">"Too watery today"</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MenuSection locations={locations} menus={menus} />
    </main>
  )
}
