# persona - AI-Powered Personal Diary & Biodata App

A beautiful, modern application for persona, an AI-powered personal diary and biodata app built with React, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- 🔐 **Supabase Authentication** - Secure user authentication with email/password
- 📧 **Email Verification** - Email confirmation for new accounts
- 🔑 **Password Reset** - Forgot password functionality
- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Built with Vite for fast development
- 🎯 shadcn/ui components for consistent UI
- 📱 Fully responsive across all devices
- ✨ Smooth animations and transitions
- 🎓 Professional design tailored for personal diary and biodata management

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Supabase account and project ([Sign up here](https://supabase.com))

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Project Settings → API
   - Copy your Project URL and anon/public key

3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Configure Supabase Authentication:
   - In your Supabase dashboard, go to Authentication → URL Configuration
   - Add your site URL: `http://localhost:5173` (for development)
   - Add redirect URLs:
     - `http://localhost:5173/auth/callback`
     - `http://localhost:5173/reset-password`
   - For production, add your production URLs as well

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
persona/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   └── LandingPage.tsx
│   ├── lib/
│   │   └── utils.ts     # Utility functions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons
- **Supabase** - Backend and authentication
- **React Router** - Client-side routing

## License

MIT

