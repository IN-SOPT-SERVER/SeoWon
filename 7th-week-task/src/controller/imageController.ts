import { Request, Response } from "express";
import { rm } from "../constants";
import { sc } from "../constants";
import { success, fail } from "../constants/response";
import { imageService } from "../service";

//* Image 업로드 API
const uploadImage = async (req: Request, res: Response) => {
    const image : Express.MulterS3.File = req.file as Express.MulterS3.File;
    const { location } = image; // image에서 위치만 가져오기 (객체 URL)

    if (!location){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_IMAGE))
    }

    const data = await imageService.uploadImage(location);

    if (!data){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.CREATE_IMAGE_FAIL))
    }

    return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_IMAGE_SUCCESS, data));

};

const imageController = {
    uploadImage,
}

export default imageController;