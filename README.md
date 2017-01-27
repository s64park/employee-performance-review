# employee-performance-review

##Implementation: 
###Admin have authorization to
Add/remove/update/view employees

Add/update/view performance review

Assign employees to participate in another employee's performance review

###Employee have authorization to 
List of performance reviews requiring feedback

Submit feedback

##Technologies used:
Frontend: [React.js](https://facebook.github.io/react/) with [Redux](http://redux.js.org/), [react-bootstrap](https://react-bootstrap.github.io/)

Backend: [Node.js](https://nodejs.org/) with [Express.js](http://expressjs.com/)

Database: [MongoDB](https://docs.mongodb.com/)

Other tools: [babel](https://babeljs.io/), [webpack](https://webpack.github.io/)

Future unit tests: [mocha.js](https://mochajs.org/), [chai.js](http://chaijs.com/), and [enzyme.js](http://airbnb.io/enzyme/index.html)

[Live Memo](https://secret-citadel-28889.herokuapp.com) (admin username: "admin" password: "password")

##Quick test
####Clone this repo or download the .zip file, install dependencies, then npm run dev for server and npm start for client:

####"performance_review_server" 
```
    > cd performance_review_server
	> npm install
	> npm install -g nodemon
	> npm run dev
```

####"performance_review_client" (2nd terminal)
```
    > cd performance_review_client
	> npm install
	> npm start
```

####Database setup:

Option 1. 
Download [MongoDB](https://docs.mongodb.com/) and run MongoDB server such as localhost:27017

Inside employee-performance-server/server/index.js, change mongoose.connect('mongodb://dbuser:dbpassword@hostname:port/dbname'); with your setting

Option 2: [mLab](https://mlab.com/) sign up and get 500 MB free MongoDB 

Inside employee-performance-server/server/index.js, change mongoose.connect('mongodb://dbuser:dbpassword@hostname:port/dbname'); with your setting


####On browser, go to http://localhost:8080/

Now, we can't create admin through the browser as expected. 

To create sample admin, download Postman or similar app for the browser. 

In Postman, post http://localhost:8080/createAdmin => sample admin will be create

username: "admin"    /    password: "password"


###User scenarios
####Scenario 1

1. Login as admin
2. Add 3 employees
3. Update 1 employee's profile
4. Delete 1 employee
5. refresh the page to make sure if the page is same as expected
6. Click "view details" of first employee
7. Click "Performance review" to create the employee's performance review
8. On the bottom of the performance review form, click Request Feedback' box to request feedback from other employees
9. On Feedback, click "X" to reject feedback from other employees
10. Fill some of the fields in the form and save it.
11. Close the form, and re-open to check if it saved correctly.

####Scenario 2

1. Login as employee
2. Check if I have requiring feedback
3. Fill one of the feedback and save
4. check if it saved correctly
5. Submit one of the feedback (the feedback will move to submitted feedback section)
6. Check if I can change the submitted feedback (it will not be able to change)

####Scenario 3

Pre-step: employees submitted their requiring feedbacks 

1. Login as admin
2. Click "view details" to see the specific employee
3. Click "Performance Review" to see the review form
4. On the bottom, check if I can see the submitted feedback from other employees