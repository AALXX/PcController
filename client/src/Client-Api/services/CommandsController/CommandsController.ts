import { Request, Response, NextFunction } from 'express';
import logging from "../../../config/logging";
import { spawn } from 'child_process';

const NAMESPACE = 'CommandsControllerService';


const CommandsReceiver = (req: Request, res: Response, next: NextFunction) => {
  CommandLoadder(req.body.commands, (erros: string[]) => {
    console.log(erros)
    if (Object.keys(erros).length !== 0) {
      return res.status(200).json({
        success: false,
        errors:erros
      });
    }

    return res.status(200).json({
      success: true,
    });
    
  })
}

//*It loads the commands to be executed in order
const CommandLoadder = (Commands: any, callBack: any) => {
  let CommandList = JSON.parse(Commands);
  let errorsArray: string[] = []
  // console.log(CommandList)
  //*TODO FIX BUG: GOES TO NEXT COMMAND AND NOT FINISHING THE CURRENT

  for (let i = 0; i < CommandList.length; i++) {
    console.log(CommandList[i]);
    //*It derermine what the command is
    switch (CommandList[i].command) {
      case "MoveMouse":
        MoveMouseFunc(CommandList[i].PosX, CommandList[i].PosY, (err: boolean) => {
          if (err) {
            // return 
            errorsArray.push("MoveMouseEvent");
          }

        });
        break;

      case "MouseClick":
        MouseClickFunc((err: boolean,finished:boolean) => {
          if (err) {
            errorsArray.push("MouseClickEvent");
          }

        }, CommandList[i].PosX, CommandList[i].PosY)
        break;

      case "HotKeysExec":
        HotKeysExecuteFunc(CommandList[i].keys, (err: boolean) => {
          if (err) {
            errorsArray.push("HotKeysExecEvent");
          }

        });
        break;

      case "KBWrite":
        KeyBoarWritingFunc(CommandList[i].sentence, (err: boolean) => {
          if (err) {
            errorsArray.push("KBWriteEvent");
          }

        }, CommandList[i].repetitions);
        break;
    }
  }
  callBack(errorsArray)

};

//*KeyBoard Commands
const HotKeysExecuteFunc = (Keys: any, callBack: any) => {
  let KeysList: any = []

  for (let i in Keys) {
    KeysList.push(Keys[i])
  }
  console.log(JSON.stringify(KeysList))

  const python = spawn('python.exe', [`./src/Scripts/Mouse-KeyBoard-Scripts/KeyBoard/HotKeyPressingScript.py`, JSON.stringify(KeysList)]);
  python.on('close', (code) => {
    if (code !== 0) {
      logging.error(NAMESPACE, `Process cloased with code ${code}`)
      return callBack(true, true);
    }

    return callBack(false, true);
  });
}

const KeyBoarWritingFunc = (Sentence: string, callBack: any, repetitions: string = "") => {

  const python = spawn('python.exe', [`./src/Scripts/Mouse-KeyBoard-Scripts/KeyBoard/KeyBoardWritingScript.py`, `${Sentence}`, `${repetitions}`]);
  python.stdout.on('data', (data) => {
    console.log(data.toString())
  })

  python.on('close', (code) => {
    if (code !== 0) {
      logging.error(NAMESPACE, `Process cloased with code ${code}`)
      return callBack(true);
    }
    return callBack(false);
  });
}

//* Mouse Commands
const MouseClickFunc = (callBack: any, PosX: string = "", PosY: string = "") => {
  const python = spawn('python.exe', [`./src/Scripts/Mouse-KeyBoard-Scripts/MOUSE/MouseClickScript.py`, `${PosX}`, `${PosY}`]);
  python.stdout.on('data', (data) => {
    console.log(data.toString())
  })

  python.on('close', (code) => {
    if (code !== 0) {
      logging.error(NAMESPACE, `Process cloased with code ${code}`)
      return callBack(true);
    }
    return callBack(false);
  });
}

const MoveMouseFunc = (PosX: number, PosY: number, callBack: any) => {
  const python = spawn('python.exe', [`./src/Scripts/Mouse-KeyBoard-Scripts/Mouse/MoveMouseScript.py`, `${PosX}`, `${PosY}`]);
  python.on('close', (code) => {
    if (code !== 0) {
      logging.error(NAMESPACE, `Process cloased with code ${code}`)
      return callBack(true);
    }

    return callBack(false);
  });
}

export default {
  CommandLoadder,
  CommandsReceiver
};