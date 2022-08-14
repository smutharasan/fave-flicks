import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'search',
        loadChildren: () =>
          import('../pages/search/search.module').then(
            (m) => m.SearchPageModule
          ),
      },
      {
        path: 'discover',
        loadChildren: () =>
          import('../pages/discover/discover.module').then(
            (m) => m.DiscoverPageModule
          ),
      },
      {
        path: 'movie-details',
        loadChildren: () =>
          import('../pages/movie-details/movie-details.module').then(
            (m) => m.MovieDetailsPageModule
          ),
      },
      {
        path: 'favourites',
        loadChildren: () =>
          import('../pages/favourites/favourites.module').then(
            (m) => m.FavouritesPageModule
          ),
      },
      {
        path: 'watchlist',
        loadChildren: () =>
          import('../pages/watchlist/watchlist.module').then(
            (m) => m.WatchlistPageModule
          ),
      },
      {
        path: 'find-people',
        loadChildren: () =>
          import('../pages/find-people/find-people.module').then(
            (m) => m.FindPeoplePageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/discover',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/discover',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
