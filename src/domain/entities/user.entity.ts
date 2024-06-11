export class User {
    constructor(
        public id: string,
        public nombre: string,
        public email: string,
        public password: string,
        public rol: string[],
        public img?: string
    ) {}
}