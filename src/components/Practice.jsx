export function Practice(){
const apiKey = '9e7c17c14466104df6e6923d6de2dab5'; // Replace with your actual TMDB API key
const base_url = 'https://api.themoviedb.org/3';
const movie_name = 'war';
const genre_id = 28; // Replace with the genre ID you're interested in

// API endpoint for searching movies
const searchEndpoint = `${base_url}/search/movie`;

// Set up parameters for the request
const params = new URLSearchParams({
  api_key: apiKey,
  query: movie_name,
  with_genres: genre_id,
});

// Make the request using Fetch API
fetch(`${searchEndpoint}?${params}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((result) => {
    // Process the results
    result.results.forEach((movie) => {
      console.log(`Title: ${movie.title}, Release Date: ${movie.release_date}, Genre: ${movie.genre_ids}`);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
    return "Hello"
}
