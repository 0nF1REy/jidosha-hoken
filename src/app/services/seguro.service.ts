import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seguro } from '../models/Seguro';
import { Observable, of, from } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { OnlineOfflineService } from './online-offline.service';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class SeguroService {
  private API_SEGUROS = 'http://localhost:9000/api';
  private db!: Dexie;
  private table: Dexie.Table<Seguro, any> | null = null;

  constructor(
    private http: HttpClient,
    private onlineOfflineService: OnlineOfflineService
  ) {
    this.ouvirStatusConexao();
    this.iniciarIndexedDb();
  }

  private iniciarIndexedDb() {
    this.db = new Dexie('db-seguros');
    this.db.version(1).stores({
      seguro: 'id',
    });
    this.table = this.db.table('seguro');
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

  private async salvarIndexedDb(seguro: Seguro): Promise<void> {
    try {
      const seguroComId: Seguro = { ...seguro, id: crypto.randomUUID() };
      await this.table?.add(seguroComId);
      const todosSeguros: Seguro[] = (await this.table?.toArray()) || [];
      console.log('Seguro foi salvo no IndexedDb', todosSeguros);
    } catch (error) {
      console.log('Erro ao incluir seguro no IndexedDb', error);
    }
  }

  private async enviarIndexedDbParaApi() {
    const todosSeguros: Seguro[] = (await this.table?.toArray()) || [];

    from(todosSeguros)
      .pipe(
        switchMap((seguro) => this.salvarAPI(seguro)),
        tap(() => this.limparIndexedDb()),
        catchError((err) => {
          console.error('Erro ao sincronizar seguro', err);
          return of(null);
        })
      )
      .subscribe({
        complete: () => {
          console.log('Sincronização completa e IndexedDB limpo!');
        },
      });
  }

  private async limparIndexedDb(): Promise<void> {
    try {
      await this.table?.clear();
      console.log('IndexedDB limpo com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar IndexedDB', error);
    }
  }

  public cadastrar(seguro: Seguro): Observable<void> {
    if (this.onlineOfflineService.isOnline) {
      return this.salvarAPI(seguro);
    } else {
      this.salvarIndexedDb(seguro);
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

  async listarDoIndexedDb(): Promise<Seguro[]> {
    try {
      const seguros: Seguro[] = (await this.table?.toArray()) || [];
      console.log('Seguros carregados do IndexedDB:', seguros);
      return seguros;
    } catch (error) {
      console.error('Erro ao listar seguros do IndexedDB', error);
      return [];
    }
  }

  private ouvirStatusConexao() {
    console.log('Escutando status de conexão...');

    this.onlineOfflineService.statusConexao.subscribe((online) => {
      if (online) {
        this.enviarIndexedDbParaApi();
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
    from(segurosPendentes)
      .pipe(
        switchMap((seguro) => this.salvarAPI(seguro)),
        tap(() => this.limparIndexedDb()),
        catchError((err) => {
          console.error('Erro ao sincronizar seguro', err);
          return of(null);
        })
      )
      .subscribe({
        complete: () => {
          console.log('Sincronização completa e IndexedDB limpo!');
        },
      });
  }
}
