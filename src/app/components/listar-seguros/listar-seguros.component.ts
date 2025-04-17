import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SeguroService } from '../../services/seguro.service';
import { Seguro } from '../../models/Seguro';
import { OnlineOfflineService } from '../../services/online-offline.service';
import { switchMap, startWith, from } from 'rxjs'; // Importa 'from'

@Component({
  selector: 'app-listar-seguros',
  templateUrl: './listar-seguros.component.html',
  styleUrl: './listar-seguros.component.css',
})
export class ListarSegurosComponent implements OnInit {
  public seguros$: Observable<Seguro[]> = new Observable<Seguro[]>();

  constructor(
    private seguroService: SeguroService,
    private onlineOfflineService: OnlineOfflineService
  ) {}

  ngOnInit(): void {
    this.seguros$ = this.onlineOfflineService.statusConexao.pipe(
      startWith(this.onlineOfflineService.isOnline),
      switchMap((online) => {
        if (online) {
          console.log('Carregando seguros da API');
          return this.seguroService.listar();
        } else {
          console.log('Carregando seguros do IndexedDB');
          return from(this.seguroService.listarDoIndexedDb());
        }
      })
    );
  }
}
