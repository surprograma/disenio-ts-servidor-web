import { ClienteMail } from "./mail";
import axios, { AxiosError } from "axios";

export class DiscordMail implements ClienteMail {
  private urlBase: string;

  constructor(
    public nombreGrupo: string,
    webhookId: string,
    webhookToken: string
  ) {
    this.urlBase = `https://discord.com/api/webhooks/${webhookId}/${webhookToken}`;
  }

  async enviar(
    destinatario: string,
    asunto: string,
    cuerpo: string
  ): Promise<void> {
    try {
      await axios.post(
        this.urlBase,
        this.crearRequest(destinatario, asunto, cuerpo)
      );
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw error;
      }

      const axError = error as AxiosError;
      throw new Error(`
        Falló la request a Discord... ¿habrás copiado mal las credenciales?
        Codigo: ${axError.response?.status}
        Error: ${axError.message}
      `);
    }
  }

  private crearRequest(destinatario: string, asunto: string, cuerpo: string) {
    return {
      embeds: [
        {
          title: ":e_mail: ¡Nuevo mensaje recibido!",
          description: `_Parece que el grupo **${this.nombreGrupo}** está haciendo algunas pruebas..._`,
          fields: [
            { name: "Destinatario/a", value: destinatario, inline: true },
            { name: "Asunto", value: asunto, inline: true },
            { name: "Cuerpo", value: cuerpo, inline: false },
          ],
        },
      ],
    };
  }
}
