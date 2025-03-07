// import {z } from "zod";
// export const RoleSchema=z.object({
// id:z.number(),
// name:z.string(),
// description:z.string(),
// })
// export type RoleType=z.infer<typeof RoleSchema>

export type Role = {
  id: number;
  name: string;
  description: string;
};
