var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	if(SudokuSolver(board,9)){
        console.log(board);
        FillBoard(board);
    }
};

function isvalid(board,i,j,num,n){
    for(let x=0;x<n;x++){
        if(board[x][j]==num || board[i][x]==num)
            return false;
    }
    let smi=Math.floor(i/3)*3;
    let smj=Math.floor(j/3)*3;
    for(let x=0;x<3;x++){
        for(let y=0;y<3;y++){
            if(board[x+smi][y+smj]==num)
                return false;
        }
    }
    return true;
}
function SudokuSolver(board,n) {
    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            if(board[i][j]==0){
                for(let pos=1;pos<=9;pos++){
                    if(isvalid(board,i,j,pos,n)){
                        board[i][j]=pos;
                        let subans=SudokuSolver(board,n);
                        if(subans)
                            return true;
                        board[i][j]=0
                    }
                }
                return false;
            }
        }
    }
    return true;
}

