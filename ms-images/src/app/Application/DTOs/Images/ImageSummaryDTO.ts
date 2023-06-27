import BaseDTO from "../BaseDTO";

interface Status 
{
    isProcessing: boolean,
    isConverted: boolean,
    isFailed: boolean,
}

interface Links
{
    details: string
}

export default class ImageSummaryDTO extends BaseDTO
{
    public links: Links;

    constructor(
        public readonly id: number,
        public readonly uuid: string,
        public readonly status: Status,
    ) {
        super();

        this.links = {
            details: `/images/${this.uuid}`
        };
    }
}