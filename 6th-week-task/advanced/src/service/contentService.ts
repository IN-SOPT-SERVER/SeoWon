import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//* 전체 content 조회
const getAllContents = async () => {
  const data = await prisma.content.findMany();
  return data;
};
 
//* content 조회
const getContent = async (contentId: number, episode: number) => {

  let data = await prisma.content.findMany({
    where: {
      id: contentId,
    },
  })

  if (episode){
    data = await prisma.content.findMany({
      where: {
        id: contentId,
      },
      include: {
        Episode: {
          where: {
            episodeID: episode,
          },
        },
      },
  },
  )}

  return data;
};

//* liked content 생성

const createLikedContent = async (userID: number, contentID: number) => {
  const data = await prisma.likedContent.create({
    data: {
      userID,
      contentID,
    },
  });
  return data;
};

//* liked content 조회

const getLikedContents = async (userID: number) => {
  const data = await prisma.likedContent.findMany({
    where: {
      userID,
    },
    select: {
      Content: true,
    },
  });
  return data;
};

//* liked content 삭제
const deleteLikedContent = async (likedContentId: number) => {
  const data = await prisma.likedContent.delete({
    where: { id: likedContentId },
  });
  return data;
};


export default{
    getAllContents,
    getContent,
    createLikedContent,
    getLikedContents,
    deleteLikedContent
};
