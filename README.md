# 🍽️ Canteen Pulse

**The Future of Campus Dining**

A modern, real-time campus dining platform that connects students with live menu updates, availability tracking, and community-driven ratings. Built for TMSL & TIU Campus.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green?style=flat-square&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🎯 Core Features
- **Real-Time Menu Updates** - Live menu availability across 4 campus locations
- **Student Ratings & Reviews** - Community-driven feedback with 5-star ratings
- **Battle Cards** - Showcase most loved and needs-attention dishes
- **Leaderboard** - Gamified system rewarding active reviewers
- **Staff Dashboard** - Comprehensive analytics and inventory management
- **Dark/Light Mode** - Premium theme with smooth transitions (defaults to dark)

### 🏢 Multi-Location Support
- **Main Canteen** - Breakfast & lunch items (veg & non-veg)
- **Food Truck** - Quick bites and street food
- **Snack Store** - Snacks and light refreshments
- **Juice Bar** - Fresh juices, shakes, and beverages

### 🎨 Premium UI/UX
- **Modern Gradient Design** - Blue → Purple → Pink color scheme
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Layout** - Optimized for mobile, tablet, and desktop
- **Glass Morphism** - Premium visual effects and shadows
- **Battle Cards** - Animated dish highlights with hover effects

### 📊 Analytics & Insights
- **Real-Time Statistics** - Total ratings, feedback trends, wastage tracking
- **Top/Bottom Dishes** - Data-driven insights on popular items
- **Availability Tracking** - Live stock status and updates
- **Rating Distribution** - Visual analytics for staff

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **shadcn/ui** - Premium component library
- **Lucide Icons** - Beautiful icon set

### Backend
- **Supabase** - PostgreSQL database, authentication, and real-time subscriptions
- **Row Level Security (RLS)** - Secure data access policies
- **Server Actions** - Type-safe server-side operations

### Authentication
- **Email/Password** - Supabase Auth
- **Role-Based Access** - Student and Staff roles
- **Protected Routes** - Secure dashboard access

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Git

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd canteen-pulse
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Database Setup**

Run the SQL files in order:
```bash
# In your Supabase SQL Editor:
1. supabase/schema.sql
2. supabase/rls_policies.sql
3. supabase/seed.sql
```

5. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🗂️ Project Structure

```
canteen-pulse/
├── app/
│   ├── actions/          # Server actions
│   │   ├── analytics.ts  # Analytics data fetching
│   │   ├── auth.ts       # Authentication
│   │   ├── menu.ts       # Menu operations
│   │   └── staff.ts      # Staff operations
│   ├── leaderboard/      # Leaderboard page
│   ├── profile/          # User profile page
│   ├── staff/            # Staff dashboard
│   ├── globals.css       # Global styles & theme
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── battle-cards.tsx  # Top/bottom dish cards
│   ├── hero-client.tsx   # Hero section
│   ├── menu-section.tsx  # Menu display
│   ├── rating-form.tsx   # Rating submission
│   ├── theme-provider.tsx # Dark mode context
│   └── theme-toggle.tsx  # Theme switcher
├── lib/
│   ├── supabase.ts       # Client-side Supabase
│   └── supabase-server.ts # Server-side Supabase
├── supabase/
│   ├── schema.sql        # Database schema
│   ├── rls_policies.sql  # Security policies
│   └── seed.sql          # Sample data
└── public/               # Static assets
```

## 🎯 Key Features Explained

### Battle Cards
Displays the most loved and needs-attention dishes based on real student ratings:
- **Crowd Favourite** - Green gradient, trophy icon, trending indicator
- **Needs Attention** - Orange/red gradient, alert icon, improvement focus
- Smooth hover animations with lift and shadow effects

### Staff Dashboard
Comprehensive analytics and management:
- **Key Metrics** - Total ratings, positive feedback, alerts, wastage
- **Inventory Overview** - Top dishes, availability rates, stock status
- **Real-Time Updates** - Live menu item management
- **4-Column Grid Layout** - Optimized for data visualization

### Dark Mode
Premium theme implementation:
- Defaults to dark mode
- Smooth transitions (200ms cubic-bezier)
- Theme-aware colors throughout
- Persistent across navigation

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-optimized interactions
- Adaptive layouts for all screen sizes

## 🔐 Security

- **Row Level Security (RLS)** - Database-level access control
- **Authentication Required** - Protected routes and actions
- **Role-Based Permissions** - Staff vs Student access levels
- **Server-Side Validation** - All mutations validated on server

## 🎨 Design System

### Color Palette
- **Primary Gradient**: Blue (#2563EB) → Purple (#9333EA) → Pink (#EC4899)
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Headings**: Outfit (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Weights**: 400 (regular), 600 (semibold), 700 (bold), 900 (black)

### Animations
- **Duration**: 200ms (transitions), 300-500ms (interactions)
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Custom**: shimmer, float, glow effects

## 📱 Pages

### Home (`/`)
- Hero section with gradient background
- Battle Cards (top/bottom dishes)
- Live menu with availability status
- Location-based filtering

### Profile (`/profile`)
- User statistics (ratings, points, streak)
- Recent activity feed
- Edit profile functionality
- Sign out option

### Leaderboard (`/leaderboard`)
- Top 3 podium display
- Rising stars grid (2-column)
- Points and streak tracking
- Animated entry effects

### Staff Dashboard (`/staff`)
- Real-time analytics
- Menu item management
- Availability updates
- Inventory overview

## 🤝 Contributing

This project was built for the IIC Hackathon. Contributions, issues, and feature requests are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 👥 Team

Built with ❤️ for campus dining excellence.

---

**Canteen Pulse** - Your Voice, Our Menu 🎯
