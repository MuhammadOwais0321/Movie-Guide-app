console.log(`yaa hoo`);

// checking all element that available or not
const requiredElements = [
  {
    name: "searchForm",
    element: document.querySelector<HTMLFormElement>("form"),
  },
  {
    name: "inputBox",
    element: document.querySelector<HTMLInputElement>(".inputBox"),
  },
  {
    name: "movieContainer",
    element: document.querySelector<HTMLDivElement>(".movie-container"),
  },
] as const;
const missing = requiredElements
  .filter((item) => !item.element)
  .map((item) => item.name);

if (missing.length > 0) {
  throw new Error(`Missing DOM elements: ${missing.join(", ")}`);
}

// Element variable

const searchForm = requiredElements[0].element!;
const inputBox = requiredElements[1].element!;
const movieContainer = requiredElements[2].element!;

// Function to fetch movie detailes using omdb api
const getMovieInfo = async (movie: string) => {
  try {
    const myapiKey = `d156b5e7`;
    const Url = `https://www.omdbapi.com/?apikey=${myapiKey}&t=${movie}
`;
    const response = await fetch(Url);
    if (!response.ok) {
      throw new Error("Unable to fetch movie data.");
    }
    const data = await response.json();

    showMovies(data);
  } catch (error) {
    showErrorMessage("No movie found!!!");
  }
};

interface MovieData {
  Title: string;
  imdbRating: string;
  Genre: string;
  Released: string;
  Runtime: string;
  Actors: string;
  Plot: string;
  Poster: string;
}
// Function to show movie data on screen
const showMovies = (movie: MovieData): void => {
  movieContainer.innerHTML = "";
  movieContainer.classList.remove("nobackground");
  console.log(movie);
  //  use destructuring assingnment to extract properties from data object
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    movie;

  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-info");
  movieElement.innerHTML = `<h2>${Title}</h2>
    <p><strong>Rating: &#11088</strong>${imdbRating}</p>`;

  const movieGenreElement = document.createElement("div");
  movieGenreElement.classList.add("movie-genre");

  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerHTML = element;
    movieGenreElement.append(p);
  });

  movieElement.append(movieGenreElement);

  movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
   <p><strong>Duration: </strong>${Runtime}</p>
   <p><strong>cast: </strong>${Actors}</p>
   <p><strong>Plot: </strong>${Plot}</p>`;

  //    Creating a div for movie poster
  const moviePosterElement = document.createElement("div");
  moviePosterElement.classList.add("movie-poster");
  moviePosterElement.innerHTML = `<img src='${Poster}'/>`;
  movieContainer.append(moviePosterElement);
  movieContainer.append(movieElement);
};
// Function to display error message

const showErrorMessage = (message: string): void => {
  movieContainer.innerHTML = `<h2> ${message} </h2>`;
  movieContainer.classList.add("nobackground");
};
// Function to handle form submission

const handleformsubmission = (e: SubmitEvent) => {
  e.preventDefault();
  const movieName = inputBox.value.trim();
  if (movieName) {
    showErrorMessage("Loading Movie Information... ");
    getMovieInfo(movieName);
  } else {
    showErrorMessage("Enter movie name to get movie information");
  }
};

// Adding event listener to search form
searchForm.addEventListener("submit", handleformsubmission);

