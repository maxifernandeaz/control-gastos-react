import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
    

      {filtro ? (
        <>
          <h2>{gastosFiltrados.length ? "Gastos" : "No hay Gastos En esta categoria"}</h2>
       
        {gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
      ))}
       </>
        ): ( 
          <>
          {gastos.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
          </>
        )}
    </div>
  );
};

export default ListadoGastos;
