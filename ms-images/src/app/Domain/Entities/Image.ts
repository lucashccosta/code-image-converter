import { StatusEnum } from "../Enums/Images/StatusEnum";
import Status from "../ValueObjects/Status";
import Uuid from "../ValueObjects/Uuid";

export default class Image
{
    constructor(
        public readonly id: number,
        public readonly uuid: Uuid,
        public status: Status,
        public uploadedFile: string,
        public convertedFile: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}

    public isProcessing(): boolean
    {
        return this.status.toString() === StatusEnum.PROCESSING;
    }

    public isConverted(): boolean
    {
        return this.status.toString() === StatusEnum.CONVERTED;
    }

    public isFailed(): boolean
    {
        return this.status.toString() === StatusEnum.FAILED;
    }
}
