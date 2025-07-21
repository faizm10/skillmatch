# Docker Setup Instructions

This guide will help you run this project using Docker. Just follow these simple steps!

---

## 1. What You Need First

- You need Docker Desktop on your computer.
  - [Get Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
  - [Get Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
- Open Docker Desktop and make sure it is running.

---

## 2. What’s in This Project

- There is a `backend` folder and a `frontend` folder. Each has a `Dockerfile`.
- There is a file called `docker-compose.yml` in the main folder. This file helps you run everything together.

---

## 3. How to Start Everything

### Step 1: Open Your Terminal

Go to the main project folder. Type this in your terminal:

```sh
cd /Applications/Visual\ Studio\ Code/skillmatch
```

### Step 2: Build and Start

Type this command and press Enter:

```sh
docker-compose up --build
```

- This will build and start both the backend and frontend.
- The first time, it might take a few minutes.

### Step 3: Open Your App

- When it’s running, you will see logs in your terminal.
- Open your web browser and go to [http://localhost:3000](http://localhost:3000) or [http://localhost:8080](http://localhost:8080) to see the frontend.
- The backend will be on another port, like 4000 or 5000.

### Step 4: Stop Everything

- To stop, go to your terminal and press `Ctrl+C`.
- To clean up, type:

```sh
docker-compose down
```

---

## 4. If You Have Problems

- If you see an error, copy the message and ask for help.
- If you change your code, you might need to run:

```sh
docker-compose up --build
```

again.

---

## 5. What’s Next?

- If you want to change ports or settings, open the `docker-compose.yml` file.
- If you want to connect the backend and frontend, make sure both are listed in `docker-compose.yml`.
- For more help, look at the [Docker docs](https://docs.docker.com/).

---

**You’re all set! Good luck!** 