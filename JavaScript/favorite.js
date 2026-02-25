document.addEventListener('DOMContentLoaded', () => {
    const favoriteGrid = document.getElementById('favoriteGrid');
    const favorites = JSON.parse(localStorage.getItem('book_favorites')) || [];

    if (favorites.length === 0) {
        favoriteGrid.innerHTML = '<p class="text-center col-span-full py-10 text-gray-500 text-xl">You haven\'t saved any books yet. Go to Home to find some!</p>';
        return;
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