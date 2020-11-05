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
