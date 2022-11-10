import { Request, Response } from "express";
import { userService } from "../service";

//* 유저 생성

const createUser = async (req: Request, res: Response) => {
  const { username, email, age } = req.body; // json data의 key와 생성할 변수명이 같을 때
  if (!username || !email || !age) {
    return res.status(400).json({ status: 400, message: "유저 생성 실패" });
  }

  const data = await userService.createUser(username, email, age);

  if (!data){
    return res.status(400).json({ status: 400, message: "유저 생성 실패" });
  }
  return res.status(200).json({ status: 200, message: "유저 생성 성공", data });
};

//* 유저 전체 조회

const getAllUser = async (req: Request, res: Response) => {
  const data = await userService.getAllUser();
  return res.status(200).json({ status: 200, message: "유저 전체 조회 성공", data });
};


//* 유저 정보 업데이트

const updateUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { userId } = req.params;
  if (!name) return res.status(400).json({ status: 400, message: "유저 정보 업데이트 실패" });

  const updateUser = await userService.updateUser(+userId, name);
  return res.status(200).json({ status: 200, message: "유저 전체 조회 성공", updateUser });

};


//* 유저 삭제

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await userService.deleteUser(+userId);
  return res.status(200).json({ status: 200, message: "유저 삭제 성공"});

};

//* 유저 조회
const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const data = await userService.getUserById(+userId);

  if (!data) {
    return res.status(404).json({ status: 404, message: "NOT_FOUND" });
  }
  return res.status(200).json({ status: 200, message: "유저 조회 성공", data });
};

const userController = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser
};

export default userController;
