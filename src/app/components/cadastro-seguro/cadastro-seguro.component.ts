import { Component, OnInit } from '@angular/core';
import { Seguro } from '../../models/Seguro';
import { Observable } from 'rxjs';
import { MarcaCarro } from '../../models/MarcaCarro';
import { MarcaCarroService } from '../../services/marca-carro.service';
import { SeguroService } from '../../services/seguro.service';

@Component({
  selector: 'app-cadastro-seguro',
  templateUrl: './cadastro-seguro.component.html',
  styleUrls: ['./cadastro-seguro.component.css'],
})
export class CadastroSeguroComponent implements OnInit {
  public seguro = new Seguro();
  public marcasCarro$!: Observable<MarcaCarro[]>;
  public successMessage: string = '';
  public errorMessage: string = '';

  constructor(
    private marcaCarroService: MarcaCarroService,
    private seguroService: SeguroService
  ) {}

  ngOnInit(): void {
    this.marcasCarro$ = this.marcaCarroService.getMarcas();
  }

  cadastrar() {
    this.seguro.id = this.seguro.placaCarro;
    this.seguroService.cadastrar(this.seguro).subscribe({
      next: () => {
        this.successMessage = 'Seguro cadastrado com sucesso!';
      },
      error: () => {
        this.errorMessage = 'Erro ao cadastrar seguro. Tente novamente.';
      },
    });
  }

  adicionar(): void {
    this.seguroService.cadastrar(this.seguro).subscribe({
      next: () => {
        this.successMessage = 'Seguro cadastrado com sucesso!';
      },
      error: () => {
        this.errorMessage = 'Erro ao cadastrar seguro. Tente novamente.';
      },
    });
  }

  enviarNotificacao(): void {
    console.log('Notificação enviada!');
    alert('Notificação enviada com sucesso!');
  }
}
