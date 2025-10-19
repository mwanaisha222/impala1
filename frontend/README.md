# Impala Healthtech Research Frontend

A modern React application built with Vite, TypeScript, and Tailwind CSS for Impala Healthtech Research Limited - showcasing evidence-based health technology solutions and research initiatives.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite for fast development
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: shadcn/ui components for consistent UI
- **Rich Text Editor**: ReactQuill integration for article creation
- **Authentication**: User signup, login, and session management
- **API Integration**: Full integration with Django REST Framework backend
- **Image Optimization**: Lazy loading and optimized asset handling
- **Routing**: React Router DOM for seamless navigation

## 🛠 Tech Stack

- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **HTTP Client**: Fetch API with custom hooks
- **Rich Text**: ReactQuill
- **Routing**: React Router DOM
- **State Management**: React hooks and context

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Header, Footer, Navigation
│   ├── BoardCard.tsx   # Board member cards with modals
│   ├── Partners.tsx    # Partner logos section
│   └── LeadershipTeam.tsx
├── pages/              # Route components
│   ├── Landing.tsx     # Homepage
│   ├── WhoWeAre.tsx    # About page with team info
│   ├── WhatWeDo.tsx    # Services page
│   ├── Contact.tsx     # Contact form
│   ├── Articles.tsx    # Article listing
│   ├── ArticleForm.tsx # Create/edit articles
│   ├── Login.tsx       # User authentication
│   └── Signup.tsx      # User registration
├── lib/                # Utility functions
│   ├── utils.ts        # General utilities
│   └── csrf.ts         # CSRF token handling
├── hooks/              # Custom React hooks
├── assets/             # Static assets (images, logos)
├── App.tsx             # Main app component
└── main.tsx           # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Impala-Healthtech-Research/impalawebsite.git
   cd impalawebsite/frontend/impala-sparkle-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🏗 Key Components

### Layout Components
- **Header**: Navigation with logo and menu items
- **Footer**: Company info, links, and contact details
- **Partners**: Logo showcase with hover effects

### Page Components
- **Landing**: Homepage with hero section, partners, and call-to-action
- **WhoWeAre**: Team profiles, board members, and company info
- **WhatWeDo**: Services and research focus areas
- **Articles**: Blog/news system with CRUD operations
- **Contact**: Contact form with backend integration

### Authentication
- **Signup/Login**: User registration and authentication
- **CSRF Protection**: Token-based security for form submissions
- **Session Management**: Persistent user sessions

## 🔐 Security Features

- **CSRF Protection**: Automatic CSRF token handling for all API requests
- **Secure Authentication**: Token-based auth with Django backend
- **Input Validation**: Client-side form validation
- **XSS Prevention**: Sanitized content rendering

## 🎨 Styling & UI

- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality, accessible components
- **Responsive Design**: Mobile-first approach
- **Dark Mode Support**: Built-in theme switching
- **Animations**: Smooth transitions and hover effects

## 📊 Content Management

### Articles System
- Rich text editor with ReactQuill
- Image upload and management
- Author attribution
- Publication workflow

### Team Profiles
- Board member cards with modal biographies
- Leadership team showcase
- Role-based organization

## 🌐 API Integration

### Backend Communication
- RESTful API integration with Django
- Automatic CSRF token handling
- Error handling and user feedback
- File upload support

### Endpoints Used
- `/api/articles/` - Article CRUD operations
- `/api/contacts/` - Contact form submissions
- `/api/signup/` - User registration
- `/api/login/` - User authentication
- `/api/csrf/` - CSRF token retrieval

## 🚀 Deployment

### Vite Build
The project uses Vite for building and bundling:

```bash
npm run build
npm run preview  # Test production build locally
```

### Environment Variables
Configure these for different environments:

```env
VITE_API_URL=https://your-backend-domain.com
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is proprietary to Impala Healthtech Research Limited.

## 🤝 Support

For technical support or questions:
- Email: support@impala-healthtech.com
- Website: https://impala-healthtech.com

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Added Partners section and team profiles
- **v1.2.0** - Enhanced authentication and CSRF protection

---

**Built with ❤️ by the Impala Healthtech Research Team**

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/8ee8e502-41aa-40a3-9aa5-d3349451cf66) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
