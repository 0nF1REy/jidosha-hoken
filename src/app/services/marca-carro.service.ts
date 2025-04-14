import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MarcaCarro } from '../models/MarcaCarro';

interface CarResponse {
  Makes: Array<{ make_id: number; make_display: string }>;
}

@Injectable({
  providedIn: 'root',
})
export class MarcaCarroService {
  private API_CARROS =
    'https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes';

  constructor(private http: HttpClient) {}

  private mapMarcas(
    marcas: { make_id: number; make_display: string }[]
  ): MarcaCarro[] {
    return marcas.map((marca) => ({
      codigo: String(marca.make_id),
      nome: marca.make_display,
    }));
  }

  public getMarcas(): Observable<MarcaCarro[]> {
    return this.http
      .jsonp<CarResponse>(this.API_CARROS, 'callback')
      .pipe(map((res: CarResponse) => this.mapMarcas(res.Makes)));
  }
}
