import { format } from "./format";
import { type } from "./type";
import { writer } from "./writer";

export interface books{
    id: number; 
    name: string;
    typeId: type;
    writerId: writer; 
    formatId: format; 
    signed: boolean;

}