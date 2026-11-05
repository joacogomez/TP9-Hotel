export default function Header() {
  return (
    <header className="header">
      <a className="logo" href="#inicio">Hotel Cerro Alto</a>
      <nav aria-label="Principal">
        <a href="#inicio">Inicio</a>
        <a href="#nosotros">Acerca de nosotros</a>
        <a href="#reservas" className="nav-cta">Reservas</a>
      </nav>
    </header>
  );
}
