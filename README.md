# Divine Project

A modern web application built with React.js frontend and Node.js backend, converted from Django.

## Project Structure

```
windsurf-project/
├── backend/                 # Node.js API server
│   ├── config/
│   │   └── database.js     # Database configuration
│   ├── routes/
│   │   └── auth.js         # Authentication routes
│   ├── package.json
│   ├── server.js           # Main server file
│   └── .env                # Environment variables
├── frontend/               # React.js application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   └── Navbar.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── db.sqlite3             # SQLite database
└── README.md
```

## Features

- **React.js Frontend**: Modern, component-based UI with Vite
- **Node.js Backend**: RESTful API with Express.js
- **SQLite Database**: Lightweight database for user management
- **Authentication**: JWT-based login/registration system
- **Responsive Design**: Mobile-first approach with beautiful animations
- **User Profiles**: Customizable user profiles with additional information

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Environment Setup

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
```

## Running the Application

### Development Mode

1. **Start the Backend Server** (Terminal 1):
```bash
cd backend
npm run dev
```

2. **Start the Frontend Development Server** (Terminal 2):
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Mode

1. **Build the Frontend**:
```bash
cd frontend
npm run build
```

2. **Start the Backend Server**:
```bash
cd backend
npm start
```

The application will be available at http://localhost:5000

## API Endpoints

### Authentication

- `GET /api/auth/` - Welcome message
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Health Check

- `GET /api/health` - Server health status

## Database Schema

### Users Table
- `id` (Primary Key)
- `username`
- `email` (Unique)
- `password` (Hashed)
- `phone_number`
- `created_at`
- `updated_at`

### User Profiles Table
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `bio`
- `birth_date`
- `location`
- `website`

## Usage Examples

### Register a New User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "phone_number": "+1234567890"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Get User Profile

```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Technologies Used

### Frontend
- React 18
- Vite (Build tool)
- React Router (Navigation)
- Axios (HTTP client)
- CSS3 with animations

### Backend
- Node.js
- Express.js
- SQLite3
- bcryptjs (Password hashing)
- JWT (Authentication)
- CORS (Cross-origin resource sharing)

## Development Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Troubleshooting

### Common Issues

1. **Database Connection Error**: Ensure the `db.sqlite3` file exists in the project root
2. **Port Already in Use**: Change the PORT in the `.env` file or kill the process using the port
3. **CORS Issues**: The backend is configured to allow CORS, but check your API calls in development

### Reset Database

To reset the database, delete the `db.sqlite3` file and restart the backend server. New tables will be created automatically.

## Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] File upload for profile pictures
- [ ] Social media authentication
- [ ] Admin dashboard
- [ ] API rate limiting
- [ ] Input validation middleware
