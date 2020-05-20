import { Component } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';
import { ClienteService } from '../services/cliente.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  clientes: any[] = [];

  constructor(private alertCtlr: AlertController,
    private toastCtlr: ToastController,
    private actionSheetCtlr: ActionSheetController,
    private clienteService: ClienteService) {

    //let clienteJson = localStorage.getItem('clienteDb');
    //
    //  if (clienteJson != null) {
    //   this.clientes = JSON.parse(clienteJson);
    // }
    this.loadClientes();
  }

  loadClientes() {
    this.clienteService.list()
      .then(async (response: any[]) => {
        this.clientes = response;
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
        }, {
          text: 'Cadastrar',
          handler: (form) => {
            console.log(form.nome);
            console.log(form.tel);
            console.log(form.cpf);

            this.add(form.nome, form.tel, form.cpf);
          }
        }
      ]
    });

    await alert.present();
  }

  async add(nome: string, tel: string, cpf: string) {
    if (nome.trim().length < 1 || tel.trim().length < 11 || cpf.trim().length < 11) {
      const toast = await this.toastCtlr.create({
        message: 'Preencha os campos vazios!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    let cliente = { name: nome, phone: tel, doc: cpf, done: false };

    this.clientes.push(cliente);

    this.clienteService.add(cliente)
      .then(async (response) => {
        console.log(response);

        const toast = await this.toastCtlr.create({
          message: 'Operação realizada com sucesso!',
          duration: 2000,
          position: 'top'
        });
        toast.present();

        this.loadClientes();

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
    localStorage.setItem('clienteDb', JSON.stringify(this.clientes));
  }

  async openActions(cliente: any) {
    const actionSheet = await this.actionSheetCtlr.create({
      header: 'Menu do Cliente',
      buttons: [{
        text: cliente.done ? 'Desmarcar' : 'Pagamento Confirmado',
        icon: cliente.done ? 'people-outline' : 'checkmark-circle',
        handler: () => {
          cliente.done = !cliente.done;

          this.clienteService.update(cliente)
            .then(async (response) => {
              console.log(response);

              const toast = await this.toastCtlr.create({
                message: 'Operação realizada com sucesso!',
                duration: 2000,
                position: 'top'
              });
              toast.present();

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
      }]
    });
    await actionSheet.present();
  }

  async delete(cliente: any) {
    // this.clientes = this.clientes.filter(clienteArray => cliente != clienteArray);

    //  this.updateLocalStorage();

    

    this.clienteService.delete(cliente.id)
      .then(async (response) => {
        console.log(response);
        
        const toast = await this.toastCtlr.create({
          message: 'Operação realizada com sucesso!',
          duration: 2000,
          position: 'top'
        });
        toast.present();
        this.loadClientes();

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
