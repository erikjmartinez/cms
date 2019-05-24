export class Document {

    constructor(
        public documentId: number,
        public name: string,
        public description: string,
        public url: string,
        public children: Document[]) {

    }
}