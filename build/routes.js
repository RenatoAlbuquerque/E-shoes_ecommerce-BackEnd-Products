"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ShoeController_1 = __importDefault(require("./Controllerss/ShoeController"));
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    console.log(req.method, req.url, res.statusCode);
    next();
});
router.get("/shoes", ShoeController_1.default.AllShoes);
router.post("/shoes/brand", ShoeController_1.default.ShoesByBrand);
router.get("/shoe/:id", ShoeController_1.default.ShoeById);
router.post("/shoe", ShoeController_1.default.create);
router.put("/shoe/:id", ShoeController_1.default.update);
router.delete("/shoe/:id", ShoeController_1.default.delete);
exports.default = router;
