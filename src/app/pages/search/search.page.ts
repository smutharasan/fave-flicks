import { Component, OnInit } from '@angular/core';
import { BriefMovie } from 'src/app/interfaces/brief-movie';
import { MovieService } from 'src/app/services/movie.service';
import { Keyboard } from '@capacitor/keyboard';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  listOfMovies: Array<BriefMovie> = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {}

  loadData(givenEvent) {
    const search = givenEvent.target.value;
    if (search && search.trim() !== '') {
      this.movieService.getListOfMovies(search).subscribe(
        (res) => {
          this.listOfMovies = [];
          res.results.map((givenElement) =>
            this.listOfMovies.push({
              id: givenElement.id,
              title: givenElement.title,
              overview: givenElement.overview,
              releaseDate: givenElement.release_date,
              backdropPath: `${environment.postPathBaseUrl}/${givenElement.backdrop_path}`,
              genres: [],
              voterAverage: givenElement.vote_average,
            })
          );
        },
        (err) => {
          console.error(err);
        }
      );

      Keyboard.hide();
    }
  }
}
