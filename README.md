# Ordering App 🛒

## **Introduction**

small single page application to edit existing orders.

## Features

- We need to be able to see a list of existing orders
- If you land on the detail page of an order, we need see its items (with description, price, ...) and total.
- We need to be able to remove a product from the order
- We need to be able to add an additional product to the order
- We need to be able to place the order and receive a confirmation of its success (or failure)

## Stack

- React
- Redux Toolkit: State Management
- Typescript: type-checking
- Redux-thunk: handling side-effects and middleware
- Styling: TailwindCss and ShadCn/UI
- Vitest , Vitest Ui , React testing library and MSW : testing and mocking API
- Json-server : fake REST API
- Faker : generating fake data
- Docker
- Vite

## Getting Started

1. Clone this repository.
2. Install dependencies with `npm install`
3. Start the development server with `npm run start`
4. Build the project with `npm run build`.
5. Navigate to `http://localhost:5173` in your browser.
6. This will start the back-end process at `http://localhost:3000`. If port 3000 is in use on your machine, update the port number in the following files and run `npm start` again:

```tsx
src / data / api;
```

## Testing

To run unit tests, use the command `npm run test`

Run unit test in Vitest Ui, use the command `npm run test:ui`

## Deployment

1. Build the Docker image with `docker build -t orders-spa .`.
2. Run the Docker container with `docker run -p 3000:80 covid-project`.

---
