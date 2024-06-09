import { Type } from '@sinclair/typebox'

export type GetAllStoriesSchema = typeof getAllStoriesSchema
export const getAllStoriesSchema = {
  response: {
    200: Type.Object({
      status: Type.Literal('success'),
      stories: Type.Array(
        Type.Object({
          id: Type.String(),
          words: Type.Array(
            Type.Object({
              id: Type.String(),
              word: Type.String(),
              storyId: Type.String(),
              authorId: Type.String()
            })
          )
        })
      )
    })
  }
}

export type GetAllWordsSchema = typeof getAllWordsSchema
export const getAllWordsSchema = {
  response: {
    200: Type.Object({
      status: Type.Literal('success'),
      stories: Type.Array(
        Type.Object({
          id: Type.String(),
          authors: Type.Array(
            Type.Object({
              id: Type.String(),
              username: Type.String(),
              avatar: Type.String()
            })
          ),
          words: Type.Array(
            Type.Object({
              id: Type.String(),
              word: Type.String(),
              storyId: Type.String(),
              authorId: Type.String()
            })
          )
        })
      )
    })
  }
}

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
          words: Type.Array(
            Type.Object({
              id: Type.String(),
              word: Type.String(),
              storyId: Type.String(),
              authorId: Type.String()
            })
          )
        })
      )
    })
  }
}
