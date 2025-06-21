import { isValidElement } from "react";
import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlComponente from "./ControlComponente";

const Header = ({ 
    presupuesto, 
    setPresupuesto, 
    setIsValidoPresupuesto, 
    isValidoPresupuesto, 
    gastos, 
    setGastos }) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {isValidoPresupuesto ? (
        <ControlComponente 
          presupuesto={presupuesto}
          gastos={gastos}
          setGastos={setGastos}
          setPresupuesto={setPresupuesto}
          setIsValidoPresupuesto={setIsValidoPresupuesto}
          />
          
          
      ) : (
        <NuevoPresupuesto
          
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidoPresupuesto={setIsValidoPresupuesto}
        />
       
      )}
    </header>
  );
};

export default Header;
