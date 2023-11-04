import { Type } from '@sinclair/typebox'

export type GetAllAuthorsSchema = typeof getAllAuthorsSchema
export const getAllAuthorsSchema = {
  response: {
    200: Type.Object({
      status: Type.Literal('success'),
      authors: Type.Array(
        Type.Object({
          id: Type.String(),
          username: Type.String(),
          avatar: Type.String(),
          createdAt: Type.String(),
          words: Type.Array(
            Type.Object({
              id: Type.String(),
              word: Type.String(),
              storyId: Type.String(),
              authorId: Type.String(),
              createdAt: Type.String()
            })
          )
        })
      )
    })
  }
}
