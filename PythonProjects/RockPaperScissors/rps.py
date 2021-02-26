import random

def play():
    print("#------------------------------------------#")
    print("|      Welcome to Rock Paper Scissors      |")
    print("#------------------------------------------#")
    print("Choose your hand: cd ")
    user = input("'r' for Rock, 'p' for Paper, 's' for Scissors: ")
    computer = random.choice(['r', 'p', 's'])

    if user == computer:
        return "It's a tie!"
    
    if is_win(user, computer):
        return "You Won!"

    return "You Lost!"

def is_win(player, opponent):
    if (player == 'r' and opponent == 's') or (player == 's' and opponent == 'p') \
        or (player == 'p' and opponent == 'r'):
        return True

print(play())