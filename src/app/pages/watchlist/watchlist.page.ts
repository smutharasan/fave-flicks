import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { ToastController } from '@ionic/angular';
import { BriefMovie } from 'src/app/interfaces/brief-movie';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
})
export class WatchlistPage implements OnInit {
  listOfWatchListMovies: BriefMovie[]; // holds list of recipe to be displayed

  constructor(
    private dataService: DataService,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    const res = await this.dataService.getWatchListItems();

    // set favourite lists
    this.listOfWatchListMovies = [];
    this.listOfWatchListMovies = res;
  }

  async ionViewWillEnter() {
    // gett all fav listOfWatchListMovies & set lists
    const res = await this.dataService.getWatchListItems();
    this.listOfWatchListMovies = [];
    this.listOfWatchListMovies = res;
    console.log(this.listOfWatchListMovies);
  }

  // Handler for when a favourite recipe is deleted
  async onDeleteWatchListItem(movie) {
    // create and display confirmation alert
    const alert = document.createElement('ion-alert');
    alert.header = 'Remove from watch list';
    alert.message = 'Would you like to remove movie from watch list?';

    alert.buttons = [
      {
        text: 'No',
        role: 'cancel',
      },
      {
        text: 'Yes',
        role: 'confirm',
      },
    ];

    document.body.appendChild(alert);
    await alert.present();

    const { role } = await alert.onDidDismiss();

    // if user confirms...
    if (role === 'confirm') {
      // get the true index of favourite and remove from db
      const trueIndex = this.listOfWatchListMovies.findIndex(
        (item) => item.id === movie.id
      );
      let res = await this.dataService.removeWatchListItem(trueIndex);

      // set lists after delete
      this.listOfWatchListMovies = [];
      res = await this.dataService.getWatchListItems();
      console.log('res', res);
      this.listOfWatchListMovies = res;

      // display confirmation toast message
      const toast = await this.toastCtrl.create({
        message: ' removed from watch list',
        duration: 2000,
      });

      toast.present();
    }
  }
}
