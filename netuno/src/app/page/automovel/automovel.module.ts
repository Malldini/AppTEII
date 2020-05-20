import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutomovelPageRoutingModule } from './automovel-routing.module';

import { AutomovelPage } from './automovel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutomovelPageRoutingModule
  ],
  declarations: [AutomovelPage]
})
export class AutomovelPageModule {}
