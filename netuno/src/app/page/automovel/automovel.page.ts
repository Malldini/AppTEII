import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ActionSheetController, LoadingController } from '@ionic/angular';
import { AutomovelService } from 'src/app/services/automovel.service';
import { Automovel } from '../models/automovel.Interface';

@Component({
  selector: 'app-automovel',
  templateUrl: './automovel.page.html',
  styleUrls: ['./automovel.page.scss'],
})
export class AutomovelPage {

  automoveis: Automovel[];

  constructor(private alertCtlr: AlertController,
    private automovelService: AutomovelService,
    private loadingController: LoadingController) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const loading = await this.loadingController.create({
      message: 'Carregando'
    });
    loading.present();
    // this.autores = this.autorService.getAutores();
    this.automovelService.getAutomoveis().subscribe((data) => {
      this.automoveis = data;
      loading.dismiss();
    });
  }

  async confirmarExclusao(automovel: Automovel) {
    let alerta = await this.alertCtlr.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o automovel ${automovel.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(automovel);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(automovel: Automovel) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();
    
    this.automovelService.excluir(automovel).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  }
}