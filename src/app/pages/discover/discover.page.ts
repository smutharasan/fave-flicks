import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MovieService } from 'src/app/services/movie.service';
import { BriefMovie } from 'src/app/interfaces/brief-movie';
import { identity } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  listOfDiscoverMovies: BriefMovie[];

  constructor(
    private movieService: MovieService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    /**
     *  adult: false
        backdrop_path: "/7ZO9yoEU2fAHKhmJWfAc2QIPWJg.jpg"
        genre_ids: (3) [28, 53, 878]
        id: 766507
        original_language: "en"
        original_title: "Prey"
        overview: "When danger threatens her camp, the fierce and highly skilled Comanche warrior Naru sets out to protect her people. But the prey she stalks turns out to be a highly evolved alien predator with a technically advanced arsenal."
        popularity: 12286.389
        poster_path: "/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg"
        release_date: "2022-08-02"
        title: "Prey"
        video: false
        vote_average: 8.2
        vote_count: 2137

        export interface BriefMovie {
        id: number;
        title: string;
        backdropPath: string;
        voterAverage: number;
        overview: string;
        releaseDate: string;
        genres: Array<string>;
        }

     */
    this.movieService.getFeaturedMovies().subscribe((data) => {
      this.listOfDiscoverMovies = data.results.map((givenElement) => ({
        id: givenElement.id,
        title: givenElement.title,
        overview: givenElement.overview,
        releaseDate: givenElement.release_date,
        backdropPath: `${environment.postPathBaseUrl}/${givenElement.backdrop_path}`,
        genres: [],
        voterAverage: givenElement.vote_average,
      }));
      console.log(this.listOfDiscoverMovies);
    });
  }
}
