import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SeguroService } from '../../services/seguro.service';
import { Seguro } from '../../models/Seguro';

@Component({
  selector: 'app-listar-seguros',
  templateUrl: './listar-seguros.component.html',
  styleUrl: './listar-seguros.component.css',
})
export class ListarSegurosComponent implements OnInit {
  public seguros$: Observable<Seguro[]> = of([]);

  constructor(private seguroService: SeguroService) {}

  ngOnInit(): void {
    this.seguros$ = this.seguroService.listar();
  }
}
