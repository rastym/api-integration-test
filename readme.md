# Project Setup

This project consists of two main parts: the **frontend** (built with Next.js) and the **backend** (built with Nest.js). The backend API uses the `TWILIGHT_API_KEY` from the `.env` file to authenticate API requests.

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) version `22.13.1` (as specified in the `engines` field in both frontend and backend `package.json` files).
- [npm](https://www.npmjs.com/) (Node package manager).  
  If you don't have Node.js and npm installed, you can download and install them from [here](https://nodejs.org/).

### Clone the Repository

If you haven't already, clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-folder>
```

This repository has two folders: `front-end` (Next.js frontend) and `back-end` (Nest.js backend).

## Setting Up the Backend (Nest.js)

1. **Navigate to the backend folder**:
   ```bash
   cd back-end
   ```
2. **Install backend dependencies**:  
   Run the following command to install the required packages:
   ```bash
   npm install
   ```
3. **Configure environment variables**:  
   Create a `.env` file in the `back-end` folder (if it doesn't already exist), and add the following:
   ```bash
   TWILIGHT_API_KEY=YOUR API KEY HERE
   ```
4. **Start the backend in development mode**:  
   To start the backend server in development mode, run:
   ```bash
   npm run start:dev
   ```
   This will start the Nest.js server and automatically restart it on file changes. The backend will be running on `http://localhost:3001` by default.

## Setting Up the Frontend (Next.js)

1. **Navigate to the frontend folder**:
   ```bash
   cd ../front-end
   ```
2. **Install frontend dependencies**:  
   Run the following command to install the required packages:
   ```bash
   npm install
   ```
3. **Start the frontend in development mode**:  
   To start the frontend server in development mode, run:
   ```bash
   npm run dev
   ```
   This will start the Next.js server and automatically open it in your default browser, usually at `http://localhost:3000`.

## Folder Structure

Your folder structure should look like this:

```
/root
  /front-end           # Next.js frontend
    /node_modules
    package.json
    .next/
    pages/
    public/
  /back-end            # Nest.js backend
    /node_modules
    package.json
    dist/
    src/
    .env
```

## Running Both Frontend and Backend Simultaneously

To run both the backend and frontend in development mode simultaneously, you can open two separate terminal windows:

1. **In the first terminal window**:
   - Navigate to the `back-end` folder and run `npm run start:dev` to start the backend.
2. **In the second terminal window**:
   - Navigate to the `front-end` folder and run `npm run dev` to start the frontend.  
     Both should now be running and you can access them as follows:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:3001](http://localhost:3001)

## Common Commands

- **Frontend**:
  - `npm run dev`: Run the Next.js app in development mode.
- **Backend**:
  - `npm run start:dev`: Run the Nest.js app in development mode.
