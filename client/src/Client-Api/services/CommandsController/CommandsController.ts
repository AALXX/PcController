import { Request, Response, NextFunction } from 'express';
import logging from "../../../config/logging";
import { spawn } from 'child_process';

const NAMESPACE = 'CommandsControllerService';

//*It loads the commands to be executed in order
const CommandLoadder = (req: Request, res: Response, next: NextFunction) => {
  let CommandList = JSON.parse(req.body.commands);

   // console.log(CommandList[0].keys)
  
  //*It derermine what the command is
  switch (CommandList[0].command) {
    case "MoveMouse":
      MoveMouseFunc(CommandList[0].PosX, CommandList[0].PosY, (err:boolean) => {
        if (err) {
          return res.status(200).
          json({
            success: false,
          });
        }
        return res.status(200).
          json({
            success: true,
          });
        
      });
      break;
    case "MouseClick":
      
      break;
    case "HotKeysExec":

      HotKeysExecuteFunc(CommandList[0].keys, (err: boolean) => {
        
      });
      
      break;
  }

};

const HotKeysExecuteFunc = (Keys:any, callBack:any) => {
  // console.log(Keys[0])

  let KeysList:any = []

  for (let i in Keys) {
    KeysList.push(Keys[i])
  }
  console.log(JSON.stringify(KeysList))
  
  const python = spawn('python.exe', [`./src/Scripts/Mouse-KeyBoard-Scripts/KeyBoard/HotKeyPressingScript.py`,  JSON.stringify(KeysList)]);
  python.stdout.on('data', (data) => {
    console.log(data.toString())
    python.on('close', (code) => {
      if (code !== 0) {
        logging.error(NAMESPACE, `Process cloased with code ${code}`)
        return callBack(true);
      }
      
      return callBack(false);
    });
  });
}

const MouseClickFunc = (callBack: any) => {
  
}

const MoveMouseFunc = (PosX: number, PosY: number, callBack:any) => {
  const python = spawn('python.exe', [`./src/Scripts/Mouse-KeyBoard-Scripts/Mouse/MoveMouseScript.py`, `${PosX}`,`${PosY}`]);
  python.on('close', (code) => {
    if (code !== 0) {
      logging.error(NAMESPACE, `Process cloased with code ${code}`)
      return callBack(true);
    }

    return callBack(false);
  });
}

export default {
  CommandLoadder
};