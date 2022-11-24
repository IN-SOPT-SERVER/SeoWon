import { Request, Response } from "express";
import { contentService } from "../service";

//* content 전체 조회

const getAllContents = async (req: Request, res: Response) => {
    const data = await contentService.getAllContents();
    if (!data){
        return res.status(204).json({status: 200, message: "No contents available"});
    }
    return res.status(200).json({ status: 200, message: "Contents 전체 조회 성공", data });
  };

//* content 조회
const getContent = async (req: Request, res: Response) => {
    const { contentID } = req.params;
    const { episodeID } = req.query;
    const data = await contentService.getContent(+contentID, +(episodeID as string));

    if (!data){
        return res.status(404).json({status: 404, message: "Can't get content"});
    }
    
    return res.status(200).json({status: 200, message: `${data[0].contentName} 조회 성공`, data});
    
};

//* liked content 생성

const createLikedContent = async (req: Request, res: Response) => {
    const { userID } = req.params;
    const { contentID } = req.body;

    if (!userID) {
        return res.status(400).json({status:400, message: "userID do not exist"});
    }

    if (!contentID) {
        return res.status(400).json({status:400, message: "contentID missing"});
    }

    const data = await contentService.createLikedContent(+userID, +contentID);

    return res.status(200).json({status: 200, message: `liked ${contentID}`, data});
}

//* liked content 조회

const getLikedContent = async (req: Request, res: Response) => {
    const { userID } = req.params;
    const data = await contentService.getLikedContents(+userID);

    if (!data){
        return res.status(404).json({status: 404, message: "Can't get liked contents"});
    }

    return res.status(200).json({status: 200, message: `liked contents 조회 성공`, data});
    
};

//* liked content 삭제

const deleteLikedContent = async (req: Request, res: Response) => {
    const { likedContentID } = req.params;
    const data = await contentService.deleteLikedContent(+likedContentID);

    return res.status(200).json({status: 200, message: `liked contents ${likedContentID} 삭제 성공`});
    
};

export default{
    getAllContents,
    getContent,
    createLikedContent,
    getLikedContent,
    deleteLikedContent
}