
export class Transaction {
  
    public id: string;
    public tid: string;
    constructor(
        public date: string,
        public time: string,
        public fromUsername?: string,
        public toUsername?: string,
        public moneySent?: string,
        public notification?: boolean,
        public topupAmount?: string,
        public username?: string
        // public topupDate?: string,
        // public topupTime?: string
        
    ) { }
}