import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../components/modal/modal.component';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-add-favourite-modal',
  templateUrl: './add-favourite-modal.component.html',
  styleUrls: ['./add-favourite-modal.component.scss'],
})
export class AddFavouriteModalComponent {
  @Input() movie: any;
  @ViewChild(IonModal) modal: IonModal;
  itemExists = false;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private dataService: DataService
  ) {}

  // cancel() {
  //   this.modal.dismiss(null, 'cancel');
  // }

  // confirm() {
  //   this.modal.dismiss(this.name, 'confirm');
  // }

  // onWillDismiss(event: Event) {
  //   const ev = event as CustomEvent<OverlayEventDetail<string>>;
  //   if (ev.detail.role === 'confirm') {
  //     this.message = `Hello, ${ev.detail.data}!`;
  //   }
  // }
  async onAddToFavourite() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
    });
    modal.initialBreakpoint = 0.75;
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(this.movie, data);
      const res = await this.dataService.getFavorites();
      let index = -1;

      if (res && res.length > 0) {
        res.some((f) => {
          if (f.movie.id === this.movie.id) {
            this.itemExists = true;
            index = res.indexOf(f);
          }
        });
      }

      const alert = document.createElement('ion-alert');
      if (!this.itemExists) {
        alert.header = 'Add to favourites list';
        alert.message =
          'Would you like to add this movie to the favourites list?';
      } else {
        alert.header = 'Error: Item already exists';
        alert.message =
          'Would you like to remove this movie to the favourites list?';
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
          await this.dataService.addFavorite({
            movie: this.movie,
            thoughts: data.thoughts,
            rating: data.rating,
          });

          toast = await this.toastCtrl.create({
            message: 'movie added to favourites list.',
            duration: 2000,
          });
        } else {
          await this.dataService.removeFavorite(index);

          toast = await this.toastCtrl.create({
            message: 'Movie removed from favourites list.',
            duration: 2000,
          });
        }
        toast.present();
        this.itemExists = false;
      }
    }
  }
}
