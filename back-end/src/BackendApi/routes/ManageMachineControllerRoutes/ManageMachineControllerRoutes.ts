import express from "express";

import AddMachineAction from "../../services/MachinesManager/AddMachine"
import GetMachineDataAction from "../../services/MachinesManager/GetMachineData"
const router = express.Router();

router.post("/add-machine/", AddMachineAction.AddMachineFunc);
router.get("/get-machine-name/", GetMachineDataAction.GetBasicMachineData);
router.get("/get-all-machine-data/:MachineToken", GetMachineDataAction.GetFullMachineData);


export = router;