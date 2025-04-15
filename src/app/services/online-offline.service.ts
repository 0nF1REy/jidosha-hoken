import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnlineOfflineService {
  private statusConexao$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
    window.addEventListener('online', () => this.atualizarStatusConexao());
    window.addEventListener('offline', () => this.atualizarStatusConexao());

    this.atualizarStatusConexao();
  }

  get isOnline(): boolean {
    return navigator.onLine;
  }

  get statusConexao(): Observable<boolean> {
    return this.statusConexao$.asObservable();
  }

  atualizarStatusConexao(): void {
    const statusAtual = this.isOnline;
    console.log(
      `Status da conexão atualizado: ${statusAtual ? 'Online' : 'Offline'}`
    );
    this.statusConexao$.next(statusAtual);
  }

  buscarMarcasCarros(): Observable<any> {
    return this.http.get('https://www.carqueryapi.com/api/0.3/?cmd=getMakes');
  }
}
