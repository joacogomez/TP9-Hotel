import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import simple from "./img/simple.jpeg";
import doble from "./img/doble.jpeg";
import triple from "./img/triple.jpeg";
import suite from "./img/suite.jpg";

registerLocale("es", es);

const HABITACIONES = [
  { id: 1, nombre: "Habitación Simple", capacidad: "1 persona", precio: 45000, detalle: "Cama de una plaza y escritorio.", imagen: simple },
  { id: 2, nombre: "Habitación Doble", capacidad: "2 personas", precio: 70000, detalle: "Cama matrimonial y balcón al patio.", imagen: doble },
  { id: 3, nombre: "Habitación Triple", capacidad: "3 personas", precio: 95000, detalle: "Una cama matrimonial y una individual.", imagen: triple },
  { id: 4, nombre: "Suite con vista", capacidad: "4 personas", precio: 140000, detalle: "Living, dos ambientes y vista al cerro.", imagen: suite },
];

const fmtPrecio = (n) => n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
const fmtFecha = (d) => d.toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });
const MS_DIA = 1000 * 60 * 60 * 24;

export default function Reservas() {
  const [habitacionId, setHabitacionId] = useState(null);
  const [rango, setRango] = useState([null, null]);
  const [ocupadas, setOcupadas] = useState({}); // { idHabitacion: [{start, end}] }
  const [inicio, fin] = rango;

  const habitacion = HABITACIONES.find((h) => h.id === habitacionId);
  const noches = inicio && fin ? Math.round((fin - inicio) / MS_DIA) : 0;
  const total = habitacion ? habitacion.precio * noches : 0;

  const elegirHabitacion = (id) => {
    setHabitacionId(id);
    setRango([null, null]);
  };

  const confirmar = () => {
    if (!habitacion) return alert("Elegí una habitación para continuar.");
    if (!inicio || !fin) return alert("Seleccioná en el calendario la fecha de ingreso y la de salida.");

    alert(
      `¡Reserva confirmada!\n\n${habitacion.nombre}\nIngreso: ${fmtFecha(inicio)}\nSalida: ${fmtFecha(fin)}\n` +
        `${noches} ${noches === 1 ? "noche" : "noches"} · Total ${fmtPrecio(total)}`
    );

    setOcupadas((prev) => ({
      ...prev,
      [habitacion.id]: [...(prev[habitacion.id] || []), { start: inicio, end: fin }],
    }));
    setRango([null, null]);
  };

  return (
    <section id="reservas" className="seccion reservas">
      <h2>Reservas</h2>
      <p className="sub">1. Elegí una habitación. 2. Marcá ingreso y salida en el calendario. 3. Confirmá.</p>

      <div className="habitaciones">
        {HABITACIONES.map((h) => (
          <button
            key={h.id}
            type="button"
            className={`habitacion ${h.id === habitacionId ? "activa" : ""}`}
            onClick={() => elegirHabitacion(h.id)}
            aria-pressed={h.id === habitacionId}
          >
            <img className="foto" src={h.imagen} alt={h.nombre} />
            <span className="info">
              <strong>{h.nombre}</strong>
              <span>{h.capacidad}</span>
              <span className="detalle">{h.detalle}</span>
              <span className="precio">{fmtPrecio(h.precio)} <small>por noche</small></span>
            </span>
          </button>
        ))}
      </div>

      <div className="panel">
        <div className="calendario">
          <DatePicker
            inline
            selectsRange
            locale="es"
            monthsShown={2}
            minDate={new Date()}
            startDate={inicio}
            endDate={fin}
            onChange={(r) => setRango(r)}
            excludeDateIntervals={habitacionId ? ocupadas[habitacionId] || [] : []}
          />
        </div>

        <div className="resumen">
          <h3>Tu reserva</h3>
          <dl>
            <dt>Habitación</dt>
            <dd>{habitacion ? habitacion.nombre : "Sin elegir"}</dd>
            <dt>Ingreso</dt>
            <dd>{inicio ? fmtFecha(inicio) : "—"}</dd>
            <dt>Salida</dt>
            <dd>{fin ? fmtFecha(fin) : "—"}</dd>
            <dt>Total</dt>
            <dd>{noches > 0 ? `${fmtPrecio(total)} (${noches} ${noches === 1 ? "noche" : "noches"})` : "—"}</dd>
          </dl>
          <button type="button" className="boton" onClick={confirmar}>Confirmar reserva</button>
        </div>
      </div>
    </section>
  );
}
