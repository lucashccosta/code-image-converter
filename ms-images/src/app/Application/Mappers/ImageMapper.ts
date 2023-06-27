import Image from "App/Domain/Entities/Image";
import ImageDetailDTO from "../DTOs/Images/ImageDetailDTO";
import ImageSummaryDTO from "../DTOs/Images/ImageSummaryDTO";

export default class ImageMapper
{
    public static toDetailDTO(image: Image): ImageDetailDTO
    {
        return new ImageDetailDTO(
            image.id,
            image.uuid.toString(),
            {
                isProcessing: image.isProcessing(),
                isConverted: image.isConverted(),
                isFailed: image.isFailed()
            },
            {
                uploaded: image.uploadedFile,
                converted: image.convertedFile
            },
            {
                createdAt: image.createdAt.toUTCString(),
                updatedAt: image.updatedAt.toUTCString()
            }
        );
    }

    public static toSummaryDTO(image: Image): ImageSummaryDTO
    {
        return new ImageSummaryDTO(
            image.id,
            image.uuid.toString(),
            {
                isProcessing: image.isProcessing(),
                isConverted: image.isConverted(),
                isFailed: image.isFailed()
            }
        );
    }
}
