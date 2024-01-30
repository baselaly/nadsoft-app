# NadSoft App

### Description

A simple user management system to manage users CRUD operations using nodejs by express js Framework and postgresql as SQL Database .

### Installation

- git clone https://github.com/baselaly/nadsoft-app.git
- cd project-path/
- Run `npm install` to install all dependencies
- create `.env` file from `.env.example` and provide it with your credentials
- Run `npm run prisma:migrate-prod` to apply migrations to your database
- Run `npm run prisma:generate` to create prisma client

### Run The Project

- Run `npm run dev` to run in developemnt mode
- Run `npm run prod` to run in production mode
- Run `npm run pm2:start` to run the project with pm2 for multi instances to improve the performance
- You Now Can Use The App. on http://localhost:{yourPort}

