import { MarcaCarro } from './MarcaCarro';

export class Seguro {
  constructor(
    public id?: string,
    public marcaCarro?: MarcaCarro,
    public modeloCarro?: string,
    public placaCarro?: string,
    public nomeProprietario?: string,
    public sobrenomeProprietario?: string,
    public dataNascimentoProprietario?: string
  ) {}
}
