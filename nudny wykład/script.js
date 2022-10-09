var state = [5,6,7,8,9,5,6,7,8];
var player = 1;
var live = 1;
var moves = 0;

function redo(){
	state = [5,6,7,8,9,5,6,7,8];
	player = 1;
	live = 1;
	moves = 0;
	redraw();
}

function placeSymbol(str){
	if (live == 0){
		redo();
		return;
		
	}
	if (str[0] == '1') {
		if (str[1] == '1'){
			if (state[0] < 5) return;
			state[0] = player;
			moves += 1;
			changeTurn();
			checkWin();
			
		}
		if (str[1] == '2'){
			if (state[1] < 5) return;
			state[1] = player;
			moves += 1;
			changeTurn();
			checkWin();
			
		}
		if (str[1] == '3'){
			if (state[2] < 5) return;
			state[2] = player;
			moves += 1;
			changeTurn();
			checkWin();
			
		}
	}
	if (str[0] == '3') {
		if (str[1] == '1'){
			
			if (state[6] < 5) return;
			state[6] = player;
			moves += 1;
			changeTurn();
			checkWin();
			
		}
		if (str[1] == '2'){
			
			if (state[7] < 5) return;
			state[7] = player;
			moves += 1;
			changeTurn();
			checkWin();
			
		}
		if (str[1] == '3'){
			
			if (state[8] < 5) return;
			state[8] = player;
			moves += 1;
			changeTurn();
			checkWin();
			
		}
	}
	if (str[0] == '2') {
		if (str[1] == '1'){
			
			if (state[3] < 5) return;
			state[3] = player;
			moves += 1;
			changeTurn();
			checkWin();
			
		}
		if (str[1] == '2'){
			
			if (state[4] < 5) return;
			state[4] = player;
			moves += 1;
			changeTurn();
			checkWin();
			
		}
		if (str[1] == '3'){
			
			if (state[5] < 5) return;
			state[5] = player;
			moves += 1;
			changeTurn();
			checkWin();
			
		}
	}
	redraw();
}

function changeTurn(){
	if (player == 1){
		player = 2;
	}
	else {
		player = 1;
	}
}

function checkWin(){
	//THE WORST WAY TO DO THIS 
	if (state[0] == state[1] & state[1] == state[2]){
		state[0] +=2;
		state[1] +=2;
		state[2] +=2;
		live = 0;
	}
	
	if (state[3] == state[4] & state[4] == state[5]){
		state[3] +=2;
		state[4] +=2;
		state[5] +=2;
		live = 0;
	}	
	
	if (state[6] == state[7] & state[7] == state[8]){
		state[6] +=2;
		state[7] +=2;
		state[8] +=2;
		live = 0;
	}
	
	if (state[0] == state[3] & state[3] == state[6]){
		state[0] +=2;
		state[3] +=2;
		state[6] +=2;
		live = 0;
	}
	if (state[1] == state[4] & state[4] == state[7]){
		state[1] +=2;
		state[4] +=2;
		state[7] +=2;
		live = 0;
	}
	if (state[2] == state[5] & state[5] == state[8]){
		state[2] +=2;
		state[5] +=2;
		state[8] +=2;
		live = 0;
	}
	if (state[0] == state[4] & state[4] == state[8]){
		state[0] +=2;
		state[4] +=2;
		state[8] +=2;
		live = 0;
	}
	if (state[2] == state[4] & state[4] == state[6]){
		state[2] +=2;
		state[4] +=2;
		state[6] +=2;
		live = 0;
	}
	if (moves == 9 && live != 0){
		redo();
	}
	
}

function redraw(){
	var i = 1;
	var j = 1;
	var index = 0;
	while (i< 4){
	j = 1;
		while (j<4){
			
		var str = "" + i + j;
		var e = document.getElementById(str);
		var symbol = state[index];
		if (symbol >= 5){
			e.style.backgroundImage = 'url("0.png")';	
		}
		if (symbol == 1){
			e.style.backgroundImage = 'url("1.png")';	
		}
		if (symbol == 2){
			e.style.backgroundImage = 'url("2.png")';	
		}
		if (symbol == 3){
			e.style.backgroundImage = 'url("3.png")';	
		}
		if (symbol == 4){
			e.style.backgroundImage = 'url("4.png")';	
		}

		
		index++;
		j++;	
		}
	i++;
	}
}



