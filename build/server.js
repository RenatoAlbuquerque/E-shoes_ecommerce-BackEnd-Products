"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cors_1.default)({ origin: "http://localhost:${process.env.PORT}", credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(routes_1.default);
mongoose_1.default
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}/?retryWrites=true&w=majority`)
    .then((data) => {
    console.log("MongoDB Connection Succeeded", data.version);
})
    .catch((err) => {
    console.log("Error in DB connection:", err.message);
});
app.listen(process.env.PORT, () => console.log(`Server running on port http://localhost:${process.env.PORT}`));
app.get("/", (req, res) => {
    return res.send("Test completed!!");
});
