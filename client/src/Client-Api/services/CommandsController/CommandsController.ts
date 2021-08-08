import { Request, Response, NextFunction } from 'express';
import logging from "../../../config/logging";
import { spawn } from 'child_process';

const NAMESPACE = 'CommandsControllerService';

//*It loads the commands to be executed in order
const CommandLoadder = (req: Request, res: Response, next: NextFunction) => {
  let CommandList = JSON.parse(req.body.commands);

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
    case "":
      break
  }

};

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