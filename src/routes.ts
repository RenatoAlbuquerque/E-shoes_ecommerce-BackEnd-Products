import { Router } from "express";
import ShoeController from "./Controllers/ShoeController";

const router = Router();

router.use((req, res, next) => {
  console.log(req.method, req.url, res.statusCode);
  next();
});

router.get("/shoes", ShoeController.AllShoes);
router.post("/shoes/brand", ShoeController.ShoesByBrand);
router.get("/shoe/:id", ShoeController.ShoeById);
router.post("/shoe", ShoeController.create);
router.put("/shoe/:id", ShoeController.update);
router.delete("/shoe/:id", ShoeController.delete);

export default router;
