import React from "react";

const Footer = () => {
    return (
        <footer class="bg-dark text-white mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h5>About Us</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
        </div>
        <div class="col-md-4">
          <h5>Quick Links</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white">Home</a></li>
            <li><a href="#" class="text-white">About</a></li>
            <li><a href="#" class="text-white">Services</a></li>
            <li><a href="#" class="text-white">Contact</a></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Contact Us</h5>
          <ul class="list-unstyled">
            <li><a href="mailto:info@example.com" class="text-white">info@example.com</a></li>
            <li><a href="tel:+1234567890" class="text-white">+123 456 7890</a></li>
            <li><a href="#" class="text-white">1234 Street Name, City, Country</a></li>
          </ul>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col text-center">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
    )
}

export default Footer;