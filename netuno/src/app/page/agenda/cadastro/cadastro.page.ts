import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Automovel } from '../../models/automovel.Interface';
import { AutomovelService } from 'src/app/services/automovel.service';
import { Agenda } from '../../models/agenda.interface';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  agenda: Agenda;

  constructor(
    private agendaService : AgendaService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController
  ) { 
    this.agenda = {
      funcionarios: [],
      clientes: [],
      automoveis: [],
      data: new Date(),
    };
  }
  

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];       
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando'});
      loading.present();
      this.agendaService.getAgenda(id).subscribe((agenda) => {
        this.agenda = agenda;
        loading.dismiss();
      });
    } 
  }


  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando'});
    loading.present();

    this.agendaService
      .salvar(this.agenda)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/agenda']);
      });
  }

}
