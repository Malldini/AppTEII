import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Funcionario } from '../models/funcionario.Interface';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.page.html',
  styleUrls: ['./funcionario.page.scss'],
})
export class FuncionarioPage {

  funcionarios: any[];

  constructor(private alertCtlr: AlertController,
    private toastCtlr: ToastController,
    private funcionarioService: FuncionarioService,
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
      this.funcionarioService.getFuncionarios().subscribe((data) => {
        this.funcionarios = data;
        loading.dismiss();
      });
    }
  
    async confirmarExclusao(funcionario: Funcionario) {
      let alerta = await this.alertCtlr.create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o funcionario ${funcionario.nome}?`,
        buttons: [{
          text: 'SIM',
          handler: () => {
            this.excluir(funcionario);
          }
        }, {
          text: 'NÃO'
        }]
      });
      alerta.present();
    }
  
    private async excluir(funcionario: Funcionario) {
      const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
      busyLoader.present();
      
      this.funcionarioService.excluir(funcionario).subscribe(() => {
        this.listar()
        busyLoader.dismiss();
      });
    }

}
