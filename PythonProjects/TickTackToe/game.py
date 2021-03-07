class TicTacToe:
    def __init__(self):
        #build board
        self.board = [' ' for _ in range(9)]
        self.current_winner = None # keep track of winner

    def print_board(self):
        # getting the rows
        for row in [self.board[i*3:(i+1)*3] for i in range(3)]:
            print('| ' + ' | '.join(row) + ' |')

    @staticmethod
    def print_board_nums():
        #tells what num correspond to what box
        number_board = [[str(i) for i in range(j*3, (j+1)*3 )] for j in range(3)]
        for row in number_board:
            print('| ' + ' | '.join(row) + ' |')

    def available_moves(self):
        return [i for i, spot in enumerate(self.board) if spot == ' ']