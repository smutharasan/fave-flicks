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
    redirectTo: '/tabs/discover',
    pathMatch: 'full',
  },
  {
    path: 'watchlist',
    redirectTo: '/tabs/watchlist',
    pathMatch: 'full',
  },
  {
    path: 'favourites',
    redirectTo: '/tabs/favourites',
    pathMatch: 'full',
  },
  {
    path: 'search',
    redirectTo: '/tabs/search',
    pathMatch: 'full',
  },
  {
    path: 'find-people',
    redirectTo: '/tabs/find-people',
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
