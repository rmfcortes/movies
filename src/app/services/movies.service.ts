import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { Movie } from '../Model/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private ngZone: NgZone,
    private http: HttpClient,
  ) { }

  getMovies(): Promise<Movie[]> {
    return new Promise((resolve, reject) => {
      const endpoint = `https://api.tvmaze.com/search/shows?q=drama`
      const sub = this.http.get(`${endpoint}`, {})
      .subscribe((movies: Movie[]) => {
        sub.unsubscribe()
        this.ngZone.run(() => resolve(movies))
      }, err => {
        sub.unsubscribe()
        console.log(err)
      })
    })
  }


}
