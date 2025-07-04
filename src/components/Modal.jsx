import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import CerrarBtn from "../img/cerrar.svg";


const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
}) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [fecha, setFecha] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha);

    }
  }, [])

  const OcultarModal = () => {
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return;
    }
    guardarGasto({ nombre, cantidad, categoria, id, fecha });
  };
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="Cerrar modal" onClick={OcultarModal} />
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        >
          <legend>{gastoEditar.nombre ? 'Guardar Cambio' : 'Aniadir Gasto'}</legend>
          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
          <div className="campo">
            <label htmlFor="nombre">Gasto</label>
            <input
              id="nombre"
              type="text"
              placeholder="aniade el Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="campo">
            <label htmlFor="nombre">Cantidad</label>
            <input
              id="cantidad"
              type="number"
              placeholder="introduce cantidad Gasto: ej. 300"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
            />
          </div>
          <div className="campo">
            <label htmlFor="categoria">Categoria</label>

            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">-- Selecciona --</option>
              <option value="ahorro">Ahorro</option>
              <option value="comida">Comida</option>
              <option value="casa">Casa</option>
              <option value="gastos">Gastos Varios</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
              <option value="suscripciones">Suscripciones</option>
            </select>
          </div>
          <input type="submit" value= {gastoEditar.nombre ? 'Guardar Cambios' : 'Aniadir Gasto'} />
        </form>
      </div>
    </div>
  );
};

export default Modal;
