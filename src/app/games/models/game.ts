export interface Game {
    pk:string;
    sk:string;
    location:string;
    date:Date;
    title:string;
    description:string;
    eventType:GameType;
    maxPlayers:number;
    minPlayers:number;
    playersCount:number;
    price:number;
    owner:string;
}

export enum GameType {
    Football,
    Voleyball,
    Tenis,
    TableTenis,
    Badminton,
    Basketball
}
