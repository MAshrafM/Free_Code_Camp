import random
from words import words
import string

def get_valid_word(words):
    # random choose from the list
    word = random.choice(words)
    while '-' in word or ' ' in word:
        word = random.choice(words)

    return word

def hangman():
    word = get_valid_word(words).upper()
    #letters in the word
    word_letters = set(word)
    # all letters upercase
    alphabet = set(string.ascii_uppercase)
    # keep used letters
    used_letters = set()

    while len(word_letters) > 0:
        #letters used
        print("You have used these letters: ", ' '.join(used_letters))
        #show current state
        word_list = [letter if letter in used_letters else '-' for letter in word]
        print("Current word: ", ' '.join(word_list))
        # get user input
        user_letter = input("Guess a letter: ").upper()
        if user_letter in alphabet - used_letters:
            used_letters.add(user_letter)
            if user_letter in word_letters:
                word_letters.remove(user_letter)
        elif user_letter in used_letters:
            print("You have alreadu used that character, Please try again.")
        else:
            print("Invalid character. Please try again")

hangman()