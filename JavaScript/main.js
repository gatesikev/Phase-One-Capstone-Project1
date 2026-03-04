import { searchBooks } from './fetchBooks.js';

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const bookGrid = document.getElementById('bookGrid');

function createBookCard(book) {
    const coverId = book.cover_i;
    // Replace the old placeholder line with this one:
const coverUrl = coverId 
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` 
    : 'https://placehold.co/150x200?text=No+Cover';
    
    // 1. CHECK IF BOOK IS ALREADY IN FAVORITES
    // We check if the title matches any book title in our saved 'favorites' array
    const isSaved = favorites.some(fav => fav.title === book.title);

    // 2. SET BUTTON TEXT AND STYLE BASED ON STATUS
    const buttonText = isSaved ? 'Saved' : 'Add to Favorites';
    const buttonClass = isSaved 
        ? 'fav-btn bg-emerald-600 text-white px-4 py-2 rounded mt-auto w-full cursor-default' 
        : 'fav-btn bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 mt-auto w-full';

    return `
        <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center">
            <img src="${coverUrl}" alt="${book.title}" class="h-48 w-32 object-cover mb-4 rounded">
            <h3 class="font-bold text-center text-gray-800 line-clamp-1">${book.title}</h3>
            <p class="text-sm text-gray-500 mb-4">${book.author_name ? book.author_name[0] : 'Unknown Author'}</p>
            <button class="${buttonClass}" ${isSaved ? 'disabled' : ''}>
                ${buttonText}
            </button>
        </div>
    `;
}

// Logic to fetch and display books
async function performSearch(query) {
    bookGrid.innerHTML = '<p class="col-span-full text-center text-xl">🔍 Loading books...</p>';
    const books = await searchBooks(query);
    if (books.length === 0) {
        bookGrid.innerHTML = '<p class="col-span-full text-center text-red-500">No books found. Try another search!</p>';
        return;
    }
    bookGrid.innerHTML = books.map(book => createBookCard(book)).join('');
}

// FIX: Load default books when page opens
window.addEventListener('DOMContentLoaded', () => {
    performSearch('Bestsellers'); // Default keyword
});

// Event Listener for Search Button
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) performSearch(query);
});

// FAVORITES LOGIC
let favorites = JSON.parse(localStorage.getItem('book_favorites')) || [];

document.getElementById('bookGrid').addEventListener('click', (e) => {
    if (e.target.classList.contains('fav-btn')) {
        const card = e.target.closest('div');
        const bookData = {
            title: card.querySelector('h3').innerText,
            author: card.querySelector('p').innerText,
            image: card.querySelector('img').src,
            id: Date.now()
        };

        const isAlreadySaved = favorites.some(fav => fav.title === bookData.title);
        if (!isAlreadySaved) {
            favorites.push(bookData);
            localStorage.setItem('book_favorites', JSON.stringify(favorites));
            // Better UI Feedback
            e.target.innerText = "Added to Favorites ❤️";
            e.target.classList.replace('bg-gray-800', 'bg-emerald-600');
        } else {
            alert('This book is already in your favorites!');
        }
    }
});

// main.js

function initNavbar() {
    // Your navbar initialization logic here
    console.log('Navbar initialized!');
}

// Run the navbar init when the DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    // Your performSearch logic should also be here
});
