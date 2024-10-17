
import { WINNER_COMBINATIONS } from '../constants';

export const checkWinner = (boardToCheck) => {
    // recorrer todas las combinaciones ganadoras
    for (const combination of WINNER_COMBINATIONS) {
        const [a, b, c] = combination // desestructuración de array, con 3 posiciones ganadoras
        // si las tres celdas son iguales y no son nulas
        // miro si en la posición a hay algo y si es igual a lo que hay en la b y en la c
        if (boardToCheck[a] //0 --> X ó O
            && boardToCheck[a] === boardToCheck[b] // si es igual a la posicion b
            && boardToCheck[a] === boardToCheck[c]) // si es igual a la posicion c
        {
            return boardToCheck[a] // si hay ganador, devuelvo el valor de la celda, que sera el del jugador ganador X ó O
        }
    }

    return null // si no hay ganador, devuelvo null
}

