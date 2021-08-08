import http from 'http';
import express from 'express';

//*Configs
import config from "../../config/config";
import logging from '../../config/logging';

const NAMESPACE = "ClientApi";
const router = express();

//*Controllers
import MouseKeyBoardCommands from "../routes/Mouse-KeyBoard-Commands/Mouse-KeyBoard-Commands"

//* Parse the Request
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

//* Rules of Api
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method == "OPTIONS") {
    res.header("Acces-Control-Allow-Methods", "GET POST PATCH DELETE PUT");
    return res.status(200).json({});
  }
  next();
})

//*Routes
router.use("/api/mouse-keyboard/", MouseKeyBoardCommands);


//* Error Handleling
router.use((req, res, next) => {

  const error = new Error('not found');

  return res.status(404).json({
    message: error.message,
  });
});

//* Create The Api
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
  logging.info(NAMESPACE, `Api runing on: ${config.server.hostname}:${config.server.port}`);
})