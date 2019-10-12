WhitePanda Backend Test
submitted by
    - rohanluthra14@gmail.com
    - 9958630456

// Heroku hosted server
link - https://whitepanda-test.herokuapp.com

// Documentation and API testing using swagger
link - https://whitepanda-test.herokuapp.com/docs

// Flow
1. Car 
    1. CRUD Car
    2. Get cars.
    3. Get available cars with query.
2. User 
    1. Register User
    2. Login User - get userJWT
    3. Book a car ( present date will be the issued_date )
    4. Close a booking ( present date will be the return_date and cost = daysRented * car_rent_per_day)
3. Get Bookings

some Added Algo added- 
1. Car cannot be booked if its already booked.
2. Cannot close booking if its already finished.
3. User can only access their booking.
4. Cost of booking will be assigned once the booking is closed, until then its 0 by default.


// To run on local machine
1. install nodejs and mongodb
2. clone repo
3. npm i
4. npm run dev
5. http://localhost:3000/docs
6. user local host server for playing wiht the app.
7. GOOD TO GO :D