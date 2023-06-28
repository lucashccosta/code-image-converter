import { BaseModel, beforeCreate, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from 'uuid';

export default class Image extends BaseModel
{
    public static table = 'images';

    @column({ isPrimary: true })
    public id: number;

    @column()
    public uuid: string;

    @column()
    public status: string;

    @column({ columnName: "uploaded_file" })
    public uploadedFile: string;

    @column({ columnName: "converted_file" })
    public convertedFile: string;

    @column.dateTime({ columnName: "created_at", autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ columnName: "updated_at", autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @beforeCreate()
    public static assignUuid(image: Image) {
        image.uuid = uuidv4();
    }
}
