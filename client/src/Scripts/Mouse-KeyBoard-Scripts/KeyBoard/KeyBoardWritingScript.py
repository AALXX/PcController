import pyautogui
import sys
import time

del sys.argv[0]


if(len(sys.argv) == 2 and sys.argv[1] != ""):
    for i in range(0 ,int(sys.argv[1])):
        pyautogui.typewrite(sys.argv[0] + " \n", interval=0.1)
else:        
    pyautogui.typewrite(sys.argv[0], interval=0.1)

