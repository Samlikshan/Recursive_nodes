# Recursive Node Hierarchies - Machine Task

A full-stack application for creating and managing infinite nested node structures. This project demonstrates modern web development practices with a React frontend and Node.js backend using clean architecture principles.

## 🌐 Live Demo

**Hosted Application:**
- **Frontend**: [https://recursive-nodes.vercel.app](https://recursive-nodes.vercel.app)

> **Note**: The live demo is connected to a shared database, so you can see real-time updates from other users. Feel free to create, modify, and delete nodes to test the functionality!

## 🚀 Features

- **Infinite Nesting**: Create unlimited depth node hierarchies
- **Real-time Updates**: Instant UI updates with optimistic rendering
- **Modern UI**: Beautiful, responsive interface with smooth animations
- **CRUD Operations**: Create, read, and delete nodes with intuitive controls
- **Clean Architecture**: Backend follows Domain-Driven Design principles
- **Type Safety**: Full TypeScript implementation across the stack

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with Vite
- **State Management**: TanStack Query for server state
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router for navigation
- **HTTP Client**: Axios for API communication

### Backend (Node.js + TypeScript)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Architecture**: Clean Architecture with Dependency Injection
- **Validation**: Built-in request validation
- **Error Handling**: Centralized error management

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Route components
│   │   ├── api/           # API client functions
│   │   ├── types/         # TypeScript type definitions
│   │   └── lib/           # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── application/   # Use cases and business logic
│   │   ├── domain/        # Entities and repositories
│   │   ├── infrastructure/ # Database models and implementations
│   │   ├── presentation/   # Controllers, routes, and middlewares
│   │   └── config/        # Configuration and DI container
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Query** - Server state management
- **React Router** - Client-side routing
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Inversify** - Dependency injection container
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Samlikshan/Recursive_nodes.git
   cd Recursive_nodes
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   CLIENT_URL=http://localhost:5173
   MONGO_URL=mongodb://localhost:27017/node-hierarchy
   ```

4. **Start the development servers**

   **Terminal 1 - Start the backend:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start the frontend:**
   ```bash
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/node` | Get all nodes as a tree structure | - |
| `POST` | `/api/node` | Create a new node | `{ "name": "string", "parentId": "string" }` |
| `DELETE` | `/api/node/:nodeId` | Delete a node and all its children | - |

### Example API Usage

**Create a root node:**
```bash
curl -X POST http://localhost:5000/api/node \
  -H "Content-Type: application/json" \
  -d '{"name": "Root Node"}'
```

**Create a child node:**
```bash
curl -X POST http://localhost:5000/api/node \
  -H "Content-Type: application/json" \
  -d '{"name": "Child Node", "parentId": "parent-node-id"}'
```

**Get the tree structure:**
```bash
curl http://localhost:5000/api/node
```

## 🎯 Key Features Explained

### 1. Infinite Nesting
The application supports unlimited depth in node hierarchies. Each node can have multiple children, and each child can have its own children, creating complex tree structures.

### 2. Clean Architecture
The backend follows Clean Architecture principles:
- **Domain Layer**: Contains business entities and repository interfaces
- **Application Layer**: Contains use cases and business logic
- **Infrastructure Layer**: Contains database implementations
- **Presentation Layer**: Contains controllers and API routes

### 3. Modern React Patterns
- **Custom Hooks**: Encapsulate business logic and API calls
- **Component Composition**: Reusable UI components
- **Optimistic Updates**: Immediate UI feedback with server synchronization
- **Error Boundaries**: Graceful error handling

### 4. Type Safety
Full TypeScript implementation ensures type safety across the entire application, reducing runtime errors and improving developer experience.

## 🔧 Development Scripts

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
```

### Backend Scripts
```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start           # Start production server
```

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: CSS transitions and hover effects
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Keyboard Navigation**: Full keyboard accessibility
- **Modern Design**: Clean, professional interface

## 🚀 Deployment

### Frontend Deployment
```bash
cd client
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend Deployment
```bash
cd server
npm run build
npm start
# Deploy to your server or cloud platform
```

