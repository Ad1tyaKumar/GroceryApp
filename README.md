
# GroceryApp

This is a full fledged Grocery App created using React-Native, MongoDB, ExpressJs and NodeJS also used libraries like Redux.


User authentication was implemented by storing JWT token in AsyncStorage which will expire after 7 days and used FireBase for mobile OTP verification. 

Email is optional for login as we are using their phone number to login.

Users can add products to their cart and place orders.

Implemented review system to add , remove or update reviews on a product.

To run this project on your local machine

Fork this repo

Clone the repo into your local environment 

Run the following command

Open terminal

Navigate to server folder and run

npm i

Add config.env into config folder inside the server.

Setup the variables in the config.env file.

PORT=

JWT_SECRET=

JWT_EXPIRE=

MONGO_URI=

CLOUDINARY_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

FRONT_END_URL=


PORT - Add a port on which you want your server to run

JWT_SECRET_KEY - This variable should contain your 256-bit encryption key for issuing and signing payload using JSON web token

MONGO_URI - This variable should contain the connection string to your mongo database.

JWT_EXPIRE - This defines the validity of the token issued

Get there from your cloudinary account

CLOUDINARY_NAME- 

CLOUDINARY_API_KEY-

CLOUDINARY_API_SECRET-

nodemon server.js

This will start your server

Now Open a new terminal 
Navigate to client folder and add backEndURL(on which server is running) in the host.js
file.

npx expo install

npm start

Connect your phone with the same internet connection and scan the QR code with Expo Go App available on playstore.
This will open the app on your android phone.
