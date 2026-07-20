# CodeFolio - Full Stack Portfolio Builder

CodeFolio is a production-ready, highly secure, and visually stunning developer Portfolio Builder. It allows users to register, manage their professional metadata, upload documents (photos, resumes, presentation slides), choose from six distinctive responsive themes, edit their profile in a live-updating split editor, and publish their page instantly under a custom public route.

---

## Technical Architecture

### Tech Stack
- **Frontend**: React (Vite), React Router Dom (Routing), React Helmet Async (SEO Injection), Tailwind CSS (Aesthetics), Framer Motion (Page animations & micro-interactions), Axios (HTTP Client), Canvas Confetti (UX rewards).
- **Backend**: Node.js, Express.js (MVC Pattern).
- **Database**: MongoDB (Mongoose Object Document Mapper).
- **Email Dispatcher**: Nodemailer (Sends contact inquiries to portfolio owners while hiding target addresses).
- **Authentication**: Stateless JWT token authentication stored in local headers and/or cookies, with bcrypt password hashing.

### Security Configurations
- **Helmet**: Secures response headers against malicious injections.
- **CORS**: REST restrictions (restricted to front-end address).
- **Rate Limiters**: Restricts brute-force auth requests (max 20 requests per 15 min) and protects mail dispatch channels against spam (max 10 mails per hour).
- **Mongo Injection Sanitizer**: Custom middleware stripping out keys containing `$` or `.` from inputs.
- **XSS Protection**: HTML tag encoding on incoming request bodies.

---

## Folder Structure

```
d:/code/
├── backend/
│   ├── config/
│   │   └── db.js               # Database Connection Setup
│   ├── controllers/
│   │   ├── authController.js   # Sign up, Log in, Log out Endpoints
│   │   ├── dashboardController.js # Read/Write dashboard, file uploads
│   │   └── portfolioController.js # Public routes, contact mails, themes list
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT Authenticator
│   │   ├── securityMiddleware.js # Limiters, XSS & Mongo Sanitizers
│   │   └── uploadMiddleware.js # Multer multipart handler configuration
│   ├── models/
│   │   ├── User.js             # User Schema (signup collection)
│   │   ├── LoginLog.js         # Login History Schema (login collection)
│   │   └── Portfolio.js        # Portfolio Details Schema (dashboard_details collection)
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── portfolioRoutes.js
│   ├── services/
│   │   └── emailService.js     # Nodemailer SMTP transporter
│   ├── utils/
│   │   └── validators.js       # Signup & Profile validators
│   ├── uploads/                # Static assets hosting directory
│   ├── package.json
│   └── index.js                # Core App initialization
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BrandIcons.jsx  # Fallback SVG Brand Assets (GitHub, LinkedIn)
│   │   │   ├── ProtectedRoute.jsx # Route Guard Component
│   │   │   └── Toast.jsx       # Animated banner alerts
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global Auth state Provider
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx   # Two-column instant preview builder
│   │   │   ├── Home.jsx        # Landing Showcase Page
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── PublicPortfolio.jsx # Public profile renderer (/:username)
│   │   │   └── NotFound.jsx    # 404 Page
│   │   ├── services/
│   │   │   └── api.js          # Axios API Interceptor Configuration
│   │   ├── themes/
│   │   │   ├── index.jsx       # Theme Registry resolver
│   │   │   ├── ThemeContactForm.jsx # Reusable secure contact forms
│   │   │   ├── ModernDeveloper.jsx # Modern dark gradient theme
│   │   │   ├── Minimal.jsx     # High-contrast light serif theme
│   │   │   ├── DarkProfessional.jsx # Monospace terminal theme
│   │   │   ├── CreativeDesigner.jsx # Playful peach neobrutalist theme
│   │   │   ├── Glassmorphism.jsx # Translucent frosted glass theme
│   │   │   └── Corporate.jsx   # Structured navy corporate grid theme
│   │   ├── App.jsx             # React Routing declaration
│   │   ├── index.css           # Global Tailwind and font styles
│   │   └── main.jsx            # DOM Node mount
│   ├── index.html
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

---

## Installation & Launch Instructions

### Prerequisites
- **Node.js** (version 18.0.0 or higher)
- **MongoDB** (local server running at port `27017` or a MongoDB Atlas connection string)

### 1. Database Configuration (Backend)
Navigate to the backend directory, create a `.env` file, and supply environment variables:
```bash
cd backend
# Create and write your .env file
```

Example `.env` configuration:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/portfolio_builder
JWT_SECRET=super_secret_portfolio_key_123_456
JWT_LIFETIME=24h
FRONTEND_URL=http://localhost:5173

# Nodemailer SMTP configurations (Gmail, Mailtrap, etc.)
# If left blank, email submissions will simulate dispatch in the console logs
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_smtp_username
EMAIL_PASS=your_smtp_password
EMAIL_FROM=noreply@portfoliobuilder.com
```

Install packages and run the API server:
```bash
npm install
npm start
```
The backend server will list active connections on port `5000`.

### 2. Frontend Configuration
Navigate to the frontend directory:
```bash
cd ../frontend
```

Create a `.env` or configuration mapping if targeting customized backend API endpoints:
- Under Vite, configurations default to `http://localhost:5000` unless `VITE_API_URL` is set in the environment.

Install packages and boot the hot-reloading development server:
```bash
npm install
npm run dev
```
The React development client will launch at `http://localhost:5173`.

### 3. Build & Serve Production (Optional)
To test or deploy static production assets:
```bash
npm run build
```
Vite will compile production bundles under `frontend/dist/`.

---

## REST API Specification

### Authentication
- `POST /api/signup` - Registers a user, seeds default portfolio details, returns a JWT token.
- `POST /api/login` - Authenticates credentials, appends records to the login logging database, returns a JWT token.
- `POST /api/logout` - Terminates active cookie session states.

### Dashboard Operations (Protected)
- `GET /api/dashboard` - Fetches authenticated user's portfolio data.
- `PUT /api/dashboard` - Saves updated draft content (fullName, projects, bio, skills).
- `POST /api/dashboard/upload/profile` - Uploads a profile image and automatically updates the database reference.
- `POST /api/dashboard/upload/resume` - Uploads a PDF/Word CV document.
- `POST /api/dashboard/upload/ppt` - Uploads a presentation deck.
- `POST /api/dashboard/upload/project-image` - Uploads project screenshot files and returns their path.

### Public Portfolios
- `GET /api/themes` - Returns a JSON declaration of available themes.
- `PUT /api/theme` - Updates selected theme configurations.
- `GET /:username` - Fetches public portfolio JSON according to username.
- `POST /api/contact/:username` - Validates fields, processes Nodemailer, and emails the portfolio owner securely.
