import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Pacote } from '../../models/pacote.Interface';
import { PacoteService } from 'src/app/services/pacote.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  pacote: Pacote;

  constructor(
    private pacoteService : PacoteService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController
  ) { 
    this.pacote = { nome: '',
      preco: 0.00
    };
  }
  

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];       
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando'});
      loading.present();
      this.pacoteService.getPacote(id).subscribe((pacote) => {
        this.pacote = pacote;
        loading.dismiss();
      });
    } 
  }


  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando'});
    loading.present();

    this.pacoteService
      .salvar(this.pacote)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/pacote']);
      });
  }

}
