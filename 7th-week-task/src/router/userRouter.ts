import { Router } from "express";
import { userController } from "../controller";
import auth from "../middlewares/auth";
import { body } from "express-validator"
const router: Router = Router();

//* 유저 생성 ( POST api/user )
// router.post("/", userController.createUser);

//* 유저 생성 - POST api/user
router.post(
    "/",
    [body("name").notEmpty(), body("age").notEmpty(), body("email").notEmpty(), body("password").isLength({ min: 6 })],
    userController.createUser
  );

//* 전체 유저 조회 ( GET api/user )
router.get("/", userController.getAllUser);

//* 이름으로 유저 조회 ( GET api/user/search )
router.get("/search", userController.searchUserByUserName);

//* Id로 유저 조회 ( GET api/user/:userId )
router.get("/:userId", auth, userController.getUserById);


//* 유저 정보 업데이트 ( PATCH api/user/:userId )
router.patch("/:userId", userController.updateUser);

//* 유저 삭제 ( DELETE api/user/:userId )
router.delete("/:userId", userController.deleteUser);


//* 로그인 ( POST /user/signin)
router.post(
  "/signin",
  [
    body("email").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty(),
    body("password").isLength({ min: 6 }),
  ],
  userController.signInUser
);

export default router;
