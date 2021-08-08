import pyautogui
import sys

#TODO:FIND A BETTER SOLUTION FOR HOTKEYS
del sys.argv[0]


for i in sys.argv:
    pyautogui.keyDown(i)

for i in sys.argv:
    pyautogui.keyUp(i)
