document.addEventListener('DOMContentLoaded', () => {
    const favoriteGrid = document.getElementById('favoriteGrid');
    const favCount = document.getElementById('fav-count');
    const favorites = JSON.parse(localStorage.getItem('book_favorites')) || [];

     // Update count display
    if (favCount) {
        favCount.innerText = `${favorites.length} ${favorites.length === 1 ? 'Book' : 'Books'} Saved`;
    }

    if (favorites.length === 0) {
    favoriteGrid.innerHTML = `
        <div class="col-span-full text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                <p class="text-gray-500 text-xl mb-4">Your shelf is empty!</p>
                <a href="index.html" class="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition">Browse Books</a>
            </div>
    `;
    return;
}
 favoriteGrid.innerHTML = favorites.map(book => `
        <div class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition flex flex-col items-center group">
            <div class="relative overflow-hidden rounded-lg mb-4">
                <img src="${book.image}" class="h-56 w-40 object-cover transform group-hover:scale-105 transition duration-300 shadow-md">
            </div>
            <h3 class="font-bold text-gray-900 text-center line-clamp-1 mb-1">${book.title}</h3>
            <p class="text-sm text-gray-500 mb-5 italic">${book.author}</p>
            
            <button onclick="removeFavorite(${book.id})" 
                class="w-full py-2 border-2 border-red-100 text-red-500 rounded-lg hover:bg-red-50 text-sm font-bold transition flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
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

