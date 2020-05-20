import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient) { }

  add(agenda: any) {
    let url = 'http://localhost:17901/api/agenda';

    var header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }

    let param = { nomeF : agenda, veiculo : agenda, nomeC: agenda, pacote: agenda, data: agenda };

    return this.http.post(url, param, header).toPromise();
  }

  update(agenda: any) {
    let url = 'http://localhost:17901/api/agenda';

    var header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }

    return this.http.put(url, agenda, header).toPromise();
  }

  list(){
    let url = 'http://localhost:17901/api/agenda';

    return this.http.get(url).toPromise();
  }

  delete(id : any){
    let url = 'http://localhost:17901/api/agenda/' + id;

    return this.http.delete(url).toPromise();  
  }
}
