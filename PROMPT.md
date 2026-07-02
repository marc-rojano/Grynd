
# Grynd Project Prompt

You are an expert software engineer tasked with helping me build a fitness application called Grynd. This document provides all the necessary context for you to understand the project and assist me in its development.

## Project Overview

Grynd is a web application designed for fitness enthusiasts to manage their workouts, track their progress, and discover new gym routines.

### Key Features:

*   **User Authentication:** Secure user registration and login.
*   **Workout Management:** Create, view, update, and delete personalized workout plans.
*   **Exercise Library:** A comprehensive list of exercises with descriptions, muscle groups, and video tutorials.
*   **Progress Tracking:** Log and visualize progress for specific exercises over time.
*   **Pre-defined Routines:** A collection of ready-to-use workout routines.

### Tech Stack:

*   **Frontend:** React, TypeScript, Vite
*   **Backend:** Node.js, Express
*   **Database:** PostgreSQL
*   **Authentication:** JWT (JSON Web Tokens)
*   **Styling:** CSS Modules, Emotion

## Database Schema

The database is designed to be scalable and relational. Here are the table definitions:

```sql
-- Users table: Stores user credentials and basic information.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Workouts table: Stores workout plans created by users.
CREATE TABLE workouts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Exercises table: A central library of all available exercises.
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    muscle_group VARCHAR(255),
    video_url VARCHAR(255)
);

-- workout_exercises table: Links exercises to specific workouts (many-to-many).
CREATE TABLE workout_exercises (
    id SERIAL PRIMARY KEY,
    workout_id INTEGER NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    sets INTEGER,
    reps INTEGER,
    duration_minutes INTEGER,
    UNIQUE (workout_id, exercise_id)
);

-- Sets table: Logs the details of each set performed for an exercise in a workout.
CREATE TABLE sets (
    id SERIAL PRIMARY KEY,
    workout_exercise_id INTEGER NOT NULL REFERENCES workout_exercises(id) ON DELETE CASCADE,
    set_number INTEGER NOT NULL,
    reps INTEGER,
    weight_kg REAL,
    duration_seconds INTEGER,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Progress table: Tracks a user's performance for a specific exercise over time.
CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    weight_kg REAL,
    reps INTEGER,
    sets INTEGER,
    UNIQUE (user_id, exercise_id, date)
);
```

## How to Help

When I ask for help, please refer to this document to understand the context. Your tasks may include:

*   Writing backend API endpoints.
*   Developing frontend components.
*   Implementing new features.
*   Fixing bugs.
*   Improving the database schema.
*   Writing documentation.

Please ensure that your code is clean, well-documented, and follows the established conventions of the project.
