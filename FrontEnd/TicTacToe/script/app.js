$(document).ready(function(){
	makeBoard();
	globals = {};
	aiPlayer = {};
	draw = {};
	draw.insertAt = function(indx, symbol) {
		var cell = $('.cell');
		var targetCell = $(cell[indx]);

		if(!targetCell.hasClass('occupied')) {
			targetCell.html(symbol);
			targetCell.css({
				color : symbol == "X" ? "green" : "red"
			});
			targetCell.addClass('occupied');
		}
	}
	
	$(".startGame").on("click", function(){
		if(typeof globals.game === "undefined"){
			play();
		}	
		else{
			clear();
			play();
		}
	});
	
	$(".cell").each(function() {
		
		$(this).bind({
			mouseover: function(){
				$(this).css({"background-color": "red"});
			},
			mouseout: function(){
				$(this).css({"background-color":"#dadada"});
			},
			click: function(){
				if(typeof globals.game === "undefined"){
				   play();
				}
				if(globals.game.status === "running" && globals.game.currentState.turn === "X" && !$(this).hasClass('occupied')) {
					var indx = parseInt($(this).data("indx"));
					var next = new State(globals.game.currentState);
					next.board[indx] = "X";
					draw.insertAt(indx, "X");
					next.advanceTurn();
					globals.game.advanceTo(next);
				}

			}
		});
	});

	function makeBoard(){
		var html = "";
		$("#board").empty();
		var idx = 0;
		for(var i = 0; i < 3; i++){
			html += "<div class='row'><div class='cell col-xs-3' data-indx='"+idx+"'></div>";
			idx++;
			for(var j=0; j<2; j++){
				html += "<div class='cell col-xs-3' data-indx='"+idx+"'></div>";
				idx++;
			}
			html += "</div>"
		}
		$("#board").html(html);
	}
	
	var AIAction = function(pos) {
		this.movePosition = pos;
		this.minimaxVal = 0;
		this.applyTo = function(state) {
			var next = new State(state);
			next.board[this.movePosition] = state.turn;
			if(state.turn === "O")
				next.oMovesCount++;
			next.advanceTurn();
			return next;
		}
	};

	AIAction.ASCENDING = function(firstAction, secondAction) {
		if(firstAction.minimaxVal < secondAction.minimaxVal)
			return -1;
		else if(firstAction.minimaxVal > secondAction.minimaxVal)
			return 1;
		else
			return 0;
	}

	AIAction.DESCENDING = function(firstAction, secondAction) {
		if(firstAction.minimaxVal > secondAction.minimaxVal)
			return -1; 
		else if(firstAction.minimaxVal < secondAction.minimaxVal)
			return 1; 
		else
			return 0;
	}

	var AI = function(level) {

		var levelOfIntelligence = level;
		var game = {};

		function minimaxValue(state) {
			if(state.isTerminal()) {
				return Game.score(state);
			}
			else {
				var stateScore; 
				if(state.turn === "X"){
					stateScore = -1000;
				}
				else{
					stateScore = 1000;
				}

				var availablePositions = state.emptyCells();

				var availableNextStates = availablePositions.map(function(pos) {
					var action = new AIAction(pos);
					var nextState = action.applyTo(state);
					return nextState;
				});

				availableNextStates.forEach(function(nextState) {
					var nextScore = minimaxValue(nextState);
					if(state.turn === "X") {
						if(nextScore > stateScore)
							stateScore = nextScore;
					}
					else {
						if(nextScore < stateScore){
							stateScore = nextScore;
						}
					}
				});
				return stateScore;
			}
		}

		function takeAMasterMove(turn) {
			var available = game.currentState.emptyCells();

			var availableActions = available.map(function(pos) {
				var action =  new AIAction(pos); 
				var next = action.applyTo(game.currentState); 
				action.minimaxVal = minimaxValue(next); 
				return action;
			});

			if(turn === "X"){
				availableActions.sort(AIAction.DESCENDING);
			}
			else{
				availableActions.sort(AIAction.ASCENDING);
			}


			var chosenAction = availableActions[0];
			var next = chosenAction.applyTo(game.currentState);

			draw.insertAt(chosenAction.movePosition, turn);

			game.advanceTo(next);
		}


		this.plays = function(_game){
        game = _game;
    };

		this.switchTo = function(turn) {
		takeAMasterMove(turn);
    };
	};

	var State = function(old) {
		this.turn = "";
		this.oMovesCount = 0;
		this.result = "still running";
		this.board = [];

		if(typeof old !== "undefined") {
			var len = old.board.length;
			this.board = new Array(len);
			for(var itr = 0 ; itr < len ; itr++) {
				this.board[itr] = old.board[itr];
			}

			this.oMovesCount = old.oMovesCount;
			this.result = old.result;
			this.turn = old.turn;
		}

		this.advanceTurn = function() {
			this.turn = this.turn === "X" ? "O" : "X";
		}

		this.emptyCells = function() {
			var indxs = [];
			for(var itr = 0; itr < 9 ; itr++) {
				if(this.board[itr] === "E") {
					indxs.push(itr);
				}
			}
			return indxs;
		}

		this.isTerminal = function() {
			var B = this.board;

			for(var i = 0; i <= 6; i = i + 3) {
				if(B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
					this.result = B[i] + "-won"; 
					this.board = [];
					return true;
				}
			}

			for(var i = 0; i <= 2 ; i++) {
				if(B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
					this.result = B[i] + "-won"; 
					this.board = [];
					return true;
				}
			}

			for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
				if(B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
					this.result = B[i] + "-won"; 
					this.board = [];
					return true;
					
				}
			}

			var available = this.emptyCells();
			if(available.length == 0) {

				this.result = "draw"; 
				this.board = [];
				return true;
			}
			else {
				return false;
			}
		};

	};

	var Game = function(autoPlayer) {
		this.ai = autoPlayer;
		this.currentState = new State();
		this.currentState.board = ["E", "E", "E",
								   "E", "E", "E",
								   "E", "E", "E"];

		this.currentState.turn = "X"; 
		this.status = "beginning";
		this.advanceTo = function(_state) {
			this.currentState = _state;
			if(_state.isTerminal()) {
				this.status = "ended";

				if(_state.result === "X-won"){
					$(".msg").html("X WON");
					$('#myModal').modal('show');
				}
				else if(_state.result === "O-won"){
					$(".msg").html("O WON");
					$('#myModal').modal('show');
				}
				else{
					$(".msg").html("Draw!!");
					$('#myModal').modal('show');

				}
			}
			else {
				if(this.currentState.turn === "X") {
				}
				else {
					this.ai.switchTo("O");
				}
			}
		};


		this.start = function() {
			if(this.status = "beginning") {
				this.advanceTo(this.currentState);
				this.status = "running";
			}
		}
		

	};


	Game.score = function(_state) {
		if(_state.result === "X-won"){
			return 10 - _state.oMovesCount;
		}
		else if(_state.result === "O-won") {
			return - 10 + _state.oMovesCount;
		}
		else {
			return 0;
		}
	}

	function play(){
		aiPlayer = new AI("master");
		globals.game = new Game(aiPlayer);
		aiPlayer.plays(globals.game);
		globals.game.start();
	}
	function clear(){
		$("#myModal").modal('hide');
		$(".cell").each(function(){
			$(this).removeClass("occupied");
			$(this).html("");
		});
		aiPlayer = {};
		globals = {};
	}
	$("#ref").on("click", function(){
		clear();
	});
});