# News Management System - Backend Setup

## Project Repository
[https://github.com/KrunalPatel2194/kitko-media.git](https://github.com/KrunalPatel2194/kitko-media.git)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js >= 18.0.0
- MongoDB
- npm or yarn package manager
- Git

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/KrunalPatel2194/kitko-media.git
cd kitko-media/backend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Environment Setup:
Create a `.env` file in the backend root directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/news_management

# Authentication
JWT_SECRET=your_jwt_secret_key

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
```

## Database Setup

1. Start MongoDB service:
```bash
# On Linux
sudo systemctl start mongodb

# On macOS with Homebrew
brew services start mongodb-community

# On Windows (MongoDB should be running as a service)
```

2. Verify MongoDB connection:
```bash
mongo
# or
mongosh
```

## Running the Application

Development mode with hot reload:
```bash
npm run dev
# or
yarn dev
```

Production mode:
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Testing

1. Run all tests:
```bash
npm test
```

2. Run tests in watch mode:
```bash
npm run test:watch
```

3. Generate coverage report:
```bash
npm run test:coverage
```

## Project Structure
```
backend/
├── src/
│   ├── config/       # Configuration files
│   ├── controllers/  # Request handlers
│   ├── middlewares/  # Express middlewares
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   └── app.ts        # Main application file
├── tests/            # Test files
├── .env              # Environment variables
└── package.json      # Dependencies and scripts
```

## Debugging

To run with debug logs:
```bash
DEBUG=app:* npm run dev
```

## Linting and Formatting

1. Run linting:
```bash
npm run lint
```

2. Fix linting issues:
```bash
npm run lint:fix
```

## Common Issues and Solutions

1. MongoDB connection issues:
```bash
# Check MongoDB service status
sudo systemctl status mongodb

# Check MongoDB logs
tail -f /var/log/mongodb/mongod.log
```

2. Port already in use:
```bash
# Find process using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

## Support

For issues and feature requests, please create an issue in the [GitHub repository](https://github.com/KrunalPatel2194/kitko-media/issues).