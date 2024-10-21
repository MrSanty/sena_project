
# Sena Project

Welcome to the Sena Project! This is a web-based ERP system designed to streamline production management and inventory control. Currently, the project is focused on the production module and is in a preliminary version (MVP). It includes user management, roles, inventory, and production tracking.

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
- **Bun**: To install Bun on your system, follow the instructions below depending on your operating system:

#### Installing Bun on Linux/macOS:

```sh
curl -fsSL https://bun.sh/install | bash
```

#### Installing Bun on Windows:

For Windows, you can install Bun through WSL (Windows Subsystem for Linux) or use the `.zip` bundle. Visit [Bun's official installation page](https://bun.sh/docs/install) for detailed steps.

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

3. **Set up environment variables**:
   Copy the `.env.example` file to `.env` and configure the necessary variables:
   ```sh
   cp .env.example .env
   ```

4. **Running the Project**:
   To start the development server, run:
   ```sh
   bun dev
   ```

   Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Project Structure

- **/actions**: API interaction logic (fetching and mutating data).
- **/app**: Contains all the Next.js page routes.
- **/components**: Reusable UI components.
- **/hooks**: Custom React hooks used throughout the project.
- **/interfaces**: TypeScript interfaces for typing the data models.
- **/lib**: Helper functions and third-party integrations.
- **/prisma**: Configuration for the Prisma ORM and database schema.
- **/public**: Static assets such as images and fonts.
- **/utils**: Utility functions for handling data transformations, formatting, etc.
- **/validations**: Functions and schemas used for validating data and forms.

## Authentication

This project uses **NextAuth.js** for authentication. The configuration is located in `/pages/api/auth/[...nextauth].js`. Ensure that environment variables related to authentication (like `NEXTAUTH_URL`, `SECRET`, etc.) are properly set.

## Styling

We use **Tailwind CSS** for styling the application. Global styles are defined in the `global.css` file, located in the `/app` folder. You can customize your design by modifying or adding new utility classes.

For more information, check the [Tailwind CSS documentation](https://tailwindcss.com/docs).

## UI Components

**NextUI** is used for the UI component library. Refer to the [NextUI documentation](https://nextui.org/docs) for more details on customization and usage.

## Data Fetching

We leverage **TanStack Query** to handle all data fetching and synchronization logic. The API interaction functions are located in the `/actions` folder, where each function handles specific API calls and manages their respective states.

For more advanced usage, visit the [TanStack Query documentation](https://tanstack.com/query/latest).

## License

This project is the private property of the **Centro de Automatización Industrial SENNOVA - Regional Caldas** in Colombia and is not open for external contributions. It is intended for private use within authorized environments only.

---

Thank you for checking out the Sena Project! If you have any questions, feel free to open an issue or contact us.
