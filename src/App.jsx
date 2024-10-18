
import './App.css'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS } from './constants.js'
import { checkWinner } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'
import { Board } from './components/Board.jsx'
import { Turn } from './components/Turn.jsx'
import { Copyright } from './components/copyright/Copyright.jsx'

function App() {

  // ============================= 3 ESTADOS =============================
  // const board = Array(9).fill(null) // no lo quiero como un array
  // board = [null, ... asi 9 veces]
  // const [board, setBoard] = useState(Array(9).fill(null)) // 9 posiciones y tablero vacio
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board') // valor del local storage 'board' en una variable
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null) // si no hay nada en el local storage, se pone un array vacio
  }) // 9 posiciones y tablero vacio

  // const [turn, setTurn] = useState(TURNS.X) // X empieza
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn') // valor del local storage 'turn' en una variable
    return turnFromStorage ?? TURNS.X // si no hay nada en el local storage, se pone en el turno en X (lo ponemos como el valor inicial)
  })

  const [winner, setWinner] = useState(null) // null no hay ganador todavia, el false es que hay un empate, y 'X' o 'O'  es que hay un ganador y te dice cual es
  // =====================================================================

  // ============================= 3 FUNCIONES - PARTE DE LÓGICA DEL JUEGO =============================
  // Procedimiento para actualizar el tablero
  const updateBoard = (index) => {
    // 1_Comprobar si se puede modificar el tablero
    if (board[index] || winner) return // si la celda clicada no es nula, no se hace nada, o ya hay un ganador

    // 2_Actualizar el tablero
    // OJO: siempre se debe de copiar en un nuevo array y no modificar el estado original o recoger el original (en los estados)
    const newBoard = [...board] // Spread syntax: copia del tablero
    newBoard[index] = turn // se da el valor del estado del turno X o O en la celda clicada del tablero
    setBoard(newBoard) // se actualiza el tablero, de forma asíncrona (sin esperar a que terminen los demás procesos), no podemos fiarnos de que luego se haya actualizado el tablero por eso no se puede usar el board directamente en el checkWinner

    // 3_Cambiar el turno al otro jugador
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X  // si el turno es X, se cambia a O, si no, se cambia a X
    setTurn(newTurn)

    // Guardar aqui la partida en el ultimo turno en local storage
    //window.localStorage.setItem('board', JSON.stringify(newBoard)) // stringify: para que el array se guarde como string
    //window.localStorage.setItem('turn', newTurn)
    saveGameToStorage({   // guardar aqui partida
      board: newBoard,
      turn: newTurn
    })

    // 4_Revisar si hay un ganador
    const newWinner = checkWinner(newBoard) //logica para saber si hay un ganador y cual es (null = no hay ganador, 'X' o 'O' = el jugador ganador)

    if (newWinner) {  // si es diferente de null, es que hay un ganador (ya que la variable tendra el valor de la celda que ha ganado 'X' o 'O')
      confetti() // efecto de confetti
      //alert(`Ha ganado ${newWinner}`)
      setWinner(newWinner)
      // la actualiacion de los estados en React son asíncronos (no bloquean), por lo que no se puede resetear el tablero y hacer un alert  luego ya que puede que todabia no se haya actualizado el estado del tablero al no ser bloqueante. Si fuese sincrono si se podría hacer.
    } //Comprobar si hay un empate
    else if (!newBoard.includes(null)) {//si no es false es que  hay empate (si fuera null, significaria que todavia quedan celdas vacias)
      setWinner(false) // hay un empate
    }
  }

  // Procedimiento para resetear el juego
  const resetGame = () => {

    // 1_Resetear el tablero, el turno y el ganador
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    //window.localStorage.removeItem('board')
    //window.localStorage.removeItem('turn')
    resetGameStorage()
  }
  // =====================================================================

  return (
    <main className='board'>

      <h1>TRES EN RAYA</h1>

      <button onClick={resetGame}>Reiniciar el juego</button>

      <Board board={board} updateBoard={updateBoard} />

      <Turn turn={turn} />

      <WinnerModal resetGame={resetGame} winner={winner} />

      <Copyright />

    </main>
  )
}

export default App

