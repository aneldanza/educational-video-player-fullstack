# README

# Educational Video Player Fullstack

A brief description of your project.

## Table of Contents
- [Installation](#installation)
  - [Backend Setup (Ruby on Rails)](#backend-setup-ruby-on-rails)
  - [Frontend Setup (React)](#frontend-setup-react)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Backend Setup (Ruby on Rails)

1. **Clone the repository**
    ```bash
    git clone https://github.com/aneldanza/educational-video-player-fullstack.git
    cd educational-video-player-fullstack
    ```

2. **Install Ruby and Rails**
    Ensure you have Ruby installed. You can use a version manager like `rbenv` or `rvm`. Install Rails if you haven't already:
    ```bash
    gem install rails
    ```

3. **Install backend dependencies**
    Navigate to the backend directory and install the required gems:
    ```bash
    bundle install
    ```

4. **Start the Rails server**
    ```bash
    rails server
    ```
    Your backend API should now be running on `http://localhost:3000`. If you look at the page you will see an error. That's because we need to add the frontend as well.

### Frontend Setup (Vite + React)

1. **Install Node.js and npm**
    Ensure you have Node.js and npm installed. You can download them from [here](https://nodejs.org/).

2. **Install frontend dependencies**
    In the project directory, open new tab in your terminal and run command:
    ```bash
    npm install
    ```

3. **Start the React development server**
    ```bash
    npm run dev
    ```

You can go back to `http://localhost:3000` now and you should see the app.

## Usage

Explain how to use your project, including any commands or scripts that need to be run. Provide examples or screenshots if possible.

Example:
```bash
# Running both frontend and backend simultaneously
# Open two terminal windows/tabs

# In the first terminal (for Rails backend):
cd backend
rails server

# In the second terminal (for React frontend):
cd frontend
npm start
