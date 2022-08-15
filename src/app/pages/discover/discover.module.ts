import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverPageRoutingModule } from './discover-routing.module';

import { DiscoverPage } from './discover.page';

import { AddWatchlistBtnComponent } from '../../components/add-watchlist-btn/add-watchlist-btn.component';

import { AddFavouriteModalComponent } from 'src/app/components/add-favourite-modal/add-favourite-modal.component';
import { AddFavouriteModalModule } from 'src/app/components/add-favourite-modal/add-favourite-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscoverPageRoutingModule,
    AddFavouriteModalModule,
  ],
  declarations: [
    DiscoverPage,
    AddWatchlistBtnComponent,
    AddFavouriteModalComponent,
  ],
})
export class DiscoverPageModule {}
