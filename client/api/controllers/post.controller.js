import prisma from '../lib/prisma.js';
import jwt from "jsonwebtoken";
export const getPosts = async (req, res) => {
    const query = req.query;
    console.log(query);
    try {
        const posts = await prisma.post.findMany({
            where: {
                address: query.address ? { contains: query.address, mode: 'insensitive' } : undefined,
                homeType: query.homeType || undefined,
                propertyType: query.propertyType || undefined,
                price: {
                    gte: parseInt(query.minPrice) || undefined,
                    lte: parseInt(query.maxPrice) || undefined,
                },
                rooms: {
                    gte: parseInt(query.minRooms) || undefined,
                    lte: parseInt(query.maxRooms) || undefined,
                },
                size: {
                    gte: parseInt(query.minSize) || undefined,
                    lte: parseInt(query.maxSize) || undefined,
                },
            },
        });

        res.status(200).json(posts)
    } catch (error) {
        res.status(403).json({message:'Failed to get Posts'})
        console.log(error)
    }
}
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;

    if (token) {
 
      const userId = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
          if (err) resolve(null); 
          else resolve(payload.id);
        });
      });

      if (userId) {
        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId,
            },
          },
        });
       
        return res.status(200).json({ ...post, isSaved: !!saved });
      }
    }

    
    return res.status(200).json({ ...post, isSaved: false });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;
    try {
        const newPost = await prisma.post.create({
            data:{
                ...body.postData,
                userId:tokenUserId,
                postDetail:{
                    create:body.postDetail
                }
            }
        })
        res.status(200).json(newPost)
    } catch (error) {
        res.status(403).json({message: `${error}`})
        console.log(error)
    }
}
export const updatePost = async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts)
    } catch (error) {
        res.status(403).json({message: `${error}`})
        console.log(error)
    }
}
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    try {

        const post = await prisma.post.findUnique({
            where:{id}
        })
        if(post.userId !== tokenUserId){
            return res.status(403).json({message:'Not Authorized'})
        }
        await prisma.post.delete({
            where:{id}
        })

        res.status(200).json({message:'Post deleted'})
    } catch (error) {
        res.status(403).json({message: `${error}`})
        console.log(error)
    }
}