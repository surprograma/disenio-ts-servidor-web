import { DateTime } from "luxon";

// Para no tener los códigos "tirados por ahí", usamos un enum que le da el nombre que corresponde a cada código
// La idea de las clases enumeradas es usar directamente sus objetos: CodigoHTTP.OK, CodigoHTTP.NOT_IMPLEMENTED, etc
export enum CodigoHttp {
  OK = 200,
  NOT_FOUND = 404,
  NOT_IMPLEMENTED = 501,
}

export class PedidoHttp {
  constructor(
    public ip: string,
    public url: string,
    public fechaHora: DateTime
  ) {}
}

export class RespuestaHttp {
  constructor(
    public codigo: CodigoHttp,
    public body: string,
    public tiempo: number,
    public pedido: PedidoHttp
  ) {}
}
