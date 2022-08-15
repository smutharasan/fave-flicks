import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ModalComponent],
})
export class ModalComponentModule {}
