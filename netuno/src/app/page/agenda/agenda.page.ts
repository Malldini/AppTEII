import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage {

  agendas: any[] = [];

  constructor(private alertCtlr: AlertController,
    private toastCtlr: ToastController,
    private actionSheetCtlr: ActionSheetController,
    private agendaService: AgendaService) {

    this.loadAgendas();
  }

  loadAgendas() {
    this.agendaService.list()
      .then(async (response: any[]) => {
        this.agendas = response;
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
      header: 'Agende a lavação ',
      inputs: [
        {
          name: 'nomeF',
          type: 'text',
          placeholder: 'Nome Funcionario'
        },
        {
          name: 'veiculo',
          type: 'text',
          placeholder: 'Veiculo',
        },
        {
          name: 'nomeC',
          type: 'text',
          placeholder: 'Cliente',
        },
        {
          name: 'pacote',
          type: 'text',
          placeholder: 'Pacote',
        },
        {
          name: 'data',
          type: 'date',
          min: '2020-19-05',
          max: '2020-20-12'
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
            console.log(form.nomeF);
            console.log(form.veiculo);
            console.log(form.nomeC);
            console.log(form.pacote);
            console.log(form.data);

            this.add(form.nomeF, form.veiculo, form.nomeC, form.pacote, form.data);
          }
        }
      ]
    });

    await alert.present();
  }

  async add(nomeF: string, veiculo: string, nomeC: string, pacote: string, data: Date) {
    if (nomeF.trim().length < 1 || veiculo.trim().length < 1 || nomeC.trim().length < 1 || pacote.trim().length < 1) {
      const toast = await this.toastCtlr.create({
        message: 'Revise os campos!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }
    let agenda = { nameF: nomeF, car: veiculo, nameC: nomeC, pack: pacote, dia: data, done: false };

    this.agendas.push(agenda);

    this.agendaService.add(agenda)
      .then(async (response) => {
        console.log(response);

        const toast = await this.toastCtlr.create({
          message: 'Operação realizada com sucesso!',
          duration: 2000,
          position: 'top'
        });
        toast.present();

        this.loadAgendas();

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

  async openActions(agenda: any) {
    const actionSheet = await this.actionSheetCtlr.create({
      header: 'Menu da Agenda',
      buttons: [{
        text: agenda.done ? 'Desmarcar' : 'Pagamento Confirmado',
        icon: agenda.done ? 'people-outline' : 'checkmark-circle',
        handler: () => {
          agenda.done = !agenda.done;

          this.agendaService.update(agenda)
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

  async delete(agenda: any) {

    this.agendaService.delete(agenda.id)
      .then(async (response) => {
        console.log(response);
        
        const toast = await this.toastCtlr.create({
          message: 'Operação realizada com sucesso!',
          duration: 2000,
          position: 'top'
        });
        toast.present();
        this.loadAgendas();

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
