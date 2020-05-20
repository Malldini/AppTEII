import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutomovelPage } from './automovel.page';

const routes: Routes = [
  {
    path: '',
    component: AutomovelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomovelPageRoutingModule {}
