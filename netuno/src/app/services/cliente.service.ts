import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  add(cliente: any) {
    let url = 'http://localhost:17901/api/cliente';

    var header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }

    let param = { nome : cliente, tel : cliente, cpf: cliente };

    return this.http.post(url, param, header).toPromise();
  }

  update(cliente: any) {
    let url = 'http://localhost:17901/api/cliente';

    var header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }

    return this.http.put(url, cliente, header).toPromise();
  }

  list(){
    let url = 'http://localhost:17901/api/cliente';

    return this.http.get(url).toPromise();
  }

  delete(id : any){
    let url = 'http://localhost:17901/api/cliente/' + id;

    return this.http.delete(url).toPromise();  
  }
}
