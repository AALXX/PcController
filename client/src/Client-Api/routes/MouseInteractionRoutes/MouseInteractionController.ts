import express from "express";

import RightClickAction from "../../services/MosueInteractions/RightClickMouse"
const router = express.Router();

router.post("/commands/", RightClickAction.RightClick);


export = router;