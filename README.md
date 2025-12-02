# Recipe App

An AI-powered recipe generation application that helps you create delicious meals from ingredients in your kitchen. Manage your pantry inventory and get personalised recipe suggestions using OpenAI's GPT.

## Features

- **AI Recipe Generation** - Generate personalized recipes based on available ingredients using OpenAI GPT
- **Smart Pantry Management** - Organise ingredients across Cupboard, Fridge, and Freezer storage types
- **User Authentication** - Secure account system with JWT tokens, password reset via email
- **Favourite Recipes** - Save and manage your favourite AI-generated recipes
- **Offline Support** - Manage ingredients locally without being logged in, sync on login
- **User Account Management** - Personal profile and account settings

## Tech Stack

### Frontend
- **Next.js 14** - React framework with SSR/SSG capabilities
- **React 18** - Modern UI library with hooks and context
- **TypeScript** - Type-safe development
- **React Icons** - Comprehensive icon library
- **React Toastify** - Toast notifications

### Backend
- **Express.js** - Web application framework
- **MongoDB & Mongoose** - Database and ODM
- **OpenAI API** - AI recipe generation
- **JWT Authentication** - Secure token-based auth
- **Bcrypt** - Password hashing
- **Nodemailer** - Email functionality

### Security
- Helmet, CORS, Rate limiting
- XSS protection, MongoDB sanitization
- HTTP-only cookies for JWT tokens

## Project Structure

```
receipe-app/
├── client/                    # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Reusable UI components
│   │   │   └── contexts/      # React contexts (Auth, FavRecipes)
│   │   ├── pages/             # Next.js pages and API routes
│   │   ├── utils/             # Frontend utilities
│   │   └── styles/            # CSS styling
│   └── middleware.ts          # Route protection
└── server/                    # Express.js backend
    ├── controllers/           # Route handlers
    ├── models/                # MongoDB schemas
    ├── routes/                # Express routes
    └── utils/                 # Server utilities
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- OpenAI API key

### Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd receipe-app
```

2. Create environment files:

**Server (.env in server directory):**
```bash
NODE_ENV=development
PORT=8000
DATABASE=<MongoDB connection string>
DATABASE_PASSWORD=<MongoDB password>
JWT_SECRET=<JWT signing secret>
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
EMAIL_USERNAME=<Email for password reset>
EMAIL_APP_PASSWORD=<Email app password>
```

**Client (.env.local in client directory):**
```bash
NEXT_PUBLIC_OPENAI_API_KEY=<OpenAI API key>
NEXT_PUBLIC_APP_API_URL=http://127.0.0.1:8000
```

### Installation & Development

1. **Install server dependencies:**
```bash
cd server
npm install
```

2. **Install client dependencies:**
```bash
cd client
npm install
```

3. **Start the development servers:**

Terminal 1 (Server):
```bash
cd server
npm start
```

Terminal 2 (Client):
```bash
cd client
npm run dev
```

4. **Access the application:**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)

## Available Scripts

### Client Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Server Commands
- `npm start` - Start the Express server
- `npm run dev` - Start server with nodemon (if configured)

## API Endpoints

### Authentication
- `POST /api/v1/users/signup` - User registration
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/logout` - User logout
- `POST /api/v1/users/forgot-password` - Password reset
- `POST /api/v1/users/check-auth` - Authentication verification

### Pantry Management
- `GET /api/v1/items/:type` - Get items by storage type (cupboard/fridge/freezer)
- `POST /api/v1/items/:type` - Add new ingredient
- `PATCH /api/v1/items/:id` - Update ingredient
- `DELETE /api/v1/items/:id` - Delete ingredient

### Recipes
- `GET /api/v1/favourite-recipes` - Get user's favourite recipes
- `POST /api/v1/favourite-recipes` - Add recipe to favourites
- `DELETE /api/v1/favourite-recipes/:id` - Remove favourite recipe
- `POST /api/generateRecipes` - Generate AI recipes from ingredients

## Usage

1. **Sign up** for an account or use offline mode
2. **Add ingredients** to your virtual pantry (categorized by storage type)
3. **Generate recipes** by selecting ingredients and letting AI create personalized suggestions
4. **Save favourites** to easily access your preferred recipes later
5. **Manage your account** and sync data across devices

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

This application implements security best practices including:
- JWT authentication with HTTP-only cookies
- Password hashing with bcrypt
- Rate limiting (100 requests/hour per IP)
- XSS protection and input sanitization
- CORS configuration
- Secure headers with Helmet

## License

This project is licensed under the MIT License.
