import { TURNS } from "../constants";
import { Square } from "./Square";

// COMPONENTE SQUARE --> SEPARADO DE LA APP
// turn: el estado del turno si es el jugadro 'O' o 'X'
export function Turn({turn}) {
    return (
        <section className='turn'>
            <Square isSelected={turn === TURNS.X}> {TURNS.X} </Square>
            <Square isSelected={turn === TURNS.O}> {TURNS.O} </Square>
        </section>
    )
}