class CommentDTO{
    constructor(comment){
        this._id = comment._id;
        this.createdAt = comment.createdAt;
        this.content=comment.content;
        this.user=comment.user.name;
        this.rating=comment.rating;

    }
}

module.exports = CommentDTO;