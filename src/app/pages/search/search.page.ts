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
              backdropPath:
                `${givenElement.backdrop_path}` !== `null`
                  ? `${environment.postPathBaseUrl}/${givenElement.backdrop_path}`
                  : `https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2059&q=80`,
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
