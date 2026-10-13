# Conectar la web de un restaurante

Hay dos formas de que una web mande reservas a Control de Reservas. Las dos usan los
mismos dos endpoints y las mismas comprobaciones en el servidor.

| | Cuándo | Cómo |
| --- | --- | --- |
| **Contra la API** | La web la hacemos nosotros (Tía María) | Su formulario, su diseño, llamadas desde su servidor |
| **Formulario incrustado** | El restaurante ya tiene web y no la tocamos | Dos líneas de HTML con un `iframe` |

En ambos casos la reserva entra **pendiente**, el restaurante recibe su aviso con los
botones de confirmar y rechazar, y el cliente recibe el correo de "solicitud recibida".

## Los dos endpoints

No llevan token. Son públicos porque el formulario lo es, y quien valida todo es el
servidor. El `slug` identifica al restaurante (`tia-maria-vallecas`).

### 1. Qué se puede reservar

```http
POST https://admin.controldereservas.com/flows/trigger/<BOOKING_FLOW_AVAILABILITY>
Content-Type: application/json

{ "slug": "tia-maria-vallecas", "date": "2026-12-24" }
```

Respuesta:

```json
{
  "ok": true,
  "restaurante": { "name": "Tía María", "phone": "911 386 700", "min_guests": 1, "max_guests": 13,
                   "tagline": "Restaurante & Cervecería", "brand_primary": "#1e3023" },
  "zones":    [{ "slug": "terraza-acristalada", "name": "Terraza acristalada", "description": "…" }],
  "services": [{ "slug": "comida", "name": "Comida" }],
  "times":    ["12:00", "12:30", "…", "21:30"],
  "hoy": "2026-09-20"
}
```

Devuelve también:

- `dias_cerrados`: los días sin horario de los próximos cuatro meses. **Úsalos para
  tachar esos días en el calendario.** Si no, el cliente va pinchando día a día para
  descubrir que estáis de vacaciones, y muchos no vuelven.
- `cierres`: esos mismos días agrupados por tramos y con su motivo
  (`{ desde, hasta, motivo }`), para poder escribir "Cerramos del 28 de septiembre al
  4 de octubre".
- `fecha` y `hoy`, en el reloj del restaurante.

`times` ya tiene en cuenta el horario del día, los festivos, la última mesa y la
antelación mínima. Si no se manda `date`, responde con las horas de hoy.

### 2. Crear la reserva

```http
POST https://admin.controldereservas.com/flows/trigger/<BOOKING_FLOW_CREATE>
Content-Type: application/json

{
  "slug": "tia-maria-vallecas",
  "date": "2026-12-24", "time": "21:30", "guests": 4,
  "zone": "terraza-acristalada", "service": "cena",
  "customer_name": "Ana Pérez",
  "customer_phone": "600123456",
  "customer_email": "ana@example.com",
  "notes": "Alergia al marisco",

  "website": "",
  "elapsed_ms": 9000
}
```

- `{ "ok": true, "id": ["<uuid>"] }` — guardada.
- `{ "ok": false, "reason": "…" }` — no se guarda; enseña `reason` al cliente.
- `{ "ok": true, "reason": "Descartada por parecer automática." }` — el servidor la ha
  tomado por un robot. **Responde al visitante como si todo hubiera ido bien**: decirle
  que ha fallado solo ayuda a quien está probando.

**Estos dos campos son la protección contra spam y hay que enviarlos:**

- `website`: campo trampa. Píntalo escondido (fuera de pantalla, `tabIndex={-1}`,
  `autocomplete="off"`) y mándalo vacío. Los robots rellenan todo lo que encuentran.
- `elapsed_ms`: milisegundos desde que se pintó el formulario hasta que se envió.
  Por debajo de 1500 se descarta.

Además, el servidor comprueba por su cuenta: que la hora exista de verdad ese día, que
el número de personas esté dentro de lo permitido, que haya teléfono, que el correo
tenga forma de correo, y que no sea la misma reserva enviada dos veces (mismo
teléfono, día y hora).

**No te fíes del formulario para nada de esto**: el endpoint está abierto y cualquiera
puede llamarlo sin pasar por tu página.

## Web propia (Tía María)

Llama a los dos endpoints **desde el servidor**, no desde el navegador: así el
formulario no depende de que el visitante tenga JavaScript y no hay CORS que valga.

Sustituye lo que hoy vive en `restaurante-config.ts` (zonas, servicios, horas, días
cerrados) por la respuesta de *disponibilidad*, y `POST /api/reservations` por una
llamada a *crear*. Los correos ya no los manda la web: los manda Control de Reservas,
así que hay que quitar ese envío para que el cliente no reciba dos.

Lo mismo con los enlaces de confirmar y rechazar del correo: ahora van en el aviso que
envía Control de Reservas y apuntan al panel.

## Web de terceros

Dos líneas donde quieran el formulario:

```html
<iframe src="https://app.controldereservas.com/<slug>?incrustado=1"
        style="width:100%;height:900px;border:0" loading="lazy" title="Reservar mesa"></iframe>
```

`?incrustado=1` quita la cabecera con el nombre y el fondo, porque ya los pone su
página. Sin ese parámetro la página se ve entera, con la marca del restaurante, lista
para usarse como enlace suelto en Instagram, Google o WhatsApp:

```
https://app.controldereservas.com/tia-maria-vallecas
```

Si el restaurante quiere su propio dominio (`reservas.surestaurante.com`), apunta un
registro DNS al servidor del panel y se añade el dominio en Coolify.

## Qué falta

El formulario sabe **cuándo abre** el restaurante, pero todavía no **cuánta mesa
queda**: acepta 40 personas en Nochebuena y el restaurante lo ve luego. Cuando estén
las mesas y el aforo por zonas, `times` dejará de ofrecer lo que no cabe.
