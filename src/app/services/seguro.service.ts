import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seguro } from '../models/Seguro';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OnlineOfflineService } from './online-offline.service';

@Injectable({
  providedIn: 'root',
})
export class SeguroService {
  private API_SEGUROS = 'http://localhost:9000/api';

  constructor(
    private http: HttpClient,
    private OnlineOfflineService: OnlineOfflineService
  ) {}

  cadastrar(seguro: Seguro): Observable<void> {
    return this.http.post<void>(`${this.API_SEGUROS}/seguros`, seguro).pipe(
      tap(() => {
        console.log('Seguro cadastrado com sucesso!');
      }),
      catchError((err) => {
        console.log('Erro ao cadastrar seguro', err);
        return of();
      })
    );
  }

  listar(): Observable<Seguro[]> {
    return this.http.get<Seguro[]>(`${this.API_SEGUROS}/seguros`); // Corrigido aqui
  }
}
