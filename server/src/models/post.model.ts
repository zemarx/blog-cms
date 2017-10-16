
export class Post {
    constructor(
        public _id: string,
        public author_name: string,
        public title: string,
        public content: string,
        public status: string,
        public last_time_edited: Date,
        public date_created: Date,
        public category: string,
        public tags: Array<any>,
        public likes: {
            count: number
        },
        public comments: {
            count: number
        },
        public views: {
            count: number
        }
    ) {}
}
