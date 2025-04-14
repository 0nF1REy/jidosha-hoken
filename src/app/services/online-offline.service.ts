import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnlineOfflineService {
  private statusConexao$ = new Subject<boolean>();

  constructor() {
    console.log('OnlineOfflineService iniciado');

    window.addEventListener('online', () => {
      console.log('Está online');
      this.atualizarStatusConexao();
    });

    window.addEventListener('offline', () => {
      console.log('Está offline');
      this.atualizarStatusConexao();
    });

    this.atualizarStatusConexao();
  }

  get isOnline(): boolean {
    return !!navigator.onLine;
  }

  get statusConexao(): Observable<boolean> {
    return this.statusConexao$.asObservable();
  }

  private atualizarStatusConexao() {
    this.statusConexao$.next(this.isOnline);
  }
}
