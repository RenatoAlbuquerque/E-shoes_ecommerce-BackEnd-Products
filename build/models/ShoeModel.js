"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const ShoeModel = new mongoose_1.Schema({
    model: String,
    brand: String,
    urlImage: String,
    price: Number,
}, {
    timestamps: true,
});
exports.default = mongoose_2.default.model("Shoe", ShoeModel);
