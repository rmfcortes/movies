import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

import { MoviePageModule } from 'src/app/modals/movie/movie.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviePageModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
