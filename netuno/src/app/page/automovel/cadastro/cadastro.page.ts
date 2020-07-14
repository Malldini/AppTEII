import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Automovel } from '../../models/automovel.Interface';
import { AutomovelService } from 'src/app/services/automovel.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  automovel: Automovel;

  constructor(
    private automovelService : AutomovelService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController
  ) { 
    this.automovel = { nome: '',
      marca:'',
      porta: 0,
      placa: '' };
  }
  

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];       
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando'});
      loading.present();
      this.automovelService.getAutomovel(id).subscribe((automovel) => {
        this.automovel = automovel;
        loading.dismiss();
      });
    } 
  }


  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando'});
    loading.present();

    this.automovelService
      .salvar(this.automovel)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/automovel']);
      });
  }

}
