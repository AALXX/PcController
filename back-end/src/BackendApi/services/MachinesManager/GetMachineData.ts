import { Request, Response, NextFunction } from 'express';
import logging from "../../../config/logging";
import { Connect, Query } from "../../../config/mysql";

const NAMESPACE = 'GetMachineDataAction';

const GetFullMachineData = (req: Request, res: Response, next: NextFunction) => {
  console.log("cum");
  
  logging.info(NAMESPACE, "Get Machine Data from db Service called");


  const GetMachineDataQueryString = `SELECT * FROM allmachines WHERE machineToken="${req.params.MachineToken}"`
  
  Connect()
  .then(connection => {

    Query(connection, GetMachineDataQueryString).then(results => {

      let data = JSON.parse(JSON.stringify(results));

      if (Object.keys(data).length === 0) {
        return res.status(200).json({
          error: false,
          MachineExists: false
        });
      }
        
      return res.status(200).json({
        error: false,
        MachineExists: true,
        MachineName: data[0].MachineName,
        MachineIp: data[0].MachineIp,
      });

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
  
};

const GetBasicMachineData = (req: Request, res: Response, next: NextFunction) => {

  logging.info(NAMESPACE, "Get Machine Data from db Service called");


  const GetMachineDataQueryString = `SELECT MachineName FROM allmachines`
  
  Connect()
  .then(connection => {

    Query(connection, GetMachineDataQueryString).then(results => {

      let data = JSON.parse(JSON.stringify(results));
      return res.status(200).json({
        error: false,
        MachineNames: data
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
  
};


export default {
  GetFullMachineData,
  GetBasicMachineData
};
