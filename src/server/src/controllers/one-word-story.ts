import { db } from '@droyds/core/services'
import { GetAllAuthorsSchema } from '../schemas/one-word-story.js'
import { RouteHandler } from '../types/routes.js'

export const getAllAuthors: RouteHandler<GetAllAuthorsSchema> = async (req) => {
  const chars = new Set(['!', '?', ':', ';', '-', '–', '.', ',', '.', '?', '!'])

  const authors = await db.author.findMany({
    include: {
      words: true
    }
  })

  return {
    status: 'success',
    authors: authors.map((author) => ({
      ...author,
      createdAt: author.createdAt.toISOString(),
      words: author.words
        .filter(({ word }) => !chars.has(word.trim()))
        .map((word) => ({
          ...word,
          word: word.word.trim(),
          createdAt: word.createdAt.toISOString()
        }))
    }))
  }
}
