import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/Model/movie.interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {

  @Input() movie: Movie

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.modalCtrl.dismiss()
  }

}
