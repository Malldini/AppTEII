import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pacote',
    loadChildren: () => import('./page/pacote/pacote.module').then( m => m.PacotePageModule)
  },
  {
    path: 'automovel',
    loadChildren: () => import('./page/automovel/automovel.module').then( m => m.AutomovelPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./page/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./page/agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'funcionario',
    loadChildren: () => import('./page/funcionario/funcionario.module').then( m => m.FuncionarioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
