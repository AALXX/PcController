import pyautogui
import sys
import json

del sys.argv[0]
jsonString = json.loads(sys.argv[0])


#TODO:FIND A BETTER SOLUTION FOR HOTKEYS
for i in jsonString:
        pyautogui.keyDown(i)

for i in jsonString:
        pyautogui.keyUp(i)
