import express, { Router } from 'express';
import { get_content } from '../controller/contentControll';

const router: Router = express.Router();

router.get('/:contentID', get_content);
module.exports = router;