"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
// app.use("/api", require("./api"));
app.get("/", (req, res, next) => {
    res.send("success");
});
app.listen(PORT, () => {
    console.log(`
          #############################################
              π‘οΈ Server listening on port: ${PORT} π‘οΈ
          #############################################
      `);
}); // 8000 λ² ν¬νΈμμ μλ²λ₯Ό μ€ννκ² λ€!
//# sourceMappingURL=index.js.map