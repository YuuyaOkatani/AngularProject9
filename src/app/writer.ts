import { gender } from "./gender";
import { nationality } from "./nationality";

export interface writer{
    id: number;
    name: string;
    nationalityId: nationality;
    genderId: gender; 
    phone: number; 
    age: number; 

    
}