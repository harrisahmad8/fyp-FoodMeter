class BookingDTO{
    constructor(booking){
        this.restaurantName=booking.restaurant.name;
        this.userName=booking.user.name
        this.name=booking.name;
        this.date=booking.date;
        this.time=booking.time;
        this.guest=booking.guest;
        this.number=booking.number;
    }
}
module.exports=BookingDTO;