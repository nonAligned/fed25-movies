import { MoviesService } from './../services/movies.service';
import { MovieList } from './../model/movie-list.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mvs-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: MovieList;
  parameters = {
    page: 1,
    pageSize: 6,
    sort: "",
    sortDirection: "desc"
  }

  constructor(private service: MoviesService) { }

  ngOnInit(): void {
    this.updateMovies();
  }

  updateMovies() {
    this.service.getAllMovies(this.parameters).subscribe(data => {
      this.movies = data;
    });
  }

  updateParams(newParams: any) {
    if (newParams.page) {
      this.parameters.page = newParams.page;
    } else if (newParams.sort) {
      this.parameters.sort = newParams.sort;
    } else if (newParams.sortDirection) {
      this.parameters.sortDirection = newParams.sortDirection;
    }
    this.updateMovies();
  }

}
