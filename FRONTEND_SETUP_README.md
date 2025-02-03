# News Management System - Frontend Setup

## Project Repository
[https://github.com/KrunalPatel2194/kitko-media.git](https://github.com/KrunalPatel2194/kitko-media.git)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js >= 19.0.0
- npm or yarn package manager
- Git

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/KrunalPatel2194/kitko-media.git
cd kitko-media/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Environment Setup:
Create a `.env.local` file in the frontend root directory:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## Development

To start the development server:
```bash
npm run dev
# or
yarn dev
```
The application will be available at `http://localhost:3000`

## Building for Production

1. Create production build:
```bash
npm run build
# or
yarn build
```

2. Start production server:
```bash
npm start
# or
yarn start
```

## Code Quality and Testing

Run linting:
```bash
npm run lint
# or
yarn lint
```

## Project Structure
```
frontend/
├── src/
│   ├── app/          # Next.js app router
│   ├── components/   # Reusable components
│   ├── pages/        # Page components
│   └── styles/       # Global styles
├── public/           # Static assets
├── .env.local        # Environment variables
└── package.json      # Dependencies and scripts
```

## Troubleshooting

Common issues and solutions:

1. Port 3000 already in use:
```bash
killall -9 node
# or on Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

2. Module not found errors:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

## Support

For issues and feature requests, please create an issue in the [GitHub repository](https://github.com/KrunalPatel2194/kitko-media/issues).