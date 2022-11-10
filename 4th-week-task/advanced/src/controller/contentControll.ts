import { Request, Response } from "express";
import { getContent, getEpisode } from "../service/contentService";

const get_content = async (req: Request, res: Response) => {
    const {contentID} = req.params;
    const content = await getContent(contentID);
    
    if(!content){
        return res.status(404).json({status:404, message:`${contentID} is not a valid content`});
    }

    if (!req.query.episode){
        return res.status(200).json({status:200, message:`${content.title} 조회 성공` ,data:content});
    }
    
    const episodeID = req.query.episode.toString();
    const episode = await getEpisode(contentID, episodeID);

    if(!episode){
        return res.status(404).json({status:404, message:`${episodeID}화 is not a valid episode in ${content.title}`});
    }

    return res.status(200).json({status:200, message:`${episodeID} episode in ${content.title} 조회 성공` ,data:episode});
    
};

export {
    get_content
}