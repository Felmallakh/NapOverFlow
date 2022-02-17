# Nap Overflow (Group Project) 
Live Site: https://nap-overflow.herokuapp.com/

An application inspired by Stack Overflow built using JavaScript and utilizing pug architecture, Nap Overflow allows users to:
<ul>
  <li>Create an account</li>
  <li>Log in/out</li>
  <li>Ask questions</li>
  <li>Search for answers to their questions</li>
  <li>Answer previously asked questions</li>
  <li>Upvote/Downvote answers</li>
</ul>

## Technologies Used
* JavaScript
* Node.js
* Pug.js
* PostgreSQL
* Sequelize
* Express

## Site Views
<img src="https://github.com/Felmallakh/NapOverFlow/blob/main/images/NOhomepage.PNG" />
<img src="https://github.com/Felmallakh/NapOverFlow/blob/main/images/NOquestionspage.PNG" />
<img src="https://github.com/Felmallakh/NapOverFlow/blob/main/images/NOquestionpage.PNG" />

### Documentation
https://github.com/Felmallakh/NapOverFlow/wiki
  
<h2> Overall Structure </h2>
Nap Overflow was built using JavaScript, utilizing a postgreSQL Database. Backend requests are RESTful and are handled with Sequelize. Associations are used to prefetch data in order to minimize queries to the database.
<br></br>
Frontend views are rendered via Pug.js templates.

<h2> Features </h2>
<ul>
  <li>Users can register for accounts and log into the website</li>
  <li>Registered users can post / edit / delete questions </li>
  <li>Registered users can post / edit answers to questions</li>
  <li>Registered Users can upvote or downvote an answer</li>
  <li>Users can search for any question</li>
</ul>

<h3>Contributors</h3>
<ul>
  <li>
    <a href=https://github.com/andyrose507>Andy Jones</a></li>
  <li>
    <a href=https://github.com/felmallakh>Fady El Mallakh</a></li>
  <li>
    <a href=https://github.com/Geoffst3r>Geoffrey Cox</a></li>
  <li>
    <a href=https://github.com/Sumit-dey>Sumit Dey</a></li>
</ul>
