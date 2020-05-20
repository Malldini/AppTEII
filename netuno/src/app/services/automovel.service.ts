import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AutomovelService {

    constructor(private http: HttpClient) { }

    add(automovel: any) {
        let url = 'http://localhost:17901/api/automovel';

        var header = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
        }

        let param = { nome: automovel, marca: automovel, porta: automovel, placa: automovel };

        return this.http.post(url, param, header).toPromise();
    }

    update(automovel: any) {
        let url = 'http://localhost:17901/api/automovel';

        var header = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
        }

        return this.http.put(url, automovel, header).toPromise();
    }

    list() {
        let url = 'http://localhost:17901/api/automovel';

        return this.http.get(url).toPromise();
    }

    delete(id: any) {
        let url = 'http://localhost:17901/api/automovel/' + id;

        return this.http.delete(url).toPromise();
    }
}
