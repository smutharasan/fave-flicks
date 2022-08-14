import { Component, OnInit } from '@angular/core';
import { DetailedMovie } from './../../interfaces/detailed-movie';
import { DataService } from 'src/app/services/data.service';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movieInfo: DetailedMovie;

  constructor(
    private toastCtrl: ToastController,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {}
}
