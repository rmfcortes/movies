import { Component, OnInit } from '@angular/core';

import { MoviesService } from 'src/app/services/movies.service';
import { MoviePage } from 'src/app/modals/movie/movie.page';

import { Movie } from 'src/app/Model/movie.interface';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  movies: Movie[] = []

  constructor(
    private modalCtrl: ModalController,
    private movieService: MoviesService,
  ) { }

  ngOnInit() {
    this.getMovies()
  }

  async getMovies() {
    this.movies = await this.movieService.getMovies()
    console.log('~ this.movies', this.movies)
  }

  async presentMovie(movie: Movie) {
    const modal = await this.modalCtrl.create({
      component: MoviePage,
      componentProps: { movie }
    })

    return await modal.present()
  }

}
