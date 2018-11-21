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
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **profile page** - As a user I want to see a profile page so that I can edit my personal details
- **order page** - As a user I want to create an order so that I can get random food based on my preferences
- **tracking order page** - As a user I want to see the tracking of the order so that I can know when I am going to receive it
- **order delivered page** - As a user I want to see know information of the order so that I can know what I had eaten
- **orders list page** - As a restaurant I want to see all the orders available so that I can provide sign off after the delivery
- **close order page** - As a restaurant I want to see a close order page so that I can sign off an specific page



## Backlog

- List of other features outside of the MVPs scope
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

Modify "preferences" from  User Model:
```
addressCordinates: {
  type: {
    type: String,
  },
  coordinates: [Number],
  }
}
```

Homepage
- ...


## ROUTES:

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
    - first name
    - email
    - password

- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - email
    - password

- POST /auth/logout
  - body: (empty)

- GET /:user_id/order
  - redirects to signup / if user is anonymous
  - create order page with form

- POST /:user_id/order/create 
  - body: 
    - address
    - undesired cuisine
    - allergies
    - payment details

- GET /:user_id/order/:order_id
  - renders the tracking order page

- GET /:user_id/order/:order_id/delivered
  - renders the order delivered page (after the restaurant signed off) with a some nice star animation

- GET /:user_id/orderlist
  - redirects to signup / if user is anonymous
  - create page with list of orders related to that restaurant

- GET /:user_id/orderlist/:order_id
  - redirects to signup / if user is anonymous
  - create page with an specific order details and a signoff section
- POST /:user_id/orderlist/:order_id/signoff
 - body: 
    - order_status: change to delivered

## Models

User model
 
```
email: String - required - unique
password: String - required
isCustomer: Bool - required
phoneNumber: String - required - unique
preferences: {
	allergies: Array,
	address: {
    firstLine: String, 
    secondLine: String,
    city: String, 
    postCode: Number
  },
	dietaryRequirement: Array,
}
```

Order model
 
```
timestamp: Date - required
restaurantId: ObjectID - ref Restaurant - required
userId: ObjectID - ref User - required
preferences: {
	allergies: Array,
	address - required: {
    firstLine: String, 
    secondLine: String,
    city: String, 
    postCode: Number
  },
	dietaryRequirement: Enum,
}
undesiredFoodType: Array,
restaurantAddress: [firstLine: , secondLine: , city: , postCode: ]
Price: Number - required
Budget: Number - required
isCompleted: Boolean 
```

Restaurant model

```
name: String - required
owner: ObjectID - ref User - required
foodType: Enum (predefined list of values ) - required
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
