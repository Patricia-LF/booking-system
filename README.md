# Booking System — Exquisite Studio

A full-stack booking system built as a side project to explore C# and backend development.

## Tech Stack

**Backend**

- C# / ASP.NET Core Web API (.NET 10)
- Entity Framework Core
- SQLite

**Frontend**

- React 19
- TypeScript
- Vite
- CSS Modules
- FullCalendar

## Features

- Create and manage customers, services and bookings
- Automatic end time calculation based on service duration
- Double booking prevention
- Input validation on both frontend and backend
- Weekly calendar view with booking blocks
- Toggle between calendar and table view
- Bookings sorted by date and time
- Responsive design with hamburger menu for mobile

## Project Structure

- BookingApi.Server/ # C# REST API
- bookingapi.client/ # React + TypeScript frontend

## Deployment

- Backend: Railway
- Frontend: Vercel

## Getting Started

**Backend**

Open `BookingApi.Server` in Visual Studio and press the run button, or run in terminal:

```bash
cd BookingApi.Server
dotnet run
```

**Frontend**

```bash
cd bookingapi.client
npm install
npm run dev
```

The frontend runs on `https://localhost:5173` and the backend on `https://localhost:7118`.

## Possible Future Improvements

- Authentication and user roles
