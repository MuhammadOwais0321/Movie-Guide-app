declare const requiredElements: readonly [{
    readonly name: "searchForm";
    readonly element: HTMLFormElement | null;
}, {
    readonly name: "inputBox";
    readonly element: HTMLInputElement | null;
}, {
    readonly name: "movieContainer";
    readonly element: HTMLDivElement | null;
}];
declare const missing: ("searchForm" | "inputBox" | "movieContainer")[];
declare const searchForm: HTMLFormElement;
declare const inputBox: HTMLInputElement;
declare const movieContainer: HTMLDivElement;
declare const getMovieInfo: (movie: string) => Promise<void>;
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
declare const showMovies: (movie: MovieData) => void;
declare const showErrorMessage: (message: string) => void;
declare const handleformsubmission: (e: SubmitEvent) => void;
//# sourceMappingURL=script.d.ts.map