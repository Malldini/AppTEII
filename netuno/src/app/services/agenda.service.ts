import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_LAVACAO } from './api-Lavacao';
import { Automovel } from '../page/models/automovel.Interface';
import { Agenda } from '../page/models/agenda.interface';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private URI = API_LAVACAO + 'agenda';

  constructor(
    private httpClient: HttpClient)
     { }

  getAgendas() {
    return this.httpClient.get<Agenda[]>(this.URI);
  }

  adicionar(agenda: Agenda) {
    return this.httpClient.post<Agenda>(this.URI, agenda);
  }

  atualizar(agenda: Agenda) {
    return this.httpClient.put<Agenda>(`${this.URI}/${agenda.id}`, agenda);
  }

  getAgenda(id: number) {
    return this.httpClient.get<Agenda>(`${this.URI}/${id}`);
  }

  excluir(agenda: Agenda) {
    return this.httpClient.delete(`${this.URI}/${agenda.id}`);
  }

  salvar(agenda: Agenda) {
    if (agenda && agenda.id) {
      return this.atualizar(agenda);
    } else {
      return this.adicionar(agenda);
    }
  }
}
