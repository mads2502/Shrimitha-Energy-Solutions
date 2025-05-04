# Srimitha Energy Solutions Website

A sophisticated website for Srimitha Energy Solutions showcasing their electrical engineering services with customizable content sections and contact functionality.

## Features

- Complete responsive website with modern UI components
- Dark/light theme toggle functionality
- Dynamic content management through database
- Interactive services, projects, and team member displays
- Contact form and newsletter subscription
- Events and workshops listing
- Industry collaborations showcase

## Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS, ShadcnUI
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter
- **State Management**: React Query
- **Styling**: TailwindCSS with custom components
- **Animation**: Framer Motion

## Setup Instructions

1. Clone this repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run database migrations: `npm run db:push`
5. Seed the database: `npm run db:seed`
6. Start the application: `npm run dev`

## Database Setup

The application requires a PostgreSQL database. Set the following environment variables:

- `DATABASE_URL`: Your PostgreSQL connection string

## Project Structure

- `client/`: Frontend React application
- `server/`: Backend Express API
- `db/`: Database configuration and seed files
- `shared/`: Shared types and utilities between frontend and backend