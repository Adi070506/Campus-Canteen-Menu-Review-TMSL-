# 🍽️ Canteen Pulse

> **Your Voice, Our Menu** - Real-time campus dining intelligence powered by student feedback

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 🌟 What is Canteen Pulse?

Canteen Pulse is a revolutionary campus dining platform that transforms how students interact with their canteen. Say goodbye to mystery menus and hello to real-time ratings, AI-powered insights, and a gamified experience that makes every meal count!

### ✨ Key Features

- 🎯 **Real-Time Menu Display** - See what's cooking across all campus canteens
- ⭐ **Live Ratings & Reviews** - Rate dishes as you eat, help others decide
- 🏆 **Leaderboard System** - Compete for the top foodie spot on campus
- 🤖 **AI-Powered Analytics** - Staff dashboard with intelligent insights
- 🎮 **Battle Cards** - Daily showdown between top and bottom-rated dishes
- 🔐 **Secure Authentication** - Student & staff roles with password reset
- 🌓 **Dark Mode** - Easy on the eyes, day or night
- 📱 **Fully Responsive** - Seamless experience on any device

## 🚀 Live Demo

**[Try Canteen Pulse Now!](#)** *(Add your Vercel URL here after deployment)*

## 📸 Screenshots

### Hero Section
Beautiful gradient hero with real-time authentication

### Menu Display
Browse dishes across multiple canteen locations with live ratings

### Battle Cards
See which dishes are winning (and losing) the popularity contest

### Leaderboard
Top 25 most active reviewers competing for glory

### Staff Dashboard
AI-powered insights for canteen management

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Shadcn/ui** - Beautiful component library

### Backend
- **Supabase** - PostgreSQL database & authentication
- **Server Actions** - Type-safe API calls
- **Row Level Security** - Database-level permissions

### AI & Analytics
- **Gemini AI** - Intelligent dish analysis
- **Real-time Analytics** - Live rating aggregation

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Gemini AI API key

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/canteen-pulse.git
cd canteen-pulse
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

4. **Set up the database**

Run the SQL scripts in order:
```bash
# In Supabase SQL Editor, run these files in order:
1. supabase/schema.sql
2. supabase/seed.sql
3. supabase/rls_policies.sql
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app! 🎉

## 🎮 Usage

### For Students

1. **Sign Up** - Create an account with your email
2. **Browse Menus** - Check out what's available across all canteens
3. **Rate Dishes** - Share your honest opinion (1-5 stars)
4. **Write Reviews** - Help others with detailed feedback
5. **Climb the Leaderboard** - Become the top reviewer!

### For Staff

1. **Access Dashboard** - Sign in with staff credentials
2. **View Analytics** - See AI-powered insights on dish performance
3. **Monitor Trends** - Track ratings and reviews in real-time
4. **Make Data-Driven Decisions** - Improve menu based on feedback

## 🏗️ Project Structure

```
canteen-pulse/
├── app/                    # Next.js app directory
│   ├── actions/           # Server actions
│   ├── auth/              # Authentication pages
│   ├── leaderboard/       # Leaderboard page
│   ├── profile/           # User profile
│   └── staff/             # Staff dashboard
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── battle-cards.tsx  # Battle cards component
│   ├── hero-section.tsx  # Hero component
│   ├── leaderboard-list.tsx
│   ├── menu-section.tsx  # Menu display
│   └── user-menu.tsx     # User dropdown
├── lib/                   # Utility functions
│   ├── supabase.ts       # Supabase client
│   └── auth-helpers.ts   # Auth utilities
├── supabase/             # Database scripts
│   ├── schema.sql        # Database schema
│   ├── seed.sql          # Sample data
│   └── rls_policies.sql  # Security policies
└── types/                # TypeScript types
```

## 🔐 Authentication Flow

- **Email/Password** authentication via Supabase
- **Role-based access** (Student/Staff)
- **Password reset** with email verification
- **Auto-login** after password reset
- **Secure sessions** with HTTP-only cookies

## 🎨 Design Philosophy

- **Premium aesthetics** - Vibrant gradients and modern UI
- **User-first** - Intuitive navigation and clear feedback
- **Accessible** - WCAG compliant with keyboard navigation
- **Performant** - Optimized images and lazy loading

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub** (see instructions below)

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables
   - Click "Deploy"

3. **Configure Supabase**
   - Add your Vercel URL to Supabase redirect URLs
   - Update `NEXT_PUBLIC_SITE_URL` if needed

## 👥 Team

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Adi070506">
        <img src="https://github.com/Adi070506.png" width="100px;" alt="Adrish Halder"/>
        <br />
        <sub><b>Adrish Halder</b></sub>
      </a>
      <br />
      <a href="https://www.linkedin.com/in/adrishhalder">💼 LinkedIn</a> •
      <a href="https://www.instagram.com/ad.rizzzz">📸 Instagram</a>
    </td>
    <td align="center">
      <a href="https://github.com/Shreya854">
        <img src="https://github.com/Shreya854.png" width="100px;" alt="Shreya Singha"/>
        <br />
        <sub><b>Shreya Singha</b></sub>
      </a>
      <br />
      <a href="https://github.com/Shreya854">💻 GitHub</a>
    </td>
    <td align="center">
      <a href="https://github.com/sohinide-06">
        <img src="https://github.com/sohinide-06.png" width="100px;" alt="Sohini De"/>
        <br />
        <sub><b>Sohini De</b></sub>
      </a>
      <br />
      <a href="https://github.com/sohinide-06">💻 GitHub</a>
    </td>
    <td align="center">
      <a href="https://github.com/sourosree-roy">
        <img src="https://github.com/sourosree-roy.png" width="100px;" alt="Sourosree Roy"/>
        <br />
        <sub><b>Sourosree Roy</b></sub>
      </a>
      <br />
      <a href="https://github.com/sourosree-roy">💻 GitHub</a>
    </td>
  </tr>
</table>

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **IIC Hackathon** - For the opportunity to build this
- **Supabase** - For the amazing backend infrastructure
- **Vercel** - For seamless deployment
- **Google Gemini** - For AI-powered insights
- **Shadcn** - For beautiful UI components

## 📧 Contact

Have questions or suggestions? Reach out to us!

- **Project Link**: [https://github.com/YOUR_USERNAME/canteen-pulse](https://github.com/YOUR_USERNAME/canteen-pulse)
- **Lead Developer**: [Adrish Halder](https://github.com/Adi070506)

---

<p align="center">
  Made with ❤️ and 🍕 for campus foodies everywhere
  <br />
  <sub>Built for IIC Hackathon 2024</sub>
</p>
