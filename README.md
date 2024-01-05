# Pizzeria

Welcome to Pizzeria, a full-stack pizza ordering application. This README provides an overview of the application's features, tech stack, and how to set it up.

## Table of Contents

- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Upcoming Features](#upcoming-features)
- [Contact](#contact)

## Demo
[Pizzeria](https://pizzeria-psi.vercel.app/)

## Tech Stack

- **Frontend:**
  - NextJS
  - Tailwind CSS

- **Backend:**
  - NodeJS
  - ExpressJS
  - MongoDB

- **Authentication:**
  - Token-based login/signup
  - Passwords are hashed before storing in the database

- **Hosting:**
  - Hosted on Vercel

## Features

1. **Authentication:**
   - Users can sign up and log in securely with token-based authentication.
   - Users can sign/signup using their google account.
   - User authentication is checked for every cart request.

2. **Pizza Ordering:**
   - Pizza details are displayed on the order page.
   - Users can add pizzas to their cart.
   - The "Add to Cart" button converts to a Quantity Selector, with a maximum limit of 5 pizzas per order.

3. **Responsive Design:**
   - Components on all pages are designed with a mobile-first approach.
   - Quantity Selector on mobile screens is converted to a Quantity Dropdown.

4. **Order Summary:**
   - The cart page displays an order summary and a list of cart items.
   - **Clear Cart Button:** Conveniently remove all items from your cart with a single click using the "Clear Cart" button.
   - **Remove Item Button:** Tailor your order by removing specific items from your cart with the "X" button.
     
5. **Animation:**
   - **Skeleton Loading for Order Page:** Provides a visual placeholder during data fetching on the order page.
   - **Skeleton Loading for Cart Page:** Custom skeleton loading animation for a better loading experience on the cart page.
   - **Normal Spinner:** A spinner is displayed during general page loading.
   - Enjoy a smoother user experience with loading animations during various user actions.

6. **Account Recovery with OTP:**
   - **Forgot Password with Gmail:**
     - Initiate a secure password reset process by receiving an OTP via email.
     - Users can enter the OTP to verify their identity and proceed with resetting their password.
## Upcoming Features

I am working on bringing more features to enhance your Pizzeria experience. Here are some of the upcoming features:

1. **Custom Pizza Builder:**
   - Get creative with our upcoming custom pizza builder! Choose from a variety of toppings, crusts, and sauces to build your perfect pizza.
   
## Contact

If you have any questions, suggestions, or would like to report a bug, please feel free to contact the project maintainer:

- **Name:** Yash Shrivastava
- **Email:** [shrivastavayash10@gmail.com](shrivastavayash10@gmail.com)
- **GitHub:** [GitPal](https://github.com/YashShrivastava10)
- **LinkedIn:** [linkedin.com/in/yash-shrivastava-7980911bb/](https://www.linkedin.com/in/yash-shrivastava-7980911bb/)

I appreciate your support and welcome any feedback or contributions. Stay tuned for these exciting additions to Pizzeria!
