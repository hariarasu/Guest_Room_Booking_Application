# Guest Room Booking Application

This is an MERN Application for room booking service. It provides a platform for users to book their rooms and view their bookings. Admins can manage their rooms and see their booked rooms.

## User Roles
 1. Admin: The Admin role manage their rooms like add, edit, delete rooms and view booking status of their rooms.
 2. Customer: The Customer role can add new bookings, view the status and history of their bookings.

## Features
- Authentication
- See the available room based on the date if rooms are not prebooked
- Payment using Stripe
  
### House owner:
 - View a list of all bookings
 - View details of each booking date

### Customers
 - Register for an account with email address,mobile number and password 
 - Book rooms for a particular date
 - View the status of their bookings
 - User account login/signup

## Technologies
- Reactjs
- Nodejs
- Expressjs
- MongoDB 
- Tailwind CSS
- Stripe 

## Login
- Choice the login role either customer or house owner
- Customer `Respective customer mails`
- Admin `House owner mail`

## Deployment

#### 1. Clone the Repository
Clone the Repository by using this github link 
```bash
https://github.com/hariarasu/Guest_Room_Booking_Application
```

#### 2. Go to terminal and install dependencies and start the frontend 
```bash
cd frontend
npm install
npm install stripejs
npm start
```
#### 3. Open second terminal install dependencies and start the backend server

```bash
cd backend
npm install
nodemon server.js
```

## Sample Data
Sample Data is in the Model Page
