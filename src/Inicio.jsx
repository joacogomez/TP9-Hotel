import hotel from "./img/hotel.jpeg";

export default function Inicio() {
  return (
    <section id="inicio" className="inicio">
      <div className="inicio-texto">
        <h1>Dormí a los pies del cerro, despertá con el valle a la vista.</h1>
        <p>
          Cuatro habitaciones, desayuno regional incluido y un patio con vista a
          la cordillera. Elegí tus fechas y reservá en un minuto.
        </p>
        <a className="boton" href="#reservas">Reservar una habitación</a>
      </div>
      <div className="inicio-arte">
        <img src={hotel} alt="Vista del Hotel Cerro Alto" />
      </div>
    </section>
  );
}
