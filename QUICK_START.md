# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Initialize MSW (First Time Only)
```bash
npm run msw:init
```

This will create the Mock Service Worker file in the `public` directory.

### Step 3: Start Development Server
```bash
npm run dev
```

Open your browser to `http://localhost:5173`

## 🔐 Login
- **Username**: `test`
- **Password**: `test123`

## 📝 What You Can Do

1. **Login** with the credentials above
2. **View Tasks** on the dashboard
3. **Create New Tasks** using the "Create New Task" button
4. **Edit Tasks** by clicking "Edit" on any task card
5. **Delete Tasks** by clicking "Delete" (with confirmation)
6. **Toggle Dark Mode** using the theme toggle button
7. **Logout** using the logout button

## 🎯 Features to Test

- ✅ Authentication flow
- ✅ Task CRUD operations
- ✅ Form validation (try submitting empty forms)
- ✅ Dark mode toggle
- ✅ Responsive design (resize browser window)
- ✅ Data persistence (refresh page - data should persist)
- ✅ Empty states (delete all tasks to see empty state)
- ✅ Error handling (try invalid login credentials)

## 🐛 Troubleshooting

**MSW not working?**
- Make sure you ran `npm run msw:init` first
- Check browser console for MSW messages
- Clear browser cache and reload

**Port already in use?**
- Vite will automatically try the next available port
- Check the terminal for the actual URL

**Build errors?**
- Delete `node_modules` and run `npm install` again
- Ensure Node.js version is 18 or higher

## 📦 Production Build

To build for production:
```bash
npm run build
```

The output will be in the `dist` directory.

## 🌐 Deployment

See the main README.md for deployment instructions to Vercel or Netlify.

