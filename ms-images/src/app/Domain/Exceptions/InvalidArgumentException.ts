export default class InvalidArgumentException extends Error
{
    private static readonly DEFAULT_MESSAGE = "Invalid argument or params.";

    constructor(message?: string | null)
    {
        super(message ?? InvalidArgumentException.DEFAULT_MESSAGE);
    }
}
