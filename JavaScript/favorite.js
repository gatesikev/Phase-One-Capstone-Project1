document.addEventListener('DOMContentLoaded', () => {
    const favoriteGrid = document.getElementById('favoriteGrid');
    const favorites = JSON.parse(localStorage.getItem('book_favorites')) || [];

    if (favorites.length === 0) {
    favoriteGrid.innerHTML = `
        <div class="col-span-full text-center py-20 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200">
            <i class="fa-solid fa-book-open text-amber-300 text-5xl mb-4"></i>
            <p class="text-amber-800 text-lg font-medium">Your shelf is empty!</p>
            <p class="text-amber-600 text-sm mt-1 mb-6">Go back to Home to add books you love.</p>
            <a href="index.html" class="inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition shadow-md">
                Browse Books
            </a>
        </div>
    `;
}

    favoriteGrid.innerHTML = favorites.map(book => `
        <div class="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex flex-col items-center">
            <img src="${book.image}" class="h-48 w-32 object-cover mb-4 rounded shadow">
            <h3 class="font-bold text-gray-800 text-center">${book.title}</h3>
            <p class="text-sm text-gray-500 mb-4">${book.author}</p>
            <button onclick="removeFavorite(${book.id})" class="text-red-500 hover:text-red-700 text-sm font-semibold underline">
                Remove
            </button>
        </div>
    `).join('');
});

// Function to remove a book
window.removeFavorite = (id) => {
    let favorites = JSON.parse(localStorage.getItem('book_favorites')) || [];
    favorites = favorites.filter(book => book.id !== id);
    localStorage.setItem('book_favorites', JSON.stringify(favorites));
    location.reload(); // Refresh to show updated list
};

