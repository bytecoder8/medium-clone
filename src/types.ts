// helper type to infer action types for reducers
export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ErrorsType = Record<string, Object[]>

export class ServerError extends Error {

  private _errors: ErrorsType = {}

  public get errors() : ErrorsType {
    return this._errors
  }
  
  public set errors(v : ErrorsType) {
    this._errors = v;
  }

  constructor(message?: string) {
    super(message); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export interface User {
  id: number
  email: string
  createdAt: string
  updatedAt: string
  token: string,
  username: string,
  bio: string | null,
  image: string | null
}

export interface Profile {
  username: string
  bio: string | null
  image: string | null
  following: boolean
}

export interface Article {
  author: User
  slug: string
  title: string
  body: string
  description: string
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  tagList: string[]
}

export interface ArticleFormType {
  title: string
  body: string
  description: string
  tagList: string[]
}

export interface Comment {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: Profile
}

// Server responses
export interface ArticleResponse {
  articles: Article[]
  articlesCount: number
}

// null = loading hasn't started yet
export type LoadingType = boolean | null
