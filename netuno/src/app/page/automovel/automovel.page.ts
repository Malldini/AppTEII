import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';
import { AutomovelService } from 'src/app/services/automovel.service';

@Component({
  selector: 'app-automovel',
  templateUrl: './automovel.page.html',
  styleUrls: ['./automovel.page.scss'],
})
export class AutomovelPage {

  automoveis: any[] = [];

  constructor(private alertCtlr: AlertController, 
    private toastCtlr: ToastController,
      private automovelService: AutomovelService) {

    //let automovelJson = localStorage.getItem('automovelDb');

  //  if (automovelJson != null) {
    //  this.automoveis = JSON.parse(automovelJson);
   // }
   this.loadAutomoveis();
  }

 loadAutomoveis() {
  this.automovelService.list()
    .then(async (response: any[]) => {
      this.automoveis = response;
    })
    .catch(async (response) => {
      console.log(response);

      const toast = await this.toastCtlr.create({
        message: 'Operação fracassou!',
        duration: 2000,
        position: 'top'
      });
      toast.present();

    });
}

  async showAdd() {
    const alert = await this.alertCtlr.create({
      header: 'Cadastre um Automóvel',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome'
        },
        {
          name: 'marca',
          type: 'text',
          placeholder: 'Marca'
        },
        {
          name: 'portas',
          type: 'number',
          placeholder: 'Portas'
        },
        {
          name: 'placa',
          type: 'text',
          placeholder: 'Placa'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Cadastrar',
          handler: (form) => {
            console.log(form.nome);
            console.log(form.marca);
            console.log(form.portas);
            console.log(form.placa);

            this.add(form.nome, form.marca, form.portas, form.placa);
          }
        }
      ]
    });

    await alert.present();
  }

  async add(nome: string, marca: string, portas: number, placa: string) {
    if (nome.trim().length < 1 || marca.trim().length < 1 || portas < 0 || placa.trim().length < 1) {
      const toast = await this.toastCtlr.create({
        message: 'Revise os campos!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    let automovel = { name: nome, marc: marca, door: portas, plac: placa, done: false };

    this.automoveis.push(automovel);

    this.automovelService.add(automovel)
      .then(async (response) => {
        console.log(response);

        const toast = await this.toastCtlr.create({
          message: 'Operação realizada com sucesso!',
          duration: 2000,
          position: 'top'
        });
        toast.present();

        this.loadAutomoveis();

      })
      .catch(async (response) => {
        console.log(response);

        const toast = await this.toastCtlr.create({
          message: 'Operação fracassou!',
          duration: 2000,
          position: 'top'
        });
        toast.present();

      });

    //this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('automovelDb', JSON.stringify(this.automoveis));
  }

  
  async delete(automovel: any) {
    // this.clientes = this.clientes.filter(clienteArray => cliente != clienteArray);

    //  this.updateLocalStorage();

    

    this.automovelService.delete(automovel.id)
      .then(async (response) => {
        console.log(response);
        
        const toast = await this.toastCtlr.create({
          message: 'Operação realizada com sucesso!',
          duration: 2000,
          position: 'top'
        });
        toast.present();
        this.loadAutomoveis();

      })
      .catch(async (response) => {
        console.log(response);

        const toast = await this.toastCtlr.create({
          message: 'Operação fracassou!',
          duration: 2000,
          position: 'top'
        });
        toast.present();

      });
  }
}