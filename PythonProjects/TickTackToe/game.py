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

    def empty_squares(self):
        return ' ' in self.board

    def num_empty_squares(self):
        return self.board.count(' ')

    def make_move(self, square, letter):
        # if valid make move and return true, if not false
        if self.board[square] == ' ':
            self.board[square] = letter
            return True
        return False

def play(game, x_player, o_player, print_game=True):
    if print_game:
        game.print_board_nums()

    letter = 'X' #starting letter

    while game.empty_squares():
        if letter == 'O':
            square = o_player.get_move(game)
        else:
            square = x_player.get_move(game)

        if game.make_move(square, letter):
            if print_game:
                print(letter + f'makes a move to square {square}')
                game.print_board()
                print('')

            letter = 'O' if letter == 'X' else 'X' #switch player

