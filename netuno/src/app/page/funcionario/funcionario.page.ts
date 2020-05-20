import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.page.html',
  styleUrls: ['./funcionario.page.scss'],
})
export class FuncionarioPage {

  funcionarios: any[] = [];

  constructor(private alertCtlr: AlertController,
    private toastCtlr: ToastController,
    private funcionarioService: FuncionarioService) {

      this.loadFuncionarios();
     }

     loadFuncionarios() {
      this.funcionarioService.list()
        .then(async (response: any[]) => {
          this.funcionarios = response;
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
        header: 'Cadastre o Funcionario',
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
          message: 'Revise os campos!',
          duration: 2000,
          position: 'top'
        });
        toast.present();
        return;
      }
      let funcionario = { name: nome, phone: tel, doc: cpf, done: false };
  
      this.funcionarios.push(funcionario);
  
      this.funcionarioService.add(funcionario)
        .then(async (response) => {
          console.log(response);
  
          const toast = await this.toastCtlr.create({
            message: 'Operação realizada com sucesso!',
            duration: 2000,
            position: 'top'
          });
          toast.present();
  
          this.loadFuncionarios();
  
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
  
    async delete(funcionario: any) {
  
      this.funcionarioService.delete(funcionario.id)
        .then(async (response) => {
          console.log(response);
  
          const toast = await this.toastCtlr.create({
            message: 'Operação realizada com sucesso!',
            duration: 2000,
            position: 'top'
          });
          toast.present();
          this.loadFuncionarios();
  
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
