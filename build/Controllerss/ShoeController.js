"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShoeModel_1 = __importDefault(require("../models/ShoeModel"));
const ShoeController = {
    AllShoes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let shoes = yield ShoeModel_1.default.find();
            return res.json(shoes);
        });
    },
    ShoesByBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { brand } = req.body;
            let shoes = yield ShoeModel_1.default.find({ brand: `${brand}` });
            return res.json(shoes);
        });
    },
    ShoeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let shoe = yield ShoeModel_1.default.findById(id);
            return res.json(shoe);
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { model, brand, urlImage, price } = req.body;
            const modelExist = yield ShoeModel_1.default.findOne({ model: `${model}` });
            if (!modelExist) {
                yield ShoeModel_1.default.create({ model, brand, urlImage, price })
                    .then((data) => {
                    return res.json(data);
                })
                    .catch((error) => {
                    return res.status(400).json(error);
                });
            }
            return res.status(400).json({ message: "Modelo já cadastrado no sistema" });
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { model, brand, urlImage, price } = req.body;
            const modelExist = yield ShoeModel_1.default.findOne({ model: `${model}` });
            if (!modelExist) {
                yield ShoeModel_1.default.findByIdAndUpdate(id, {
                    model: model,
                    brand: brand,
                    urlImage: urlImage,
                    price: price,
                })
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    const shoeUpdate = yield ShoeModel_1.default.findById(id);
                    return res.json(shoeUpdate);
                }))
                    .catch((error) => {
                    return res.status(400).json(error.original);
                });
            }
            return res.status(500).json({ message: "Modelo já cadastrado no sistema" });
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield ShoeModel_1.default.findByIdAndDelete(id)
                .then((data) => {
                return res.json({ message: `${id} exluido com sucesso!` });
            })
                .catch((error) => {
                return res.status(400).json(error);
            });
            return res.status(500);
        });
    },
};
exports.default = ShoeController;
