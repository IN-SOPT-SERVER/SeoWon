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
              🛡️ Server listening on port: ${PORT} 🛡️
          #############################################
      `);
}); // 8000 번 포트에서 서버를 실행하겠다!
//# sourceMappingURL=index.js.map