class UserDTO{
    constructor(user){
        this._id = user._id;
        this.email = user.email;
        this.name=user.name;
        this.number=user.number;
        this.role=user.role
    }
};

module.exports = UserDTO;