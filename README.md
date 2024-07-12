# Guest Room Booking Application

This is an MERN Application for room booking service. It provides a platform for users to book their rooms and view booking details. Admins can manage their rooms and see their booked rooms.

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

## Getting Started

#### 1. Clone the Repository
Clone the Repository by using this github link 
```bash
https://github.com/hariarasu/Guest_Room_Booking_Application
```

#### 2. Add Stripejs key 
1. create a stripejs login in stipejs
2. Generate private and secret key in test mode
3. Add secret key to backend .env file
4. Add public key to frontend .env file
 

#### 3. Go to terminal and install dependencies and start the frontend 
```bash
cd frontend
npm install
npm install stripejs
npm start
```
#### 4. Open second terminal install dependencies and start the backend server
```bash
cd backend
npm install
nodemon server.js
```
#### 5. For Admin login 
Go to login page enter
  - Gmail=`admin@gmail.com`
  - password=`admin123`

#### 6. Registration
 To be a house owner choice role as owner
 To be a user choice role as user

## Sample DB Data
Sample data are in Assest folder
connect mongodb with url mongodb://localhost:27017/G-Room
Load the json file in corresponding collection names
