# Blogify Web Application

### A simple blog platform for people to interact and share their thoughts on any topic.

<br />

### How to Run Application on Local Machine:

#### Prerequisite: Create OAuth client ID credentials in google cloud console

1. Run `npm install`
2. Add .env file and include the following variables
   - DATABASE_URL
   - NEXTAUTH_SECRET
   - GOOGLE_CLIENT_ID (Comes from google developer console)
   - GOOGLE_CLIENT_SECRET (Comes from google developer console)
3. Run `npx prisma db push` to create db tables
4. Once configured, run app with command `npm run dev`

### Additional Details:

- You must use an SQL database
- You must configure the application in google cloud following the [next auth documentation](https://next-auth.js.org/providers/google)
