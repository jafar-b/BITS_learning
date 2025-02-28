import { Product } from "./Product";

export interface ICart{
    id:number |null;
    userId:number |null;
    date:Date;
    products:Product[] |null;
}
