# Restaurant and Orders Management Dashboard



Welcome to the Restaurant and Orders Management Dashboard, a web application designed to streamline the management of restaurants and their orders. This project utilizes Next.js with TypeScript for the frontend and Express backend with Prisma for database interactions.

[![Version](https://img.shields.io/badge/version-0.0.2-blue.svg)](https://github.com/your-username/restaurant-dashboard/releases/tag/v0.0.2)



## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Restaurant and Orders Management Dashboard aims to simplify the process of managing restaurants and their orders. It provides a user-friendly interface for restaurant owners and managers to keep track of their daily operations, manage menus, and process incoming orders efficiently.

## Features

- **Restaurant Management:** Add, update, and remove restaurant information such as name, location, and contact details.

- **Menu Management:** Easily create and update restaurant menus, including adding, editing, and deleting menu items.

- **Order Tracking:** Keep track of incoming orders in real-time, mark orders as processed, and manage order fulfillment.

- **User Authentication:** Secure user authentication system to ensure only authorized personnel can access and manage restaurant data.

- **Dashboard Analytics:** Gain insights into order trends, popular menu items, and other relevant data through visualizations and reports.

## Technologies Used

- Frontend: Next.js, TypeScript, React
- Backend: Express.js, Prisma (ORM)
- Database: MongoDB (You can specify the database you're using)
- User Interface: HTML, CSS (styled-components or any other styling approach you used)
- Authentication: JWT (JSON Web Tokens)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB database instance

### Installation

1. Clone this repository to your local machine:
   ```
   git clone https://github.com/EchoTeam-Digital/MegaFoodDashboard
   ```

2. Navigate to the project directory:
   ```
   cd MegaFoodDashboard
   ```

3. Install frontend and backend dependencies:
   ```
   cd client
   npm install
   cd backend
   npm install
   ```

### Configuration

1. Create a `.env` file in the `backend` directory and configure your database connection settings, etc. Example:
   ```env
   DATABASE_URL=your-database-url
   ```

2. Run database migrations using Prisma:
    ```
    cd backend
    npx prisma migrate dev
    ```

## Usage

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```

3. Access the application in your browser at `http://localhost:5020`.

## Contributing

Contributions are welcome! If you find any bugs or want to add new features, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
