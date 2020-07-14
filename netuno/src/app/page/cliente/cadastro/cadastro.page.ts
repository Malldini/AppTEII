import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../../models/cliente.Interface';
import { Automovel } from '../../models/automovel.Interface';
import { AutomovelService } from 'src/app/services/automovel.service';
import { BusyLoaderService } from 'src/app/services/busy-loader.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  cliente: Cliente;
  automoveis: Automovel[];

  constructor(
    private clienteService : ClienteService,
    private busyLoader: BusyLoaderService,
    private automovelService : AutomovelService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController
  ) { 
    this.cliente = { 
      nome: '',
      tel:'',
      cpf: '',
      //automoveis: []
    };
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];       
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando'});
      loading.present();
      this.clienteService.getCliente(id).subscribe((cliente) => {
        this.cliente = cliente;
        loading.dismiss();
      });
    } 
  }


  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando'});
    loading.present();

    this.clienteService
      .salvar(this.cliente)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/cliente']);
      });
  }  

  //ngOnInit() {
  //  this.listarAutomoveis();
  //}
//
  //async listarAutomoveis() {
  //  const busyLoader = await this.busyLoader.create('Carregando automoveis...');
  //  
  //  this.automovelService.getAutomoveis().subscribe((automoveis) => {
  //    this.automoveis = automoveis;
  //    this.carregarCliente();
  //    busyLoader.dismiss();
  //  });
  //}
//
  //carregarCliente() {
  //  const id = this.activatedRoute.snapshot.params['id'];
  //  if (id) {
  //    this.clienteService.getCliente(id).subscribe(cliente => this.cliente = cliente);
  //  }
  //}
//
  //compareWith(automovel1: Automovel, automovel2: Automovel) {
  //  return automovel1 && automovel2 ? automovel1.id === automovel2.id : automovel1 === automovel2;
  //};
//
  //async salvar(cliente: Cliente) {
  //  const loading = await this.busyLoader.create('Salvando cliente...');
//
  //  this.clienteService
  //    .salvar(cliente)
  //    .subscribe(() => {
  //      loading.dismiss();
  //      this.navController.navigateForward(['/clientes']);
  //    }, () => {
  //      loading.dismiss();
  //    });
  //}

}
