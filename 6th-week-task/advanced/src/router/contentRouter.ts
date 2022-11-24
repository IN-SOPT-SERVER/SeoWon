import express, { Router } from 'express';
import { contentControll } from '../controller';

const router: Router = express.Router();

//* 전체 content 조회 ( GET api/content )
router.get("/", contentControll.getAllContents);

//* content 조회 GET api/content/:contentID
router.get('/:contentID', contentControll.getContent);

//* liked content 생성 POST api/content/like/:userID
router.post("/like/:userID", contentControll.createLikedContent);

//* liked content 조회 GET api/content/like/:userID
router.get("/like/:userID", contentControll.getLikedContent);

//* liked content 삭제 DELETE api/content/like/:likedContentID
router.delete("/like/:likedContentID", contentControll.deleteLikedContent);

export default router;