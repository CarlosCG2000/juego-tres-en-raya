import { Square } from "./Square"

// COMPONENTE BOARD --> SEPARADO DE LA APP
// board: el estado es el que se encuetra en el tablero
// updateBoard: una forma de actualizar el tablero, comprobando todo lo necesario
export function Board({board, updateBoard}) {
    return(
        <section className="game">
        {
            board.map((square, index) => {
            {/* el map devuelve un array */ }
            {/* el _ es el valor de cada celda */ }
            {/* el index es la posición de cada celda */ }
            {/* el key es el identificador de cada celda */ }
            return (
                // Componente de las celdas del tablero
                <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                > {/* updateBoard: no lo tengo funcion de actualizar estado, cambiar turno, ver si es ganador o no
                MUY IMPORTANTE PASAR COMO EJECUCIÓN NO COMO FUNCIÓN, ES DECIR SIN EL () PARA QUE NO SE RENDERICE 9 VECES */}
                {square}
                </Square>
            )
            })
        }
        </section>

    )
}