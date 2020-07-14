import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../../models/cliente.Interface';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Funcionario } from '../../models/funcionario.Interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  funcionario: Funcionario;

  constructor(
    private funcionarioService : FuncionarioService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController
  ) { 
    this.funcionario = { nome: '', tel:'', cpf: '' };
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];       
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando'});
      loading.present();
      this.funcionarioService.getFuncionario(id).subscribe((funcionario) => {
        this.funcionario = funcionario;
        loading.dismiss();
      });
    } 
  }


  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando'});
    loading.present();

    this.funcionarioService
      .salvar(this.funcionario)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/funcionario']);
      });
  }

}
