Phase One Capstone Project: Book Explorer(OpenReads)
A web application that allows users to search for books using an external API and save their top picks to a personalized "Favorites" list.

Features
Live Book Search: Search for books by title or author in real-time.

Favorites System: Save books to local storage so they persist even after a page refresh.

Responsive UI: Clean, grid-based layout for easy browsing.

Dynamic Rendering: Content is updated instantly using JavaScript without reloading the page.

Technology used
HTML5 & Tailwind: For the structure and styling.

JavaScript (ES6+): Handling API calls and DOM manipulation.

OpenLibrary API: Used to fetch real-world book data.

Local Storage: To keep the "Favorites" list saved locally on the user's browser.

📂 Project Structure
Plaintext
├── index.html          # Main search page
├── about.html          # Project information
├── JavaScript/         # Folder for logic
│   ├── main.js         # Search and display logic
│   ├── fetchBooks.js   # API integration
│   ├── favorite.js     # Favorites management
└── favorites.html      # Saved books gallery
