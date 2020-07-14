import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../models/cliente.Interface';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit{

  clientes: Cliente[];

  constructor(
    private alertCtlr: AlertController,
    private clienteService: ClienteService,
    private loadingController: LoadingController ) {
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
    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data;
      loading.dismiss();
    });
  }

  async confirmarExclusao(cliente: Cliente) {
    let alerta = await this.alertCtlr.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o cliente ${cliente.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(cliente);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(cliente: Cliente) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();
    
    this.clienteService.excluir(cliente).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  }
}
