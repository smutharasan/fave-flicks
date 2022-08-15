import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  public thoughts = "";
  public rating = "";
  constructor(private modalCtrl: ModalController) {}
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {

    return this.modalCtrl.dismiss(
      { thoughts: this.thoughts, rating: this.rating },
      'confirm'
    );
  }
}
