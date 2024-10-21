# Sena Project

Welcome to the Sena Project! This project leverages several modern technologies to deliver a robust and scalable web application.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and generating static websites.
- **NextAuth.js**: Authentication for Next.js applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **NextUI**: A React UI library for building modern web applications.
- **TanStack Query**: Powerful data fetching and state management for React.
- **Bun**: A fast all-in-one JavaScript runtime.

## Getting Started

To run this project, you need to have Bun installed. Follow the steps below to get started:

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **Bun**: Install Bun by running the following command:
  ```sh
  curl -fsSL https://bun.sh/install | bash
  ```

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/sena_project.git
   cd sena_project
   ```

2. **Install dependencies**:
   ```sh
   bun install
   ```

### Running the Project

To start the development server, run:
```sh
bun dev
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Project Structure

- **/actions**: Contains functions for interacting with the API.
- **/app**: Contains all the pages of the application.
- **/components**: Contains reusable components.
- **/hooks**: Contains custom hooks.
- **/interfaces**: Contains TypeScript interfaces.
- **/lib**: Contains libraries functions.
- **/prisma**: Contains Prisma configuration files.
- **/public**: Contains static assets.
- **/utils**: Contains utility functions.
- **/validations**: Contains validation functions.

## Authentication

NextAuth.js is used for authentication. Configuration can be found in `/pages/api/auth/[...nextauth].js`.

## Styling

Tailwind CSS is used for styling. Custom styles can be added in `/styles/globals.css`.

## UI Components

NextUI is used for building UI components. Refer to the [NextUI documentation](https://nextui.org/docs) for more details.

## Data Fetching

TanStack Query is used for data fetching and state management. Configuration can be found in `/lib/queryClient.js`.

## Contributing

We welcome contributions! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

---

Thank you for checking out the Sena Project! If you have any questions, feel free to open an issue or contact us.
