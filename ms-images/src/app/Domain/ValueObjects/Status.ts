import Stringable from "../Contracts/Stringable";
import { StatusEnum } from "../Enums/Images/StatusEnum";

export default class Status implements Stringable
{
    constructor(
        private readonly value: StatusEnum = StatusEnum.PROCESSING
    ) {
    }

    public toString(): string 
    {
        return this.value;   
    }
}