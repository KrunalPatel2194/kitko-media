# News Management System - Frontend Setup

## Project Repository
https://github.com/KrunalPatel2194/kitko-media.git

## Features

### Core Features
- CRUD operations for news articles
- Real-time search and filtering
- Responsive design (mobile/desktop)
- Rich text previews
- Pagination
- Status management (draft/published)

### New Features
- **Bilingual Content Management**
  - Full EN/FR support across the application
  - Centralized language context
  - Global language toggle
  - Seamless translation of UI elements
- AI-powered article generation from press releases
- SEO-friendly title generation
- Real-time market data integration
- Tag and company metadata management
- Language toggle (sidebar and preview modal)
- WebSocket updates for market data

## Language Implementation Details

### Language Context Management
- Implemented in `SidebarContext.tsx`
- Provides global state for language selection
- Supports toggle between English and French
- Available throughout the application via `useSidebar()` hook

#### Language Context Structure
```typescript
interface SidebarContextType {
  isSidebarOpen: boolean;
  language: 'en' | 'fr';
  toggleSidebar: () => void;
  toggleLanguage: () => void;
}
```

### Language Toggle Mechanism
- Global toggle button in sidebar
- Immediate UI update across all components
- Preserves current page/state during language switch
- Supports both sidebar and modal language selections

### Multilingual Support Implementation
1. **Components**
   - Utilize `useSidebar()` to access current language
   - Conditional rendering for titles, labels, and content
   - Fallback to default language if translation missing

2. **Article Handling**
   - Store bilingual content (title, content)
   - Flexible display logic
   ```typescript
   const displayTitle = language === 'en' ? article.title : article.titleFr || article.title;
   ```

3. **Form Handling**
   - Side-by-side bilingual input fields
   - Separate validation for each language
   - Optional translation support

## Prerequisites
- Node.js >= 19.0.0
- npm or yarn package manager
- Git
- OpenAI API key
- MongoDB instance

## Getting Started

### Clone the repository
```bash
git clone https://github.com/KrunalPatel2194/kitko-media.git
cd kitko-media/frontend
```

### Install dependencies
```bash
npm install
# or
yarn install
```

### Environment Setup
Create a `.env.local` file in the frontend root directory:
```env
# Core Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# New Configurations
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_WS_URL=ws://localhost:5000
```

## Development
To start the development server:
```bash
npm run dev
# or
yarn dev
```
The application will be available at http://localhost:3000

## Building for Production

Create production build:
```bash
npm run build
# or
yarn build
```

Start production server:
```bash
npm start
# or
yarn start
```

## Project Structure
```
frontend/
├── src/
│   ├── app/          # Next.js app router
│   ├── components/   # UI components
│   │   ├── articles/   # Article-specific components
│   │   └── common/     # Shared components
│   ├── services/     # API and business logic
│   ├── hooks/        # Custom React hooks
│   ├── context/      # React context providers
│   ├── types/        # TypeScript definitions
│   └── styles/       # Global styles
├── public/           # Static assets
├── .env.local        # Environment variables
└── package.json      # Dependencies and scripts
```

## Future Enhancements

### Bilingual UI Extension
1. **List Page**
   - Language toggle for column headers
   - Language-specific search functionality
   - Persistent language preferences

2. **Forms**
   - Side-by-side bilingual editing
   - Auto-translation integration
   - Bilingual validation messages

## Troubleshooting
### Common Issues

#### Port 3000 Already in Use
```bash
# MacOS/Linux
killall -9 node
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### Module Not Found Errors
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

#### OpenAI API Issues
- Verify API key in .env.local
- Check CORS configuration
- Monitor browser console

## Code Quality and Testing
Run linting:
```bash
npm run lint
# or
yarn lint
```

## Support
For issues and feature requests, please create an issue in the GitHub repository.
