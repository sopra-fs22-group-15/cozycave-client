# CozyCave.ch Client
## Introduction

Cozy Cave is designed to provide a platform for people looking for a place to live, to connect with landlords and shared accommodations that are looking for prospective tenants. Those looking for tenants will be able to create new listings, and students can apply to these listings with the details they have in their profile - this only takes a single click. In turn, the landlords can see at a glance who applied to one of their listing, view their profile, and can accept or deny them - in both cases, the student is notified about the decision. 

Especially intuitive is the way that students get automatically identified through their email address by the system, which then ensures that only students can apply to properties. Furthermore, the real-time collaborative feature allows students to connect with each other and exchange contact details, for example to look for accomodation together, or just as a way to find like-minded people to form a new flatshare with.

With the unique filtering, students can find the properties they’re interested in. - e.g. if someone wants to live in a house with only other people of the same gender, Cozy Cave got the student covered through its filtering mechanism.

Last but not least, external APIs are used to display the location of listings on a map for the user, and also calculate travel times from the user's important addresses (e.g. work address) to the listing's location, which is very convenient to avoid repetitive Google Maps searches when browsing through listings.

## Technologies used (Front-end)
* [React.js](https://reactjs.org/)
* [Bootstrap](https://getbootstrap.com/)
* [React-Bootstrap](https://react-bootstrap.github.io/)
* [geo.admin.ch](https://api3.geo.admin.ch/) (Map view API) 
* [transport.opendata.ch](https://transport.opendata.ch/docs.html) (Travel timings API)

## High-level components
### Results page
Essentially the most important page of the client - this displays either all the listings currently published on the server, or, if a search criteria is used through the Navbar, listings that match the selected parameters. Clicking on any single listing takes the user to the listing overview page
### Listing overview page
This page provides detailed information about a specific listing - picture, location, rent and deposit, special requirements (applicant gender), as well as map view of the listing's location and a calculated time to the user's addresses.<br><br> 
There is also the option to send an application to the listing's owner (in which case they will be notified and be able to view your application through the Profile page)

### Profile page
The profile page of a user provides not only a way to see/edit your information, but also access to the tabs MyApplications and MyListings - MyApplications displays all of the listings you applied to, together with the status of your application (pending, accepted or denied).<br><br>
MyListings displays a list of all the listings you created, each with a list of people that applied to them, along with the options to accept an individual applicant (in which case the other applicants are automatically denied) or deny the applicant (in which case other applications remain open).
### Navbar
The Navbar component at the top is visible on any page, and provides search and navigation functionality - in terms of searching, users can either type in keywords in the search bar, or use the sortings and filters available to modify the listings displayed. <br><br>
In terms of navigation functionality, the Navbar allows the user to go to the Results page by clicking on the CozyCave logo on the far left, go to the GatherTogether page by clicking on the GatherTogether button, or view the profile functionality by clicking on the profile icon on the far right.

### GatherTogether page
This page implements the real-time collaborative feature of the project using websockets- a way for students to connect with other students and exchange contact details.<br><br>
It interacts with the profile page and displays a limited view of the user data (name, biography, but no contact details) on the real-time list. Other users have the option of clicking "Request details" to send a request to the user, which will show up as a prompt that can be accepted or denied.
In either case, the user who sent the request will be notified, either with a form displaying the user details, or a small notification that the request was denied. <br><br>
Disconnecting from the service will remove the user from everyone else's list. 

## Launch&Deployment
`npm` is required for working with the application. If not installed, follow these [instructions](https://phoenixnap.com/kb/install-node-js-npm-on-windows). <br><br>
Use `npm run start` to run the application locally. In the project directory, make sure that `const devUrl` in `src/helpers/getDomain.js` is set to `http://localhost:8080/v1`. <br><br>
If you wish to test the local front-end version with the real server, you can set it to `https://sopra-fs22-group-15-server.herokuapp.com/v1`.<br><br>
**Note: The front-end depends on having a running server and database - refer to the server repository instructions for running these.**

## Illustrations

## Roadmap
### EXTENDED TRAVEL DIRECTIONS

Currently, only travel times are calculated - how long a person would need to arrive at the listing's location. However, the actual API used (transport.opendata.ch) calculates the entire travel path, including trains/buses and stops. These could be incorporated into an extended view of the listing.

### IMPLEMENTATION OF A BUSINESS MODELL

For our customers (e.g Universities), which could need to make a revenue through Cozy Cave to offset maintenance costs, we need to design and implement a business model. For instance, the easiest and most simple way would be to display commercials next to the AD of our listings. A more advanced and unethical way is to sell the profile data and search preferences of our customers to third parties (e.g. what a customer would be willing to pay for a flat, where the student is looking for accomodation etc.).

# Authors and acknowledgment

[David Coita](https://github.com/davidcoita), [Lukas Herz](https://github.com/lukasherz),  [Slava-Berasneu](https://github.com/Slava-Berasneu), [Matthias Imhof](https://github.com/matthias-imhof)

# License

The project license can be seen in the [LICENSE.md](LICENSE.md) file.