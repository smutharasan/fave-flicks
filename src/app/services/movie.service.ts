import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getListOfMovies(givenSearchKeyword: string): Observable<any> {
    // https://api.themoviedb.org/3/search/movie?api_key=6e61a8c281fb53c27bd559e71e4f2199&language=en-US&query=bird&page=1&include_adult=false
    return this.http.get(
      `${environment.baseUrl}/search/movie?api_key=${environment.apiKey}&language=en-US&query=${givenSearchKeyword}&page=1&include_adult=false`
    );
  }

  getFeaturedMovies(): Observable<any> {
    /*  https://api.themoviedb.org/3/discover/movie?api_key=6e61a8c281fb53c27bd559e71e4f2199&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2022&year=2022&with_watch_monetization_types=flatrate*/
    return this.http.get(
      `${environment.baseUrl}/discover/movie?api_key=${environment.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2022&year=2022&with_watch_monetization_types=flatrate`
    );
  }

  getMovie(id: string): Observable<any> {

    //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
    return this.http.get(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}&language=en-US`
    );
  }
  getMovieCredits(id: string): Observable<any> {
    //https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
    //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
    return this.http.get(
      `${environment.baseUrl}/movie/${id}/credits?api_key=${environment.apiKey}&language=en-US`
    );
  }
}
