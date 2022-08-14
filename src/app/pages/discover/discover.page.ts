import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MovieService } from 'src/app/services/movie.service';
import { BriefMovie } from 'src/app/interfaces/brief-movie';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  discoverMovies: BriefMovie[];

  constructor(
    private movieService: MovieService,
    private dataService: DataService
  ) {}

  ngOnInit() {}
}
