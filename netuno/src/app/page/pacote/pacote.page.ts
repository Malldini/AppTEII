import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';
import { PacoteService } from 'src/app/services/pacote.service';

@Component({
  selector: 'app-pacote',
  templateUrl: './pacote.page.html',
  styleUrls: ['./pacote.page.scss'],
})
export class PacotePage{

  pacotes: any[] = [];

  constructor(private alertCtlr: AlertController,
     private toastCtlr: ToastController,
      private actionSheetCtlr: ActionSheetController,
      private pacoteService: PacoteService) {

    this.loadPacotes();
  }

  loadPacotes() {
    this.pacoteService.list()
      .then(async (response: any[]) => {
        this.pacotes = response;
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
      header: 'Cadastre o Pacote',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome'
        },
        {
          name: 'preco',
          type: 'number',
          placeholder: 'Preco',
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
        }, {
          text: 'Cadastrar',
          handler: (form) => {
            console.log(form.nome);
            console.log(form.preco);

            this.add(form.nome, form.preco);
          }
        }
      ]
    });

  await alert.present();
}

async add(nome: string, preco: number) {
  if (nome.trim().length < 1 || preco < 0.1) {
    const toast = await this.toastCtlr.create({
      message: 'Revise os campos!',
      duration: 2000,
      position: 'top'
    });
    toast.present();
    return;
  }

  let pacote = { name: nome, price: preco, done: false };

  this.pacotes.push(pacote);

  this.pacoteService.add(pacote)
  .then(async (response) => {
    console.log(response);

    const toast = await this.toastCtlr.create({
      message: 'Operação realizada com sucesso!',
      duration: 2000,
      position: 'top'
    });
    toast.present();

    this.loadPacotes();

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

updateLocalStorage() {
  localStorage.setItem('pacoteDb', JSON.stringify(this.pacotes));
}

async delete(pacote: any) {

  this.pacoteService.delete(pacote.id)
    .then(async (response) => {
      console.log(response);
      
      const toast = await this.toastCtlr.create({
        message: 'Operação realizada com sucesso!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      this.loadPacotes();

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
