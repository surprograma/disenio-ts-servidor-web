import { AnalizadorIPsSospechosas } from "./ips_sospechosas";

// Le pedimos a Jest que "imposte" el módulo completo.
// Como el analizador lo usa, todos los llamados a funciones van a ser impostores.
jest.mock("../integraciones/discord_mail");

describe("Analizador IPs sospechosas", () => {
  let analizador: AnalizadorIPsSospechosas;

  beforeEach(() => {
    analizador = new AnalizadorIPsSospechosas();
  });

  it("envía mail de prueba", async () => {
    await analizador.enviarMailDePrueba();

    // Verificamos que se llamó al método correspondiente, con los parámetros correspondientes.
    expect(AnalizadorIPsSospechosas.clienteMail.enviar).toHaveBeenCalledWith(
      "prueba@abcd.com.ar",
      "123 Probando",
      "Hola... sí, hola..."
    );
  });
});
