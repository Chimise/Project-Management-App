# Project Management App

A fullstack application for creating and tracking the state of your tasks for your new projects with support for user authentication as well as adding comments to task, viewing reports and messages.

## Demo
Here is a working live demo: [https://taskr-beryl.vercel.app/](https://taskr-beryl.vercel.app/)

## Usage
To run the project locally, follow these steps below:
* Install postgres database on your computer [if not already installed](https://www.postgresql.org/download/) and create a new user and database.
* Install [Node.js](https://nodejs.org/en/download/) if not already installed and run the command ```npm install -g knex``` on your terminal to install knex globally.
* Clone this repository, create an .env.local file in the root folder and add the following enviromental variables **DB_USER**, **DB_NAME**, **DB_PASSWORD** and **JWT_SECRET**.
* Run the following command ```knex migrate:latest --knexfile ./utils/knexfile.js``` and ```knex seed:run --knexfile ./utils/knexfile.js``` to run the all the migrations and seeds.
* Install the dependencies by running ```npm install``` and run the command ```npm run dev``` to start up your development server.
* Visit [http://localhost:3000](http://localhost:3000) to view the homepage of the web application.
* You can also run all the test files by running ```npm test```.

## Technologies
Project was created with:
* [Next.js](https://nextjs.org/)
* [Postgres](https://www.postgresql.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Framer Motion](https://www.framer.com/)
* [Knex](https://knexjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
