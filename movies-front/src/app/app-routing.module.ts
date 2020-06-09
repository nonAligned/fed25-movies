import { MovieFormComponent } from './movies/movie-form/movie-form.component';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './core/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "add", component: MovieFormComponent},
  {path: "movies", component: MoviesComponent},
  {path: "movies/:id", component: MovieFormComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
