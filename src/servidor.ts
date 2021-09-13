import { CodigoHttp, PedidoHttp, RespuestaHttp } from "./http";

export const servidorWeb = {
  procesar(pedido: PedidoHttp): RespuestaHttp {
    return new RespuestaHttp(CodigoHttp.OK, "cualquier cosa", 200, pedido);
  },
};
