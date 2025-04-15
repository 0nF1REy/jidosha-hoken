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
    private onlineOfflineService: OnlineOfflineService
  ) {
    this.ouvirStatusConexao();
  }

  private salvarAPI(seguro: Seguro): Observable<void> {
    if (!this.onlineOfflineService.isOnline) {
      console.log('Usuário está offline. Não é possível cadastrar o seguro.');
      return of();
    }

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

  public cadastrar(seguro: Seguro): Observable<void> {
    if (this.onlineOfflineService.isOnline) {
      return this.salvarAPI(seguro);
    } else {
      console.log('Salvar seguro no banco local');
      const segurosPendentes = JSON.parse(
        localStorage.getItem('segurosPendentes') || '[]'
      );
      segurosPendentes.push(seguro);
      localStorage.setItem(
        'segurosPendentes',
        JSON.stringify(segurosPendentes)
      );
      return of();
    }
  }

  listar(): Observable<Seguro[]> {
    return this.http.get<Seguro[]>(`${this.API_SEGUROS}/seguros`).pipe(
      catchError((err) => {
        console.log('Erro ao listar seguros', err);
        return of([]);
      })
    );
  }

  private ouvirStatusConexao() {
    console.log('Escutando status de conexão...');

    this.onlineOfflineService.statusConexao.subscribe((online) => {
      if (online) {
        console.log('Enviando os dados do meu banco local pra API');

        const segurosPendentes = JSON.parse(
          localStorage.getItem('segurosPendentes') || '[]'
        );

        if (segurosPendentes.length > 0) {
          this.sincronizarSeguros(segurosPendentes);
        } else {
          console.log('Nenhum seguro pendente para sincronizar.');
        }
      } else {
        console.log('Estou offline');
      }
    });
    this.onlineOfflineService.atualizarStatusConexao();
  }

  private sincronizarSeguros(segurosPendentes: Seguro[]) {
    let segurosSincronizados = 0;

    segurosPendentes.forEach((seguro: Seguro) => {
      this.salvarAPI(seguro).subscribe({
        next: () => {
          console.log(`Seguro sincronizado com sucesso:`, seguro);
          segurosSincronizados++;
          if (segurosSincronizados === segurosPendentes.length) {
            localStorage.removeItem('segurosPendentes');
          }
        },
        error: (err) => {
          console.error('Erro ao sincronizar seguro', err);
        },
      });
    });
  }
}
