import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlComponente = ({ 
    
    gastos,
    setGasto,
    presupuesto, 
    setPresupuesto,
    setIsValidoPresupuesto 

}) => {
    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => Number(gasto.cantidad) + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        // Calcular el porcentaje gastado
        const nuevoPorcentaje = Number((((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2));

        setDisponible(totalDisponible);
        setGastado(totalGastado);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1500);
    }, [gastos, presupuesto]);

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Estás seguro de que deseas reiniciar la aplicación?'); 
        if (resultado) {
            setGasto([]);
            setPresupuesto(0);
            setIsValidoPresupuesto(false);
            // Aquí podrías también limpiar los gastos si es necesario
        }
    }
    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar 
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3b82f6',
                        trailColor: '#f5f5f5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3b82f6',
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button 
                    className="reset-app"
                    type="button"
                    onClick={() => handleResetApp()}
                >
                    Resetear APP
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p className={disponible < 0 ? 'negativo' : ''}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlComponente;