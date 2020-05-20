import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacoteService {

  constructor(private http: HttpClient) { }

  add(pacote: any) {
    let url = 'http://localhost:17901/api/pacote';

    var header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }

    let param = { nome : pacote, preco : pacote };

    return this.http.post(url, param, header).toPromise();
  }

  update(pacote: any) {
    let url = 'http://localhost:17901/api/pacote';

    var header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }

    return this.http.put(url, pacote, header).toPromise();
  }

  list(){
    let url = 'http://localhost:17901/api/pacote';

    return this.http.get(url).toPromise();
  }

  delete(id : any){
    let url = 'http://localhost:17901/api/pacote/' + id;

    return this.http.delete(url).toPromise();  
  }
}
