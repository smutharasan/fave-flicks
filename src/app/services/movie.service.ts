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
    /*  https://api.themoviedb.org/3/discover/movie?api_key=6e61a8c281fb53c27bd559e71e4f2199&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2022&year=2022&with_watch_monetization_types=flatrate*/
    return this.http.get(
      `${environment.baseUrl}/complexSearch?query=${givenSearchKeyword}&number=25&apiKey=${environment.apiKey}`
    );
  }

  getFeaturedMovies(): Observable<any> {
    /*  https://api.themoviedb.org/3/discover/movie?api_key=6e61a8c281fb53c27bd559e71e4f2199&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2022&year=2022&with_watch_monetization_types=flatrate*/
    return this.http.get(
      `${environment.baseUrl}/discover/movie?api_key=${environment.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2022&year=2022&with_watch_monetization_types=flatrate`
    );
  }

  getMovie(id: string): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/${id}/information?apiKey=${environment.apiKey}&includeNutrition=true`
    );
  }
}
