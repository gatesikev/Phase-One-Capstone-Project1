import { searchBooks } from './fetchBooks.js';

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const bookGrid = document.getElementById('bookGrid');

// Function to create a "Book Card" HTML string
function createBookCard(book) {
    // Some books don't have covers; we provide a fallback image
    const coverId = book.cover_i;
    // Replace the old placeholder line with this one:
const coverUrl = coverId 
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` 
    : 'https://placehold.co/150x200?text=No+Cover';

    return `
        <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center">
            <img src="${coverUrl}" alt="${book.title}" class="h-48 w-32 object-cover mb-4 rounded">
            <h3 class="font-bold text-center text-gray-800 line-clamp-1">${book.title}</h3>
            <p class="text-sm text-gray-500 mb-4">${book.author_name ? book.author_name[0] : 'Unknown Author'}</p>
            <button class="fav-btn bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 mt-auto w-full">
                Add to Favorites
            </button>
        </div>
    `;
}

// Event Listener for Search
searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    // Show loading state
    bookGrid.innerHTML = '<p class="col-span-full text-center text-xl">🔍 Searching for books...</p>';

    const books = await searchBooks(query);

    if (books.length === 0) {
        bookGrid.innerHTML = '<p class="col-span-full text-center text-red-500">No books found. Try another search!</p>';
        return;
    }

    // Render the books
    bookGrid.innerHTML = books.map(book => createBookCard(book)).join('');
});


// 1. Initialize favorites from localStorage or an empty array
let favorites = JSON.parse(localStorage.getItem('book_favorites')) || [];

// 2. Add Event Listener to the book grid
// We use 'event delegation' because the buttons are created dynamically
document.getElementById('bookGrid').addEventListener('click', (e) => {
    if (e.target.classList.contains('fav-btn')) {
        const card = e.target.closest('div');
        
        // Grab book details from the card
        const bookData = {
            title: card.querySelector('h3').innerText,
            author: card.querySelector('p').innerText,
            image: card.querySelector('img').src,
            id: Date.now() // Unique ID to help with deleting later
        };

        // Check if already in favorites to avoid duplicates
        const isAlreadySaved = favorites.some(fav => fav.title === bookData.title);
        
        if (!isAlreadySaved) {
            favorites.push(bookData);
            localStorage.setItem('book_favorites', JSON.stringify(favorites));
            alert('Added to Favorites! ❤️');
        } else {
            alert('This book is already in your favorites!');
        }
    }
});