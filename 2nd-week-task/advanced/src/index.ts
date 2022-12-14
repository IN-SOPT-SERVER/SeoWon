import express, { application, NextFunction, Request, Response } from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname + '/templates'));
app.use("/api", require("./api"));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.render(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`
          #############################################
              π‘οΈ Server listening on port: ${PORT} π‘οΈ
          #############################################
      `);
  }); // 3000 λ² ν¬νΈμμ μλ²λ₯Ό μ€ννκ² λ€!