import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs';


const MAX_FREE_COUNTS = 5;

export const increaseApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return;
    }

    const userApiLimit = await prismadb.userAPILimit.findUnique({
        where: {
            userId
        }
    });

    if (userApiLimit) {
        await prismadb.userAPILimit.update({
            where: {
                userId: userId,
            },
            data: {
                count: userApiLimit.count + 1 // Increment the count correctly
            }
        });
    } else {
        await prismadb.userAPILimit.create({
            data: { userId: userId, count: 1 }
        });
    }
};

export const checkApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    const userApiLimit = await prismadb.userAPILimit.findUnique({
        where: { userId: userId }
    });

    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
        return true;
    } else {
        return false;
    }
};

export const getUserApiLimit = async ()=>{
    const { userId } = auth()

    if(!userId){
        return 0;
    }

    const userApiLimit = await prismadb.userAPILimit.findUnique({
        where:{userId}
    });

    if(!userApiLimit){
        return 0;
    }


    return userApiLimit.count;
}