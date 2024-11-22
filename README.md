# Vending Machine API
## Description
A RESTful API for managing vending machines and their inventories. This project allows users to perform CRUD operations on vending machines and their stock, with features including search, filtering, and admin-only inventory management.

## Features
- Vending machine management (CRUD operations)
- Inventory management (Admin only)
- Search functionality by:
  - Machine Name
  - Location (Address/City)
  - Price Range
  - Date Range
- Sorting capabilities by:
  - Machine Name
  - Price
- Pagination
- Authentication & Authorization
- Input Validation
- Error Handling

## Technologies Used
- Node.js
- Express.js
- MongoDB
- CircleCI for CI/CD
- Jest for testing
- JWT for authentication

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Set up environment variables: `cp .env.example .env`
4. Seed the database: `npm run seed`
5. Run the application: `npm run dev`
6. Run the tests: `npm test`

## API Documentation

### Vending Machine Endpoints
GET /api/vending-machines - List all machines
POST /api/vending-machines - Create new machine
GET /api/vending-machines/:id - Get machine details
PUT /api/vending-machines/:id - Update machine
DELETE /api/vending-machines/:id - Delete machine

### Inventory Endpoints (Admin Only)
GET /api/inventory/:machineId - List machine inventory
POST /api/inventory/:machineId - Add inventory item
PUT /api/inventory/:id - Update inventory item
DELETE /api/inventory/:id - Delete inventory item


### Query Parameters
- Search:
  - `name`: Search by machine name
  - `city`: Search by city
  - `minPrice`: Minimum price filter
  - `maxPrice`: Maximum price filter
  - `startDate`: Start date filter
  - `endDate`: End date filter
- Sorting:
  - `sortBy`: Field to sort by
  - `sortOrder`: 'asc' or 'desc'
- Pagination:
  - `page`: Page number
  - `limit`: Items per page
