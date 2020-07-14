import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_LAVACAO } from './api-Lavacao';
import { Automovel } from '../page/models/automovel.Interface';

@Injectable({
  providedIn: 'root'
})
export class AutomovelService {

  private URI = API_LAVACAO + 'automovel';

  constructor(
    private httpClient: HttpClient)
     { }

  getAutomoveis() {
    return this.httpClient.get<Automovel[]>(this.URI);
  }

  adicionar(automovel: Automovel) {
    return this.httpClient.post<Automovel>(this.URI, automovel);
  }

  atualizar(automovel: Automovel) {
    return this.httpClient.put<Automovel>(`${this.URI}/${automovel.id}`, automovel);
  }

  getAutomovel(id: number) {
    return this.httpClient.get<Automovel>(`${this.URI}/${id}`);
  }

  excluir(automovel: Automovel) {
    return this.httpClient.delete(`${this.URI}/${automovel.id}`);
  }

  salvar(automovel: Automovel) {
    if (automovel && automovel.id) {
      return this.atualizar(automovel);
    } else {
      return this.adicionar(automovel);
    }
  }
}
