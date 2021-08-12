import pyautogui
import sys

del sys.argv[0]

if(len(sys.argv) == 2 and sys.argv[0] != "" and sys.argv[1] != ""):
    pyautogui.click(int(sys.argv[0]),int(sys.argv[1]))

else:        
    pyautogui.click()

