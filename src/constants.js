

export const TURNS = {
    X: '✖',
    O: '◉'
}

export const WINNER_COMBINATIONS = [
    [0, 1, 2], // primera fila
    [3, 4, 5], // segunda fila
    [6, 7, 8], // tercera fila
    [0, 3, 6], // primera columna
    [1, 4, 7], // segunda columna
    [2, 5, 8], // tercera columna
    [0, 4, 8], // diagonal
    [2, 4, 6]  // diagonal
]