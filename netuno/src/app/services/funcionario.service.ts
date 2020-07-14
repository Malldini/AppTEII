import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_LAVACAO } from './api-Lavacao';
import { Funcionario } from '../page/models/funcionario.Interface';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private URI = API_LAVACAO + 'funcionario';

  constructor(
    private httpClient: HttpClient)
     { }

  getFuncionarios() {
    return this.httpClient.get<Funcionario[]>(this.URI);
  }

  adicionar(funcionario: Funcionario) {
    return this.httpClient.post<Funcionario>(this.URI, funcionario);
  }

  atualizar(funcionario: Funcionario) {
    return this.httpClient.put<Funcionario>(`${this.URI}/${funcionario.id}`, funcionario);
  }

  getFuncionario(id: number) {
    return this.httpClient.get<Funcionario>(`${this.URI}/${id}`);
  }

  excluir(funcionario: Funcionario) {
    return this.httpClient.delete(`${this.URI}/${funcionario.id}`);
  }

  salvar(funcionario: Funcionario) {
    if (funcionario && funcionario.id) {
      return this.atualizar(funcionario);
    } else {
      return this.adicionar(funcionario);
    }
  }
}
