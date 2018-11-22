# Team Name
Jappi

# Project Name
Foodeez

## Description
Web app to make random food orders based on preferences


## User Stories


- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the Jappi team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up (customer)** - As a customer I want to sign up on the webpage so that I can have an account
- **login** - As a user I want to be able to log in on the webpage so that I can make (customer) or attend (restaurant) an order
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **order page** - As a customer I want to create an order so that I can get random food based on my preferences
- **tracking order page** - As a customer I want to see the tracking order page so that I can know when I am going to receive it
- **edit order** - As a customer I want to edit my order so that I can update some details of it
- **order delivered page** - As a customer I want to see information of the order so that I know when my order is finished
- **sign up (restaurant)** - As a restaurant I want to sign up on the webpage so that I can have an account
- **order list page** - As a restaurant I want to see all the orders available so that I can provide sign off after the delivery
- **accept order** - As a restaurant I want to see a close order page so that I can accept a delivery
- **reject order** - As a restaurant I want to see a close order page so that I can reject a delivery
- **provide signoff to order** - As a restaurant I want to see a page so that I can request a customer to sign to accept a delivery has finished



## Backlog
- list of orders
- Profile page
- Customer can restrict order
- Add restaurants to map
- Within map radius
- Randomly select
- Location selector
- Order by my preferences
- Live tracking 
- Feedback / review
- Promocode
- Reward system
- Refer a friend
- Premium account 
- Beautify (CSS) - type form style on order
- EXPLOSION OF STARS LIT!
- Payment method
- Sign off once completed that saves signature 
- Map to look at what you might get (which are signed up in the area)
- A button to reveal what you ordered before it arrives	

For live tracking feature we should modify "preferences" in the User Model:
```
addressCordinates: {
  type: {
    type: String,
  },
  coordinates: [Number],
  }
}
```

For pre set preferences in User Profile we should add this to the User Model:
```
preferences: {
	allergies: Array:String,
	address: {
		firstLine: String, 
		secondLine: String,
		city: String, 
		postCode: Number
	},
```



## ROUTES:

### Homepage and auth routes
- GET / 
  - renders the homepage

- GET /auth/signup
  - redirects to order page / if user (customer) is logged in
  - redirects to order list page / if user (restaurant) is logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to order page / if user (customer) is logged in
  - redirects to order list page / if user (restaurant) is logged in
  - body:
    - email
    - password
  - redirects to /order if user is not logged in

- GET /auth/login
  - redirects to / if user is logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to /order if user is logged in
  - body:
    - email
    - password
  - redirects to /auth/login if user is not logged in

- POST /auth/logout
  - redirects to /auth/login if user is not logged in
  - body: (empty)
  - redirects to / if user is logged in

### Routes when the customer user is logged in:

- GET /order
  - redirects to /auth/login if user is anonymous
  - render order page with form

- POST /order 
  - redirects to /auth/login if user is anonymous
  - body: 
    - address
    - undesired cuisine
    - allergies
    - payment details
  - redirects to /order/:order_id if user is logged in

- GET /order/:order_id
  - redirects to /auth/login if user is anonymous
  - renders the tracking order page
	- redirects to /order/:order_id/delivered if user is logged in and restaurant has provided signoff

- GET /order/:order_id/delivered
	- redirects to /auth/login if user is anonymous
	- redirects to /order/:order_id if user is logged in and isDelivered is false
  - renders the order delivered page (after the restaurant signed off) with a some nice star animation
	

### Routes when the restaurant user is logged in:

- GET /orderlist
  - redirects to login / if user is anonymous
  - render page with list of orders related to that restaurant

- GET /orderlist/:order_id
  - redirects to login / if user is anonymous
  - render page with an specific order details, accept/reject, price box and a signoff buttons
- POST /orderlist/:order_id/accept
  - redirects to signup / if user is anonymous
  - body: 
    - willServe: changed to true
    - Price
	- redirects to /orderlist/:order_id if user is logged in
- POST /orderlist/:order_id/reject
  - redirects to signup / if user is anonymous
  - body: 
		- willServe: changed to false
	- redirects to /orderlist if user is logged in
- POST /orderlist/:order_id/signoff
  - redirects to signup / if user is anonymous
  - body: 
    - isCompleted: changed to true
	- redirects to /orderlist if user is logged in

## Models

User model
 
```
email: String - required - unique
password: String - required
name: String - required
isOwner: Bool - required
phoneNumber: String - required - unique
	dietaryRequirement: Array:Strings,
}
```

Order model
 
```
timestamp: Date - required
restaurantId: ObjectID - ref Restaurant - required
userId: ObjectID - ref User - required
preferences: {
	allergies: Array:String,
	address - required: {
		firstLine: String, 
		secondLine: String,
		city: String, 
		postCode: Number
	},
	dietaryRequirement: Enum,
}
undesiredFoodType: Array,
Budget: Number - required
Price: Number 
NumberOfFoodeez: Number - required
willServe: Boolean - null - required 
isCompleted: Boolean - required 
```

Restaurant model

```
name: String - required
ownerId: ObjectID - ref User - required
foodType: Enum (predefined list of values) - required
``` 

## Links

### Trello

[Link to your trello board](https://trello.com/b/Gv2V1V08/foodeez) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/poppytait/foodeez)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
