import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BriefMovie } from 'src/app/interfaces/brief-movie';

const FAVORITE = 'myFavorites';
const WATCHLIST = 'myWatchList';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private storage: Storage) {
    this.init();
  }
  init() {
    this.storage.create();
  }

  getFavorites() {
    return this.storage.get(FAVORITE) || [];
  }

  getWatchListItems() {
    return this.storage.get(WATCHLIST) || [];
  }

  async addWatchListItem(item) {
    const localStorage = (await this.storage.get(WATCHLIST)) || [];
    localStorage.push(item);
    return this.storage.set(WATCHLIST, localStorage);
  }

  async addFavorite(item) {
    console.log('item', item);
    const localStorage = (await this.storage.get(FAVORITE)) || [];
    localStorage.push(item);
    return this.storage.set(FAVORITE, localStorage);
  }

  async removeFavorite(index) {
    const localStorage = (await this.storage.get(FAVORITE)) || [];
    localStorage.splice(index, 1);
    return this.storage.set(FAVORITE, localStorage);
  }

  async removeWatchListItem(index) {
    const localStorage = (await this.storage.get(WATCHLIST)) || [];
    localStorage.splice(index, 1);
    return this.storage.set(WATCHLIST, localStorage);
  }
}
