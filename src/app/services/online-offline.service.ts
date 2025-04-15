import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnlineOfflineService {
  private statusConexao$ = new Subject<boolean>();

  constructor() {
    window.addEventListener('online', () => this.atualizarStatusConexao());
    window.addEventListener('offline', () => this.atualizarStatusConexao());
  }

  get isOnline(): boolean {
    return !!window.navigator.onLine;
  }

  get statusConexao(): Observable<boolean> {
    return this.statusConexao$.asObservable();
  }

  atualizarStatusConexao() {
    this.statusConexao$.next(this.isOnline);
  }
}
