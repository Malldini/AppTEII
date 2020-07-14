import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ActionSheetController, LoadingController } from '@ionic/angular';
import { AgendaService } from 'src/app/services/agenda.service';
import { Agenda } from '../models/agenda.interface';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  agendas: Agenda[];

  constructor(private alertCtlr: AlertController,
    private agendaService: AgendaService,
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
    this.agendaService.getAgendas().subscribe((data) => {
      this.agendas = data;
      loading.dismiss();
    });
  }

  async confirmarExclusao(agenda: Agenda) {
    let alerta = await this.alertCtlr.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir a agenda ${agenda.clientes}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(agenda);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(agenda: Agenda) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();
    
    this.agendaService.excluir(agenda).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  }
}
