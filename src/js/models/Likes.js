export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, image) {
        const like = { id, title, author, image };
        this.likes.push(like);
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id == id);
        this.likes.splice(index, 1);
    }

    isLiked(id) {
        const index = this.likes.findIndex(el => el.id === id);
        if (index === -1)
            return false;
        return true;
    }

    getNumLikes() {
        return this.likes.length;
    }

}