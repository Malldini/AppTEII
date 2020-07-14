import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ActionSheetController, LoadingController } from '@ionic/angular';
import { ClienteService } from '../services/cliente.service';
import { async } from '@angular/core/testing';
import { Cliente } from '../page/models/cliente.Interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  clientes: any[];

  constructor(private alertCtlr: AlertController,
    private toastCtlr: ToastController,
    private actionSheetCtlr: ActionSheetController,
    private clienteService: ClienteService,
    private loadingController: LoadingController) {

    //let clienteJson = localStorage.getItem('clienteDb');
    //
    //  if (clienteJson != null) {
    //   this.clientes = JSON.parse(clienteJson);
    // }

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async showAdd() {
    const alert = await this.alertCtlr.create({
      header: 'Cadastre o Cliente',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome'
        },
        {
          name: 'tel',
          type: 'text',
          placeholder: 'Telefone',
        },
        {
          name: 'cpf',
          type: 'text',
          placeholder: 'CPF',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alert.present();
  }

  async listar() {
    const loading = await this.loadingController.create({
      message: 'Carregando'
    });
    loading.present();
    // this.autores = this.autorService.getAutores();
    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data;
      loading.dismiss();
    });
  }

  async confirmarExclusao(cliente: Cliente) {
    let alerta = await this.alertCtlr.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o autor ${cliente.nome}?`,
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
