import Stringable from "../Contracts/Stringable";
import InvalidArgumentException from "../Exceptions/InvalidArgumentException";

export default class Uuid implements Stringable
{
    private static readonly UUID_REGEX = "^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$";

    constructor(
        private readonly value: string
    ) {
        this.build();
    }

    public static fromString(uuid: string): Uuid
    {
        return new Uuid(uuid);
    }

    public toString(): string 
    {
        return this.value;
    }

    private build(): void
    {
        if (new RegExp(Uuid.UUID_REGEX).test(this.value)) {
            throw new InvalidArgumentException();
        }
    }
}