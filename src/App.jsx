import { useState, useEffect } from "react";
import Header from "./components/Header";
import Filtros from "./components/Filtros";
import Modal from "./components/Modal";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import { generarId } from "./components/helpers";
import ListadoGastos from "./components/ListadoGastos.";
function App() {
  const [gastos, setGasto] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidoPresupuesto, setIsValidoPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);

  }, [gastos]);

  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }


  }, [filtro])

  useEffect(() => {
    const presupuertoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    if (presupuertoLS > 0) {
      setIsValidoPresupuesto(true);
    }

  }, [] )

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      // actualizar
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGasto(gastosActualizados);
      setGastoEditar({});
    } else {
      // Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGasto([...gastos, gasto]);
    }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGasto(gastosActualizados);
  };
  return (
    <>
      <div className={modal ? "fijar" : ""}>
        <Header
          
          gastos={gastos}
          setGasto={setGasto}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidoPresupuesto={isValidoPresupuesto}
          setIsValidoPresupuesto={setIsValidoPresupuesto}
        />

        {isValidoPresupuesto && (
          <>
            <main>
              <Filtros
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos
                gastos={gastos}
                setModal={setModal}
                setAnimarModal={setAnimarModal}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
            </main>
            <div className="nuevo-gasto">
              <img
                src={IconoNuevoGasto}
                alt="Icono nuevo gasto"
                onClick={handleNuevoGasto}
              />
            </div>
          </>
        )}

        {modal && (
          <Modal
            setModal={setModal}
            animarModal={animarModal}
            setAnimarModal={setAnimarModal}
            guardarGasto={guardarGasto}
            gastoEditar={gastoEditar}
          />
        )}
      </div>
    </>
  );
}

export default App;
