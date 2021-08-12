import express from "express";

import CommandController from "../../services/CommandsController/CommandsController"
const router = express.Router();

router.post("/commands/", CommandController.CommandsReceiver);


export = router;