
export class Comment {
    constructor(
        public _id: string,
        public post_id: string,
        public parent_id: string,
        public author_name: string,
        public content: string,
        public date_created: Date,
        public children: Array<Comment>
    ) {}
}
