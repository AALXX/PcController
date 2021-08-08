import { Request, Response, NextFunction } from 'express';
import logging from "../../../config/logging";
const NAMESPACE = 'RightMouseClickFunc';

const RightClick = (req: Request, res: Response, next: NextFunction) => {
  console.log("cum")

  res.status(200).json({ "test": "test" });
};

export default {
  RightClick
};