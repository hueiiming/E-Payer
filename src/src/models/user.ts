export class User {
  
    photoURL: string;
    public id: string;
    constructor(
        public username?: string,
        public email?: string,
        public moneyBalance?: string,
        public password?: string,
        public loggedIn?: boolean,
        public amount?: string,
        public message?: string,
        public readMessage?: boolean
    ) { }
}