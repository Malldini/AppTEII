import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_LAVACAO } from './api-Lavacao';
import { Cliente } from '../page/models/cliente.Interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private URI = API_LAVACAO + 'cliente';

  constructor(
    private httpClient: HttpClient)
     { }

  getClientes() {
    return this.httpClient.get<Cliente[]>(this.URI);
  }

  adicionar(cliente: Cliente) {
    return this.httpClient.post<Cliente>(this.URI, cliente);
  }

  atualizar(cliente: Cliente) {
    return this.httpClient.put<Cliente>(`${this.URI}/${cliente.id}`, cliente);
  }

  getCliente(id: number) {
    return this.httpClient.get<Cliente>(`${this.URI}/${id}`);
  }

  excluir(cliente: Cliente) {
    return this.httpClient.delete(`${this.URI}/${cliente.id}`);
  }

  salvar(cliente: Cliente) {
    if (cliente.id) {
      return this.atualizar(cliente);
    } else {
      return this.adicionar(cliente);
    }
  }
}
