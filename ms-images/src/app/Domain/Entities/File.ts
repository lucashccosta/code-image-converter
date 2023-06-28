export default class File
{
    constructor(
        public readonly name: string,
        public readonly size: number,
        public readonly type: string,
        public readonly extension: string,
        public readonly content: ArrayBuffer,
        public path?: string
    ) {}
}
