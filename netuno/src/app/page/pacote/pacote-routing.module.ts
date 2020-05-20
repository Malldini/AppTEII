import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacotePage } from './pacote.page';

const routes: Routes = [
  {
    path: '',
    component: PacotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacotePageRoutingModule {}
