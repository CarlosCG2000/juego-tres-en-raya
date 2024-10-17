
import { Square } from './Square.jsx'

// COMPONENTE WINNER --> SEPARADO DE LA APP
// La variable 'winner' es el ganador de la partida, si es null no ha acabado la partida, si es false hay empate (tablas), si es 'X' o 'O' hay un ganador
// La función 'resetGame' es para reiniciar el juego
export function WinnerModal({ winner, resetGame }) {

    if (winner == null) return null // si sigue la partida, no muestro nada

    const winnerText = winner === false ? 'Empate' : 'Ganó' // Si es false se ha empatado la partida si es true `Ganó: ${winner}`

    return (
        <section className='winner'>
            <div className='text'>
                <h2> {winnerText} </h2>

                <header className='win'>
                    {winner && <Square>{winner}</Square>} {/* si winner no es false (empate de la partida), muestro el valor del ganador */}
                </header>

                <footer>
                    <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
            </div>
        </section>
    )
}
