# Babysis

Web de una página para Babysis: babysitter, jardín en casa, estimulación temprana y clases particulares.

Es HTML puro, sin dependencias ni pasos de compilación. Todo está dentro de `index.html`, incluidos el logo y el ícono de la pestaña, así que ese es el único archivo que necesita la web.

## Número de WhatsApp

El número ya está configurado (+56 9 2224 4956). Si algún día cambia, edita esta línea cerca del final de `index.html`:

```js
var WHATSAPP = "56922244956";
```

Usa el formato `56` + `9` + los 8 dígitos. Con eso se actualizan los dos botones de reserva y el teléfono visible en el bloque de contacto.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube `index.html` y `README.md` a la rama `main`.
2. En el repositorio entra a **Settings > Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
4. Guarda. En uno o dos minutos la web queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Mensaje de WhatsApp

Al presionar "Reservar por WhatsApp" se abre este mensaje, listo para completar:

```
Hola! Quisiera agendar un servicio por favor:
- Servicio Deseado:
- Dirección y Comuna:
- Día/s y horario:
- Edad de el/la menor a cuidar:
```

Para cambiarlo, edita la variable `MENSAJE` junto al número.
