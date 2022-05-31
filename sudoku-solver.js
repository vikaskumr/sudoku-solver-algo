// Board is List[List[Int]] or false
// interp. as a sudoku board, or false if the given board is invalid
// EXAMPLE BOARDS

const b = null

var bd1 = [ [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9]]


var bd2 = [ [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b]]


var bd3 = [ [b, b, b, b, b, 8, 9, 1, b],
            [b, b, 1, b, b, b, b, b, 3],
            [9, b, b, b, 2, 7, b, b, 5],
            [3, b, 2, 5, 6, b, b, b, b],
            [5, b, b, b, b, b, b, b, 8],
            [b, b, b, b, 8, 3, 5, b, 4],
            [8, b, b, 7, 4, b, b, b, 2],
            [6, b, b, b, b, b, 1, b, b],
            [b, 5, 7, 3, b, b, b, b, b]]


var bd4 = [ [1, 2, 3, 4, 5, 6, 7, 8, b],
            [b, b, b, b, b, b, b, b, 2],
            [b, b, b, b, b, b, b, b, 3],
            [b, b, b, b, b, b, b, b, 4],
            [b, b, b, b, b, b, b, b, 5],
            [b, b, b, b, b, b, b, b, 6],
            [b, b, b, b, b, b, b, b, 7],
            [b, b, b, b, b, b, b, b, 8],
            [b, b, b, b, b, b, b, b, 9]]



function solve(board) {
    // THIS FUNCTION WORKS.
    // Board -> Board
    // solves the given sudoku board
    // ASSUME the given sudoku board is valid
    if (solved(board)) {
        return board
    }
    else {
        const possibilities = nextBoards(board)
        const validBoards = keepOnlyValid(possibilities)
        return searchForSolution(validBoards)
    }
}

// ______TESTS______ //
// console.log(solve(bd4))
// ______TESTS______ //


function searchForSolution(boards){
    // List[Board] -> Board or false
    // finds a valid solution to the sudoku problem
    if (boards.length < 1){
        return false
    }
    else {
        // backtracking search for solution
        var first = boards.shift()
        const tryPath = solve(first)
        if (tryPath != false){
            return tryPath
        }
        else{
            return searchForSolution(boards)
        }
    }
}


function solved(board){
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // checks to see if the given puzzle is solved
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null){
                return false
            }
        }
    }
    return true
}

// ______TESTS______ //
// console.log(solved(bd3))
// ______TESTS______ //


function nextBoards(board){ 
    // THIS FUNCTION WORKS.
    // Board -> List[Board]
    // finds the first emply square and generates 9 different boards filling in that square with numbers 1...9
    var res = []
    const firstEmpty = findEmptySquare(board)
    if (firstEmpty != undefined){
        const y = firstEmpty[0]
        const x = firstEmpty[1]
        for (var i = 1; i <= 9; i++){
            var newBoard = [...board]
            var row = [...newBoard[y]]
            row[x] = i
            newBoard[y] = row
            res.push(newBoard)
        }
    }
    return res
}

function findEmptySquare(board){
    // THIS FUNCTION WORKS.
    // Board -> [Int, Int] 
    // (get the i j coordinates for the first empty square)
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null) {
                return [i, j]
            }
        }
    }
}

// ______TESTS______ //
// console.log(nextBoards(bd3))
// console.log(findEmptySquare(bd3))
// ______TESTS______ //

function keepOnlyValid(boards){
    // THIS FUNCTION WORKS.
    // List[Board] -> List[Board]
    // filters out all of the invalid boards from the list
    var res = []
    for (var i = 0; i < boards.length; i++){
        if (validBoard(boards[i])){
            res.push(boards[i])
        }
    }
    return res
}

// ______TESTS______ //
// console.log(keepOnlyValid([bd1, bd2, bd3]))
// ______TESTS______ //


function validBoard(board){
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // checks to see if given board is valid
    return rowsGood(board) && columnsGood(board) && boxesGood(board)
}

function rowsGood(board){
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // makes sure there are no repeating numbers for each row
    for (var i = 0; i < 9; i++){
        var cur = []
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[i][j])){
                return false
            }
            else if (board[i][j] != null){
                cur.push(board[i][j])
            }
        }
    }
    return true
}

function columnsGood(board){
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // makes sure there are no repeating numbers for each column
    for (var i = 0; i < 9; i++){
        var cur = []
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[j][i])){
                return false
            }
            else if (board[j][i] != null){
                cur.push(board[j][i])
            }
        }
    }
    return true
}


function boxesGood(board){
    // transform this everywhere to update res
    const boxCoordinates = [[0, 0], [0, 1], [0, 2],
                            [1, 0], [1, 1], [1, 2],
                            [2, 0], [2, 1], [2, 2]]
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // makes sure there are no repeating numbers for each box
    for (var y = 0; y < 9; y += 3){
        for (var x = 0; x < 9; x += 3){
            // each traversal should examine each box
            var cur = []
            for (var i = 0; i < 9; i++){
                var coordinates = [...boxCoordinates[i]]
                coordinates[0] += y
                coordinates[1] += x
                if (cur.includes(board[coordinates[0]][coordinates[1]])){
                    return false
                }
                else if (board[coordinates[0]][coordinates[1]] != null){
                    cur.push(board[coordinates[0]][coordinates[1]])
                }
            }
        }
    }
    return true
}
