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

### API Endpoints

#### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |

#### Vending Machines
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/vending-machines` | List all machines | Private |
| POST | `/api/vending-machines` | Create new machine | Private |
| GET | `/api/vending-machines/:id` | Get machine details | Private |
| PUT | `/api/vending-machines/:id` | Update machine | Private |
| DELETE | `/api/vending-machines/:id` | Delete machine | Private |

#### Inventory (Admin Only)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/inventory/:machineId` | List machine inventory | Admin |
| POST | `/api/inventory/:machineId` | Add inventory item | Admin |
| PUT | `/api/inventory/:id` | Update inventory item | Admin |
| DELETE | `/api/inventory/:id` | Delete inventory item | Admin |

### Query Parameters
| Parameter | Description | Example |
|-----------|-------------|---------|
| `name` | Filter by machine name | `?name=Snack` |
| `city` | Filter by city | `?city=New%20York` |
| `minPrice` | Minimum price filter | `?minPrice=1.50` |
| `maxPrice` | Maximum price filter | `?maxPrice=5.00` |
| `startDate` | Start date filter | `?startDate=2024-01-01` |
| `endDate` | End date filter | `?endDate=2024-12-31` |
| `sortBy` | Field to sort by | `?sortBy=name` |
| `sortOrder` | Sort direction (asc/desc) | `?sortOrder=desc` |
| `page` | Page number | `?page=1` |
| `limit` | Items per page | `?limit=10` |
