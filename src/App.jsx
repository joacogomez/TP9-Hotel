import Header from "./Header.jsx";
import Inicio from "./Inicio.jsx";
import AcercaDeNosotros from "./AcercaDeNosotros.jsx";
import Reservas from "./Reservas.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Inicio />
        <AcercaDeNosotros />
        <Reservas />
      </main>
      <footer className="footer">
        <p>Hotel Cerro Alto · Salta, Argentina · Trabajo Práctico N°9 – Lenguaje IV</p>
      </footer>
    </>
  );
}
