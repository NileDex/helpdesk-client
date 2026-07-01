UniHelp Frontend
================

React web interface for the RSU Smart Student HelpDesk Chatbot.
Built with React 18, Vite, and Tailwind CSS 3.

Requirements
------------
- Node.js 18 or higher
- npm 9 or higher
- The UniHelp Flask backend must be running (see SERVER/README.md)

Setup
-----
1. Open a terminal and go into the CLIENT folder:

   cd CLIENT

2. Install dependencies:

   npm install

3. Start the development server:

   npm run dev

   The app opens at http://localhost:5173

   In development mode, the frontend automatically connects to your local
   Flask server at http://localhost:5000 via the .env.development file.

Build for Production
--------------------
To create an optimised production build:

   npm run build

Output goes to CLIENT/dist. Deploy that folder to any static host
such as Vercel, Netlify, or GitHub Pages.

Environment Variables
---------------------
The API URL is set through environment files so you never need to edit
the source code when switching between local and production.

  .env               Contains the deployed production server URL
  .env.development   Contains the local development server URL

Vite automatically uses .env.development when you run npm run dev,
and uses .env when you run npm run build.

To point to a different server, edit the VITE_API_URL line in the
relevant file before running.

Project Structure
-----------------

CLIENT/
+-- index.html
+-- vite.config.js
+-- tailwind.config.js
+-- postcss.config.js
+-- .env                        Production API URL
+-- .env.development            Local dev API URL
+-- src/
    +-- main.jsx                App entry point
    +-- App.jsx                 Root component
    +-- App.css                 Base styles and scrollbar utility
    +-- index.css               Tailwind directives and typing animation
    +-- services/
    |   +-- chatService.js      Sends messages to the Flask API
    +-- components/
        +-- ChatCard.jsx        Main chat layout and state management
        +-- MessageContent.jsx  Renders bold text and clickable links
        +-- QuestionDictionary.jsx  Browse questions by category
        +-- SuggestedReplies.jsx    Quick-reply chips

Deploying to Vercel
-------------------
1. Push the project to a GitHub repository.
2. Go to vercel.com, create a new project, and import the repository.
3. Set the Root Directory to CLIENT in the Vercel project settings.
4. Under Settings > Environment Variables, add:

   Name  : VITE_API_URL
   Value : https://your-railway-url.up.railway.app/api/chat

5. Click Deploy. Vercel runs npm run build automatically.
