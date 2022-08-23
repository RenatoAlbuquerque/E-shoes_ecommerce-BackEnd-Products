import { Request, Response } from "express";
import Shoe from "../models/ShoeModel";

const ShoeController = {
  async AllShoes(req: Request, res: Response): Promise<Response> {
    let shoes = await Shoe.find();

    return res.json(shoes);
  },

  async ShoesByBrand(req: Request, res: Response): Promise<Response> {
    const { brand } = req.body;

    let shoes = await Shoe.find({ brand: `${brand}` });

    return res.json(shoes);
  },

  async ShoeById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    let shoe = await Shoe.findById(id);

    return res.json(shoe);
  },

  async create(req: Request, res: Response): Promise<Response> {
    const { model, brand, urlImage, price } = req.body;
    const modelExist = await Shoe.findOne({ model: `${model}` });

    if (!modelExist) {
      await Shoe.create({ model, brand, urlImage, price })
        .then((data) => {
          return res.json(data);
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    }
    return res.status(400).json({ message: "Modelo já cadastrado no sistema" });
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { model, brand, urlImage, price } = req.body;
    const modelExist = await Shoe.findOne({ model: `${model}` });

    if (!modelExist) {
      await Shoe.findByIdAndUpdate(id, {
        model: model,
        brand: brand,
        urlImage: urlImage,
        price: price,
      })
        .then(async () => {
          const shoeUpdate = await Shoe.findById(id);
          return res.json(shoeUpdate);
        })
        .catch((error) => {
          return res.status(400).json(error.original);
        });
    }
    return res.status(500).json({ message: "Modelo já cadastrado no sistema" });
  },

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await Shoe.findByIdAndDelete(id)
      .then((data) => {
        return res.json({ message: `${id} exluido com sucesso!` });
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
    return res.status(500);
  },
};

export default ShoeController;
