import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({providedIn: 'root'})
export class BusyLoaderService {

    constructor(
        private loadingController:LoadingController
    ) {}

    async create(mensagem: string) {
        const busyLoader = await this.loadingController.create({ message: mensagem });
        busyLoader.present();        
        return busyLoader;
    }

}