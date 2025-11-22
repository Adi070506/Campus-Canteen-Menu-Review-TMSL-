# Canteen Pulse - TMSL Edition

A modern web platform for Techno Main Salt Lake (TMSL) and TIU students to check daily canteen menus, rate dishes, and share real-time feedback.

## Features

- 🍽️ **Daily Menu Display** - View menus from Main Canteen, Food Truck, and Snack Store
- ⭐ **Dish Ratings & Reviews** - Rate dishes and share feedback with tags
- 🏆 **Leaderboard** - Gamified system with points and streaks
- 👨‍🍳 **Staff Portal** - Manage availability and view analytics
- 🎨 **Modern UI** - Beautiful, animated interface with Framer Motion
- 🔐 **Authentication** - Secure login for students and staff

## Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **UI Components**: shadcn/ui, Framer Motion
- **Backend**: Supabase (PostgreSQL, Authentication, RLS)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/Campus-Canteen-Menu-Review.git
cd Campus-Canteen-Menu-Review
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:
- Go to your Supabase project dashboard
- Navigate to SQL Editor
- Run the SQL scripts in order:
  1. `supabase/schema-remaining.sql` (creates tables)
  2. `supabase/seed.sql` (populates sample data)

5. Configure Supabase Authentication:
- Go to Authentication → Providers → Email
- Disable "Confirm email" for development
- Save changes

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
canteen-pulse/
├── app/                    # Next.js app router pages
│   ├── actions/           # Server actions
│   ├── dish/[id]/         # Dish detail page
│   ├── leaderboard/       # Leaderboard page
│   ├── staff/             # Staff portal
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── hero-section.tsx  # Hero component
│   ├── menu-section.tsx  # Menu display
│   └── ...
├── lib/                   # Utility functions
│   ├── supabase.ts       # Supabase client
│   └── auth-helpers.ts   # Authentication helpers
├── supabase/             # Database scripts
│   ├── schema-remaining.sql
│   └── seed.sql
└── types/                # TypeScript types

```

## Database Schema

- **profiles** - User profiles (students and staff)
- **locations** - Canteen locations
- **dishes** - Global dish catalog
- **daily_menus** - Daily menus per location
- **daily_menu_items** - Available dishes with status
- **ratings** - User ratings and feedback

## Features in Detail

### Student Portal
- View daily menus across all locations
- Rate dishes with 1-5 stars
- Add tags and comments to ratings
- Track personal streak and points
- View leaderboard rankings

### Staff Portal
- Update dish availability status
- View analytics and insights
- Manage daily menus

## Deployment

The app is ready to deploy on Vercel:

```bash
npm run build
```

Then connect your GitHub repository to Vercel and deploy.

## Contributing

This is a hackathon project for TMSL/TIU. Contributions are welcome!

## License

MIT

## Acknowledgments

- Built for IIC Hackathon
- Designed for TMSL & TIU campus community
