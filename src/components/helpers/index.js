
export const generarId = () => {
    const random = Math.random().toString(36).substring(2); // Genera un número aleatorio y lo convierte a base 36
    const fecha = Date.now().toString(36); // Obtiene la fecha actual en milisegundos y la convierte a base 36
    return random + fecha; // Combina ambos para crear un ID único
}

export const formatearFecha = (fecha) => {
    const fechaNueva = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return fechaNueva.toLocaleDateString('es-ES', opciones);
}