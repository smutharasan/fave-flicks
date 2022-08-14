import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'discover',
    loadChildren: () =>
      import('./pages/discover/discover.module').then(
        (m) => m.DiscoverPageModule
      ),
    pathMatch: 'full',
  },
  {
    path: 'watchlist',
    loadChildren: () =>
      import('./pages/watchlist/watchlist.module').then(
        (m) => m.WatchlistPageModule
      ),
    pathMatch: 'full',
  },
  {
    path: 'favourites',
    loadChildren: () =>
      import('./pages/favourites/favourites.module').then(
        (m) => m.FavouritesPageModule
      ),
    pathMatch: 'full',
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module').then((m) => m.SearchPageModule),
    pathMatch: 'full',
  },
  {
    path: 'find-people',
    loadChildren: () =>
      import('./pages/find-people/find-people.module').then(
        (m) => m.FindPeoplePageModule
      ),
    pathMatch: 'full',
  },
  {
    path: 'movie-details/:id',
    loadChildren: () =>
      import('./pages/movie-details/movie-details.module').then(
        (m) => m.MovieDetailsPageModule
      ),
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
