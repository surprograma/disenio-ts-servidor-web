import { DateTime } from "luxon";
import { CodigoHttp, PedidoHttp, RespuestaHttp } from "./http";
import { servidorWeb } from "./servidor";

describe("Servidor web", () => {
  describe("responde a un pedido HTTP", () => {
    it("con código 200 OK", () => {
      const pedido = new PedidoHttp(
        "127.0.0.1",
        "http://surprograma.com/ideas.pdf",
        DateTime.now()
      );
      expect(servidorWeb.procesar(pedido)).toEqual(
        new RespuestaHttp(CodigoHttp.OK, "cualquier cosa", 200, pedido)
      );
    });
  });
});
