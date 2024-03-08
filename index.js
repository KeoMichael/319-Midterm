// turns the image into a button to details
function toDetails(movieId) {
    window.location.href = 'detail.html?movieId=' + movieId;
}

// creates the front page of movies with clickable images
function showMovie(movies) {

    var moviePage = document.getElementById('moviesContainer');
    moviePage.innerHTML = '';

    movies.forEach(function (movie) {
        var img = document.createElement('img');
        img.style.cursor = 'pointer';
        img.src = movie.url;
        img.alt = movie.title;
        img.addEventListener('click', function () {
            toDetails(movie.movieId);
        });


        var col = document.createElement('div');
        col.className = 'col';

        moviePage.appendChild(col);
        col.appendChild(img);
    });
}

// gets the movies and shows the movie
fetch('./data.json')
    .then(response => response.json())
    .then(data => showMovie(data.movies))