// This module handles all communication with the Open Library API
export async function searchBooks(query) {
    try {
        // We use encodeURIComponent to handle spaces in book titles safely
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        // The API returns an array called 'docs'. We only want the first 12 results for now.
        return data.docs.slice(0, 12); 
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
}