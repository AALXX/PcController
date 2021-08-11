import pyautogui
import sys

del sys.argv[0]
pyautogui.moveTo(int(sys.argv[0]), int(sys.argv[1]))