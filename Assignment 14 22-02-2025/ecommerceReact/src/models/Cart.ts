import { Product } from "./Product";

export interface ICart{
    id:number;
    userId:number;
    date:Date;
    products:Product[];
}
