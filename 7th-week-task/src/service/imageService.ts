import { ImageCreateResDTO } from '../interfaces/image/ImageCreateResDTO';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//* Image upload

const uploadImage = async (location: string): Promise<ImageCreateResDTO> => {
    const data = await prisma.image.create({
        data: {
            image: location,
        }
    })

    const result: ImageCreateResDTO = {
        id: data.id,
        image: data.image as string,
    };

    return result;
};

const imageService = {
    uploadImage,
}

export default imageService;