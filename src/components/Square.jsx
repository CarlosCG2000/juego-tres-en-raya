

// COMPONENTE SQUARE --> SEPARADO DE LA APP
// children: el valor que tiene que tener dentro del tablero 'X' o 'O'
// updateBoard: una forma de actualizar el tablero
// index: saber que celda se ha clicado
export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        updateBoard(index)
    }

    return (
        // onClick={handleClick} --> si se hace click en el cuadrado, se actualiza el tablero que llama al handleClick que llama al updateBoard
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}

