import { format } from "./format";
import { type } from "./type";
import { writer } from "./writer";

export interface books{
    id: number; 
    name: string;
    type: type;
    writer: writer; 
    format: format; 
    signed: boolean;

}