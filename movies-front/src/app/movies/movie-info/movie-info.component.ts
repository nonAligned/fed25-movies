import { Movie } from './../../model/movie.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mvs-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
  @Input() movie: Movie;

  constructor() { }

  ngOnInit(): void {
  }

}
