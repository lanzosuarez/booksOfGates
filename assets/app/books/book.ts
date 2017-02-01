export class Book {
    constructor(
                public bookId: Number,
                public title: string, 
                public author: string, 
                public published: string, 
                public link: string, 
                public price: string, 
                public description: string, 
                public imageUrl: string, 
                public createDate: string, 
                public updateDate: string){}
}