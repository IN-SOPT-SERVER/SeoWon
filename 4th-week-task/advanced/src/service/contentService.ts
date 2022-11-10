const contents = require('./../data/content.json');
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//* content 조회
const getContent = async (contentId: number, episode: number) => {
  const data = await prisma.Content.findMany({
    where: {
      id: contentId,
    },
    include: {
      episode: {
        where: {
          episodeNumber: episode,
        },
      },
    },
  });
  return data;
};

//* liked content 생성

const createLikedContent = async (userId: number, contentId: number) => {
  const data = await prisma.LikedContent.create({
    data: {
      userId,
      contentId,
    },
  });
  return data;
};

//* liked content 조회

const getLikedContents = async (userId: number) => {
  const data = await prisma.LikedContent.findMany({
    where: {
      userId,
    },
    select: {
      content: true,
    },
  });
  return data;
};

//* liked content 삭제
const deleteLikedContent = async (likedContentId: number) => {
  const data = await prisma.LikedContent.delete({
    where: { id: likedContentId },
  });
  return data;
};


export default{
    getContent,
    createLikedContent,
    getLikedContents,
    deleteLikedContent
};
