import { Request } from "express";

export type ValidatorRequest = {
  req: Request;
};

export type ParamsState = {
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | number[]
    | boolean[]
    | undefined;
};

export type ListState = {
  params?: ParamsState;
  paging: { page: number; perPage: number };
  currentUserId?: string;
};
