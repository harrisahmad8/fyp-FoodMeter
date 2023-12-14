import React from "react";
import {
    Box,
    FooterContainer,
    Row,
    Column,
    FooterLink,
    Heading,
} from "./FooterStyles";
 
export const Footer = () => {
    return (
        <Box className="w-full">
            <h1
                style={{
                    color: "green",
                    textAlign: "center",
                    // marginTop: "10px",
                    marginBottom: "15px"
                }}
            >
                A Resturant Review Portal For Food Lovers!
            </h1>
            <FooterContainer>
                <Row>
                <Column>
                        <Heading>About Us</Heading>
                        <FooterLink href="/">
                            Home
                        </FooterLink>
                        <FooterLink href="NewBooking">
                            Bookings
                        </FooterLink>
                        <FooterLink href="favorites">
                            Favorites
                        </FooterLink>
                    </Column>
                    <Column>
                        <Heading>About Us</Heading>
                        <FooterLink href="/profile">
                            Profile
                        </FooterLink>
                        <FooterLink href="#">
                            Vision
                        </FooterLink>
                        <FooterLink href="#">
                            Testimonials
                        </FooterLink>
                    </Column>
                    
                    <Column>
                        <Heading>Contact Us</Heading>
                        <FooterLink href="#">
                            +92-304-5678000
                        </FooterLink>
                        <FooterLink href="#">
                        +92-304-5182980
                        </FooterLink>
                        
                        <FooterLink href="#">
                            Foodmeter@gmail.com
                        </FooterLink>
                    </Column>
                    <Column>
                        <Heading>Social Media</Heading>
                        <FooterLink href="#">
                            <i className="fab fa-facebook-f">
                                <span
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    Facebook
                                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <i className="fab fa-instagram">
                                <span
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    Instagram
                                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <i className="fab fa-twitter">
                                <span
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    Twitter
                                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <i className="fab fa-youtube">
                                <span
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    Youtube
                                </span>
                            </i>
                        </FooterLink>
                    </Column>
                </Row>
                <div className="bg-white rounded-sm mt-4" >
                <p class="text-sm">&copy; 2023 Food Meter. All rights reserved. | Designed by Hamid & Haris</p>
                </div>
            </FooterContainer>
        </Box>
    );
};
