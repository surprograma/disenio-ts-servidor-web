import { ClienteMail } from "./cliente_mail";
import axios, { AxiosError } from "axios";

/*
👀 ¡¡ATENCIÓN!!
El código de este archivo *funciona* tal cual está y no debe realizarse ninguna modificación.
Lo incluimos en el proyecto únicamente con fines didácticos, para quienes quieran ver cómo
está hecho. El ejercicio se tiene que resolver sin alterar para nada este archivo.
 */

type DiscordMessage = {
  embeds: DiscordEmbed[];
};

type DiscordEmbed = {
  title: string;
  description: string;
  fields: DiscordEmbedField[];
};

type DiscordEmbedField = {
  name: string;
  value: string;
  inline: boolean;
};

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

  private crearRequest(
    destinatario: string,
    asunto: string,
    cuerpo: string
  ): DiscordMessage {
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
