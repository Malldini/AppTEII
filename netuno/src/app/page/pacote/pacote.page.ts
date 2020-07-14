import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ActionSheetController, LoadingController } from '@ionic/angular';
import { PacoteService } from 'src/app/services/pacote.service';
import { Pacote } from '../models/pacote.Interface';

@Component({
  selector: 'app-pacote',
  templateUrl: './pacote.page.html',
  styleUrls: ['./pacote.page.scss'],
})
export class PacotePage {

  pacotes: Pacote[];

  constructor(private alertCtlr: AlertController,
    private pacoteService: PacoteService,
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
    this.pacoteService.getPacotes().subscribe((data) => {
      this.pacotes = data;
      loading.dismiss();
    });
  }

  async confirmarExclusao(pacote: Pacote) {
    let alerta = await this.alertCtlr.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o pacote ${pacote.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(pacote);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(pacote: Pacote) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();
    
    this.pacoteService.excluir(pacote).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  }
}