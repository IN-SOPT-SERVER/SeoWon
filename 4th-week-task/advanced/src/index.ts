import express, { application, NextFunction, Request, Response } from 'express';
const app = express();
const PORT = 8000;

app.use(express.json());
app.use("/api", require("./router"));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("main")
});

app.listen(PORT, () => {
    console.log(`
          #############################################
              🛡️ Server listening on port: ${PORT} 🛡️
          #############################################
      `);
  }); 