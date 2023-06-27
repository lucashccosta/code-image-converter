import BaseDTO from "../BaseDTO";

interface Status 
{
    isProcessing: boolean,
    isConverted: boolean,
    isFailed: boolean,
}

interface Dates
{
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string,
}

interface Files
{
    uploaded: string,
    converted: string
}

export default class ImageDetailDTO extends BaseDTO
{
    constructor(
        public readonly id: number,
        public readonly uuid: string,
        public readonly status: Status,
        public readonly files: Files,
        public readonly dates: Dates
    ) {
        super();
    }
}