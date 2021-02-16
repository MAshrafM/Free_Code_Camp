from samples import code, hp, hunger_games, zombie
import random

if __name__ == "__main__":
    m = random.choice([code, hp, hunger_games, zombie])
    m.madlib()