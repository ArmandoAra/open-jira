import { formatDistanceToNow } from "date-fns";
// Para establecer el idioma que queramos y lo pasamos a la funcion como segundo parametro en un objeto
// import { es } from 'date-fns/locale'



// Obtener el tiempo desde que se creo un archivo hasta ahora
export const getFormatDistanceToNow = (date: number) => {
    const fromNow = formatDistanceToNow(date);

    return fromNow
}