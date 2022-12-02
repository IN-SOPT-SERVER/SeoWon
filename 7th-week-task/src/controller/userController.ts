import { UserUpdateDTO } from '../interfaces/user/UserDTO';
import { Request, Response } from "express";
import { userService } from "../service";
import { UserCreateDTO } from "../interfaces/user/UserCreateDTO";
import { UserSignInDTO } from "../interfaces/user/UserSignInDTO";
import { validationResult } from "express-validator";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import jwtHandler from "../modules/jwtHandler";

//* 유저 생성
const createUser = async (req: Request, res: Response) => {

  //? validation의 결과를 바탕으로 분기 처리
  const error = validationResult(req);
  if(!error.isEmpty()) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST))
  }
  //? 기존 비구조화 할당 방식 -> DTO의 형태
  const userCreateDto: UserCreateDTO = req.body;
  const data = await userService.createUser(userCreateDto);

  if (!data) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.SIGNUP_FAIL))
  }

  const accessToken = jwtHandler.sign(data.id);

  const result = {
    id: data.id,
    name: data.userName,
    accessToken,
  };

  return res.status(sc.CREATED).send(success(sc.CREATED, rm.SIGNUP_SUCCESS, result));
};

//* 유저 전체 조회
const getAllUser = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const data = await userService.getAllUser(Number(page), Number(limit));
  return res.status(sc.OK).send(success(sc.OK, rm.READ_ALL_USERS_SUCCESS, data));
};


//* 유저 정보 업데이트
const updateUser = async (req: Request, res: Response) => {
  const userUpdateDTO : UserUpdateDTO = req.body;
  const { userId } = req.params;

  if (!userUpdateDTO) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER))
  }

  const updateUser = await userService.updateUser(+userId, userUpdateDTO);
  return res.status(sc.OK).send(success(sc.OK, rm.UPDATE_USER_SUCCESS, updateUser));

};


//* 유저 삭제
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await userService.deleteUser(+userId);
  return res.status(sc.OK).send(success(sc.OK, rm.DELETE_USER_SUCCESS));
};

//* 유저 조회
const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const data = await userService.getUserById(+userId);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(success(sc.NOT_FOUND, rm.NO_USER));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.READ_USER_SUCCESS, data));
};

const searchUserByUserName = async (req: Request, res: Response) => {
  const { keyword, option } = req.query;
  const data = await userService.searchUserByUserName(keyword as string, option as string);

  if (!data){
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.SEARCH_USER_FAIL));
  }

  return res.status(sc.OK).send(success(sc.OK, rm.SEARCH_USER_SUCCESS, data));
};

//* 로그인
const signInUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
  }

  const userSignInDto: UserSignInDTO = req.body;

  try {
    const data = await userService.signIn(userSignInDto);

    if (!data) return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.NOT_FOUND));
    else if (data === sc.UNAUTHORIZED)
      return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.INVALID_PASSWORD));

    const accessToken = jwtHandler.sign(data);

    const result = {
      id: data,
      accessToken,
    };

    res.status(sc.OK).send(success(sc.OK, rm.SIGNUP_SUCCESS, result));
  } catch (e) {
    console.log(error);
    //? 서버 내부에서 오류 발생
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

const userController = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  signInUser,
  searchUserByUserName,
};

export default userController;
