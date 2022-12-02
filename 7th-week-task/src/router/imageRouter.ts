import { Router } from "express";
import { imageController } from "../controller";
import { upload } from "../middlewares";

const router: Router = Router();

// single : field name (어떤 필드에 저장을 해줄 지)
// File 이라는 필드에 이미지를 넘겨줄 것이다
router.post('/', upload.single('file') , imageController.uploadImage);

export default router;