import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_LAVACAO } from './api-Lavacao';
import { Pacote } from '../page/models/pacote.Interface';

@Injectable({
  providedIn: 'root'
})
export class PacoteService {

  private URI = API_LAVACAO + 'pacote';

  constructor(
    private httpClient: HttpClient)
     { }

  getPacotes() {
    return this.httpClient.get<Pacote[]>(this.URI);
  }

  adicionar(pacote: Pacote) {
    return this.httpClient.post<Pacote>(this.URI, pacote);
  }

  atualizar(pacote: Pacote) {
    return this.httpClient.put<Pacote>(`${this.URI}/${pacote.id}`, pacote);
  }

  getPacote(id: number) {
    return this.httpClient.get<Pacote>(`${this.URI}/${id}`);
  }

  excluir(pacote: Pacote) {
    return this.httpClient.delete(`${this.URI}/${pacote.id}`);
  }

  salvar(pacote: Pacote) {
    if (pacote && pacote.id) {
      return this.atualizar(pacote);
    } else {
      return this.adicionar(pacote);
    }
  }
}
