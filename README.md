# Brainly - Knowledge Management Tool

Brainly is a comprehensive knowledge management application designed to help users organize, store, and share their personal knowledge base. Think of it as your digital brain where you can capture ideas, notes, links, and other content, categorize them with tags, and optionally share your entire knowledge collection with others through unique shareable links.

## Overview

In today's information-rich world, it's easy to forget important details, lose track of useful resources, or struggle to organize thoughts. Brainly solves this by providing a simple yet powerful platform to:

- **Capture Knowledge**: Store various types of content including text notes, links, documents, and media
- **Organize Efficiently**: Use customizable tags to categorize and find your content quickly
- **Share Selectively**: Choose to keep your knowledge private or share your entire "brain" with others
- **Access Anywhere**: Web-based interface ensures your knowledge is accessible from any device

## Key Features

### User Management
- Secure user registration and authentication
- Password encryption for data protection
- JWT-based session management

### Content Management
- Create and store multiple types of content (text, links, documents, etc.)
- Rich content organization with tagging system
- Easy content retrieval and management
- Delete unwanted content with confirmation

### Knowledge Sharing
- Generate unique shareable links for your entire knowledge base
- Control privacy settings - share or keep private
- View shared brains from other users
- Secure sharing without compromising personal data

### User Interface
- Clean, intuitive web interface
- Responsive design for mobile and desktop
- Brain-themed visual design with engaging animations
- Sidebar navigation for easy access to different sections

## Architecture

Brainly follows a modern full-stack architecture:

### Backend (Server)
- **Framework**: Node.js with Express.js
- **Language**: TypeScript for type safety
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Validation**: Zod schema validation
- **CORS**: Cross-origin resource sharing enabled

### Frontend (Client)
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and building
- **State Management**: Redux for global state
- **Routing**: React Router for navigation
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Custom SVG icons

## How It Works

1. **Sign Up/Login**: Users create accounts with secure authentication
2. **Create Content**: Add various types of knowledge content to your personal brain
3. **Tag and Organize**: Assign tags to content for better organization
4. **Manage Collection**: View, edit, and delete content as needed
5. **Share Knowledge**: Optionally generate a shareable link to share your entire brain
6. **Explore Shared Brains**: Access shared knowledge from other users

## Data Security

- User passwords are hashed using bcrypt
- JWT tokens ensure secure API access
- User content is isolated and private by default
- Shareable links provide controlled access to public content

## Future Enhancements

Brainly is designed with extensibility in mind. Potential future features include:
- Content search functionality
- Advanced tagging with hierarchies
- Content import/export capabilities
- Collaboration features for shared editing
- Mobile applications
- Integration with external knowledge sources

## Author

Developed by Tajinder Singh

---

*Brainly - Never forget what matters. Your knowledge, organized and accessible.*
