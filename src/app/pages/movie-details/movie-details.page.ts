import { Component, OnInit } from '@angular/core';
import { DetailedMovie } from './../../interfaces/detailed-movie';
import { DataService } from 'src/app/services/data.service';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { MovieCast } from './../../interfaces/movie-cast';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movieInfo: DetailedMovie;
  movieCast: MovieCast;

  constructor(
    private toastCtrl: ToastController,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieService.getMovie(params.id).subscribe((givenElement) => {
        this.movieInfo = {
          id: givenElement.id,
          status: givenElement.status,
          tagline: givenElement.tagline,
          homepage: givenElement.homepage,
          runtime: givenElement.runtime,
          revenue: givenElement.revenue,
          title: givenElement.title,
          budget: givenElement.budget,
          overview: givenElement.overview,
          releaseDate: givenElement.release_date,
          posterPath: `${environment.postPathBaseUrl}/${givenElement.poster_path}`,
          backdropPath: `${environment.postPathBaseUrl}/${givenElement.backdrop_path}`,
          productionCompanies: givenElement.production_companies,
          genres: givenElement.genres,
          voteAverage: givenElement.vote_average,
        };

        this.movieService
          .getMovieCredits(params.id)
          .subscribe((givenElement) => {
            const cast: Array<{
              name: string;
              character: string;
              knownFor: string;
              profilePath: string;
            }> = givenElement.cast
              .map((givenCast) => {
                return {
                  name: givenCast.name,
                  character: givenCast.character,
                  knownFor: givenCast.known_for_department,
                  profilePath:
                    `${givenCast.profile_path}` !== `null`
                      ? `${environment.postPathBaseUrl}/${givenCast.profile_path}`
                      : `https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80`,
                };
              })
              .splice(0, 10);


            const crew: Array<{
              name: string;
              job: string;
              knownFor: string;
              profilePath: string;
            }> = givenElement.crew
              .map((givenCast) => {
                return {
                  name: givenCast.name,
                  job: givenCast.job,
                  knownFor: givenCast.known_for_department,
                  profilePath:
                    `${givenCast.profile_path}` !== `null`
                      ? `${environment.postPathBaseUrl}/${givenCast.profile_path}`
                      : `https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80`,
                };
              })
              .splice(0, 10);

            this.movieCast = {
              id: givenElement.id,
              cast: cast,
              crew: crew,
            };
            console.log(
              this.movieCast.cast.map((givenElement) =>
                console.log(givenElement.profilePath)
              )
            );
          });
      });
    });
  }

  openWebsite() {
    window.open(this.movieInfo.homepage, '_blank');
  }
}
