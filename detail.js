// gets the query from the URL
function getQueryParam(field) {
    const url = new URLSearchParams(window.location.search);
    return url.get(field);
}

// outputs the details of the movie
function outputMovie(movie) {
    const movieDetailsElement = document.getElementById("movieDetails");
    const html = `
          <div class="row">
          
              <div class="col-md-4">
                  <img src="${movie.url}" alt="${movie.title}" style="width: 100%;">
              </div>

              <div class="col-md-8" style="background-color: #DFDFDF">
                  <h2 style="text-align: center;">${movie.title}</h2>
                  <p><strong>Year:</strong> ${movie.year}</p>
                  <p><strong>Genre:</strong> ${movie.genre}</p>
                  <p><strong>Score:</strong> ${movie.score}</p>
                  <p><strong>Description:</strong> ${movie.desc}</p>
                  <p><strong>Cast:</strong> ${movie.cast.map((actor, index) => `
                      <li>
                        <img src="${movie.castPic[index]}" alt="${actor}">
                        <strong>${actor} - ${movie.role[index]}</strong>
                      </li>
                    `).join('')}
                  </p>
              </div>
              
          </div>
      `;

    movieDetailsElement.innerHTML = html;
}

// gets the details of the movie from JSON
function getMovie(movieId) {
    fetch("./data.json")
        .then(response => response.json())
        .then(data => {

            const movie = data.movies.find(movie => movie.movieId === movieId);

            if (movie) {
                outputMovie(movie);
            } else {
                console.error("Can't find movie");
            }

        })
}

// loads the details of the movie
window.addEventListener("DOMContentLoaded", () => {
    const movieId = getQueryParam("movieId");
    if (movieId) {
        getMovie(movieId);
    } else {
        console.error("Movie ID not provided");
    }
});