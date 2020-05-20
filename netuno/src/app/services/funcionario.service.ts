import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http: HttpClient) { }

  add(funcionario: any) {
    let url = 'http://localhost:17901/api/funcionario';

    var header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }

    let param = { nome : funcionario, tel : funcionario, cpf: funcionario };

    return this.http.post(url, param, header).toPromise();
  }

  update(funcionario: any) {
    let url = 'http://localhost:17901/api/funcionario';

    var header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }

    return this.http.put(url, funcionario, header).toPromise();
  }

  list(){
    let url = 'http://localhost:17901/api/funcionario';

    return this.http.get(url).toPromise();
  }

  delete(id : any){
    let url = 'http://localhost:17901/api/funcionario/' + id;

    return this.http.delete(url).toPromise();  
  }
}
