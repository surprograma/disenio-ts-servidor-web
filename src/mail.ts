export interface ClienteMail {
  enviar(destinatario: string, asunto: string, cuerpo: string): Promise<void>;
}
