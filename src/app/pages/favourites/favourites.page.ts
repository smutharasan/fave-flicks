import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  listOfFaves: any[]; // holds list of recipe to be displayed

  constructor(
    private dataService: DataService,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    const res = await this.dataService.getFavorites();

    // set favourite lists
    this.listOfFaves = [];
    this.listOfFaves = res;
  }

  async ionViewWillEnter() {
    // gett all fav listOfFaves & set lists
    const res = await this.dataService.getFavorites();
    this.listOfFaves = [];
    this.listOfFaves = res;
    console.log(this.listOfFaves);
  }

  async onDeleteFavourite(movie) {
    // create and display confirmation alert
    const alert = document.createElement('ion-alert');
    alert.header = 'Remove from Favourites';
    alert.message = 'Would you like to remove movie from favourites list?';

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
      const trueIndex = this.listOfFaves.findIndex(
        (item) => item.movie.id === movie.id
      );
      let res = await this.dataService.removeFavorite(trueIndex);

      // set lists after delete
      this.listOfFaves = [];
      res = await this.dataService.getFavorites();
      console.log('res', res);
      this.listOfFaves = res;

      // display confirmation toast message
      const toast = await this.toastCtrl.create({
        message: ' removed from favourites list',
        duration: 2000,
      });

      toast.present();
    }
  }
}
