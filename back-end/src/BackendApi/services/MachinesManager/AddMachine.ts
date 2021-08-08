import { Request, Response, NextFunction } from 'express';
import logging from "../../../config/logging";
import { Connect, Query } from "../../../config/mysql";
import hat from 'hat';


const NAMESPACE = 'AddMachineAction';

const AddMachineFunc = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Add Machine To Db Service called");
  

  if (req.body.MachineIp === "" || req.body.MachineIp === undefined || req.body.MachineName === "" || req.body.MachineName === undefined) {
    return res.status(200).json({
      error: true
    });
  }

  let MachineToken = hat();

  const InsertMachineToDbQueryString = `INSERT INTO allmachines (machineToken, MachineIp, MachineName) VALUES ("${MachineToken}", "${req.body.MachineIp}", "${req.body.MachineName}")`;

  Connect()
  .then(connection => {

    Query(connection, InsertMachineToDbQueryString).then(results => {

      let data = JSON.parse(JSON.stringify(results));

      if (data.affectedRows === 0) {
        return res.status(200).json({
          error: true,
        });
      }

      return res.status(200).json({
        error: false,
      })

    }).catch(error => {
      logging.error(NAMESPACE, error.message, error);
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }).finally(() => {
      connection.end();
    });

  }).catch(error => {
      logging.error(NAMESPACE, error.message, error);
      return res.status(500).json({
        error:true,
        message: error.message,
      });
  });
}
  

export default {
  AddMachineFunc
};