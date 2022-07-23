import { createPostSchema, getPostSchema } from "../../schema/post.schema";
import { createRouter } from "../createRouter";
import * as trpc from '@trpc/server'

export const postRouter = createRouter().mutation('create', {
  input: createPostSchema,
  async resolve({ ctx, input }){
    if(!ctx.user){
      return new trpc.TRPCError({
        code: 'FORBIDDEN',
        message: 'Can not crate a post while logged out'
      })
    }

    const post = await ctx.prisma.post.create({
      data: {
        ...input,
        user: {
          connect: {
            id: ctx.user.id
          }
        }
      }
    })

    return post
  }
}).query('posts',{
  resolve({ ctx }){
    return ctx.prisma.post.findMany()
  }
})
.query('post',{
  input: getPostSchema,
  async resolve({ ctx, input }){
    return ctx.prisma.post.findUniqe({
      where: {
        id: input.postId
      }
    })
  }
})