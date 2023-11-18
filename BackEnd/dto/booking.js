class BookingDTO{
    constructor(booking){
        this.restaurant=booking.restaurant.name;
        this.name=booking.name;
        this.date=booking.date;
        this.time=booking.time;
        this.guest=booking.guest;
        this.number=booking.number;
    }
}
module.exports=BookingDTO;