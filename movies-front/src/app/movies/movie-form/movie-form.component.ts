import { Movie } from './../../model/movie.model';
import { Genre } from './../../model/genre.model';
import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mvs-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  movieForm: FormGroup;
  genres: Genre[];
  movie: Movie;
  addGenreVisible: boolean = false;
  newGenreName: string;

  constructor(private fb: FormBuilder, private service: MoviesService, private route: ActivatedRoute, private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.get('id')) {
        let id = Number(params.get('id'));
        this.service.getMovieById(id).subscribe(data => {
          this.movie = data;
          this.movieForm.patchValue(this.movie);
        });
      } else {
        this.movie = new Movie();
      }
    });
    this.updateGenres();
  }

  updateGenres() {
    this.service.getGenres().subscribe(data => {
      this.genres = data;
    });
  }

  createForm() {
    this.movieForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(250)]],
      year: [null, [Validators.required, Validators.min(1000), Validators.max(9999)]],
      rating: null,
      duration: null,
      director: '',
      genre: ''
    });
  }

  onSubmit() {
    if (this.movie._id) {
      let editedMovie = new Movie(this.movieForm.value);
      editedMovie._id = this.movie._id;
      this.service.editMovie(editedMovie).subscribe(data => {
        this.router.navigate(['movies']);
      });
    } else {
      let submittedMovie = new Movie(this.movieForm.value);
      this.service.submitMovie(submittedMovie).subscribe(data => {
        this.movieForm.reset();
      });
    }
  }

  toggleNewGenre() {
    this.addGenreVisible = !this.addGenreVisible;
  }

  submitGenre() {
    let newGenre = new Genre();
    newGenre.name = this.newGenreName;
    this.service.submitGenre(newGenre).subscribe(data => {
      this.genres.push(data);
      this.movieForm.controls.genre.setValue(data.name); 
      this.newGenreName = "";
      this.addGenreVisible = false;
    });
  }

}
