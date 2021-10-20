import { ClienteMail } from "../integraciones/cliente_mail";
import { DiscordMail } from "../integraciones/discord_mail";

export class AnalizadorIPsSospechosas {
  static clienteMail: ClienteMail = new DiscordMail(
    "prueba",
    "asdf123",
    "xxxx"
  );

  // TODO: este método está solo para mostrar cómo hacer un test con mocks,
  // borrarlo cuando haya métodos de verdad...
  async enviarMailDePrueba(): Promise<void> {
    await AnalizadorIPsSospechosas.clienteMail.enviar(
      "prueba@abcd.com.ar",
      "123 Probando",
      "Hola... sí, hola..."
    );
  }
}
