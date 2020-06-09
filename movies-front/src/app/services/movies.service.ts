import { Movie } from './../model/movie.model';
import { Genre } from './../model/genre.model';
import { MovieList } from './../model/movie-list.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const URL: string = "http://localhost:3000/api/movies";
const URL_GENRES: string = "http://localhost:3000/api/genres";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getAllMovies(parameters?: any): Observable<MovieList> {
    let queryParams = {};
    if (parameters) {
      queryParams = {
        params: new HttpParams()
        .set("page", parameters.page && parameters.page.toString() || "")
        .set("pageSize", parameters.pageSize && parameters.pageSize.toString() || "")
        .set("sort", parameters.sort && parameters.sort.toString() || "")
        .set("sortDirection", parameters.sortDirection && parameters.sortDirection.toString() || "")
      }
    }

    return this.http.get(URL, queryParams).pipe(map(data => {
      return new MovieList(data);
    }));
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Array<Genre>>(URL_GENRES).pipe(map(data => {
      let genreList = new Array<Genre>();
      data.forEach(elem => genreList.push(new Genre(elem)));
      return genreList;
    }));
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get(URL + "/" + id).pipe(map(data => {
      return new Movie(data);
    }));
  }

  editMovie(editedMovie: Movie): Observable<Movie> {
    return this.http.put(URL + "/" + editedMovie._id, editedMovie).pipe(map(data => {
      return new Movie(data);
    }));
  }

  submitMovie(submittedMovie: Movie): Observable<Movie> {
    return this.http.post(URL, submittedMovie).pipe(map(data => {
      return new Movie(data);
    }));
  }

  submitGenre(submittedGenre: Genre): Observable<Genre> {
    return this.http.post(URL_GENRES, submittedGenre).pipe(map(data => {
      return new Genre(data);
    }));
  }
}
