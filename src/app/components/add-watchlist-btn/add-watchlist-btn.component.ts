import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-watchlist-btn',
  templateUrl: './add-watchlist-btn.component.html',
  styleUrls: ['./add-watchlist-btn.component.scss'],
})
export class AddWatchlistBtnComponent implements OnInit {
  @Input() movie: any;
  itemExists = false;
  constructor(
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {}

  async onAddToWatchList() {
    const res = await this.dataService.getWatchListItems();
    let index = -1;

    if (res && res.length > 0) {
      res.some((wl) => {
        if (wl.id === this.movie.id) {
          this.itemExists = true;
          index = res.indexOf(wl);
        }
      });
    }

    const alert = document.createElement('ion-alert');
    if (!this.itemExists) {
      alert.header = 'Add to Watch list';
      alert.message = 'Would you like to add this movie to the watch list?';
    } else {
      alert.header = 'Error: Item already exists';
      alert.message = 'Would you like to remove this movie to the watch list?';
    }

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

    if (role === 'confirm') {
      let toast;
      if (!this.itemExists) {
        await this.dataService.addWatchListItem(this.movie);

        toast = await this.toastCtrl.create({
          message: 'movie added to watch list.',
          duration: 2000,
        });
      } else {
        await this.dataService.removeWatchListItem(index);

        toast = await this.toastCtrl.create({
          message: 'Movie removed from watch list.',
          duration: 2000,
        });
      }
      toast.present();
      this.itemExists = false;
    }
  }
}
