# Bikeapp

This application allows users to view bicycle stations and journeys between these stations on a map. The stations and journeys are stored in a database.

# Technologies

Frontend is made using TypeScript and React
Packages used in frontend: 
- Pigeon maps <https://pigeon-maps.js.org/> - for simple map implementation
- Recoil <https://recoiljs.org/> (for sharing data between components in a clean way)
- React Icons <https://react-icons.github.io/react-icons/> (Ionicons <https://ionicons.com/> and Remix icons <https://github.com/Remix-Design/RemixIcon>)
- React bootstrap (for styling and components) - <https://react-bootstrap.github.io/>
-

Backend: 
Java and Spring Boot

I previously had no experience using TypeScript so I wanted to learn it. Other languages and frameworks were familiar but I wanted to learn more about them.

# Features

- Journey listing with filtering and ordering
- Station listing with station search
- View station info
- View journey info
- Map for viewing station locations and journeys
- Data import through UI
- Date filter for journeys
- Map settings
- e2e tests for frontend

# OS

Tested operating systems:
<ul>
<li>Windows 10</li>
</ul>

# Setting up the frontend

Prerequisites:
<ul>
<li>node.js (tested on 16.13.2)</li>
<li>npm & npx (tested on 8.1.2)</li>
</ul>

Install & setup:
<ol>
<li>Clone the repository</li>
<li>Make sure that npm is installed</li>
<li>Open command line in frontend directory</li>
<li>Install packages:
	npm i
</li>
<li>Build the project using:
	npm run build
</li>
<li>Run the project with:
	serve -s build
</li>
</ol>

# Setting up the database and the backend (Optional)

Prerequisites:
<ul>
<li>Maven (tested on Maven 3.8.6)</li>
<li>Database (tested on MySQL)</li>
<li>Java JDK 17</li>
</ul>

By default, the project is configured to fetch data from a server that is running the backend (<https://api.jesse.ovh>). 
Database and backend setup is not required in order to use the application (but is required to use data importing). Setup can be done with these steps:
<ol>
<li>Install & configure database</li>
<li>Configure data source to match your database in /bikeapp-backend/src/main/resources/application.properties</li>
<li>Open command line in backend directory</li>
<li>Make sure that Java and Maven are installed</li>
<li>Build the project with Maven: 
	mvn package
</li>
<li>Run the program (required before importing data): 
	java -jar target/bike-0.0.1-SNAPSHOT.jar
</li>
<li>Change the URL in bikeapp-front/src/api.ts to match the address of your local backend.</li>
</ol>

# Importing data to local backend server

<ol>
<li>Open the program in browser and make sure that frontend and backend are working (map will not show before stations are imported)</li>
<li>Click "Import Data" on the navigation menu</li>
<li>Select the CSV file you want to import and select either "Journey data" or "Station data" according to file contents</li>
<li>Click "Import" and wait for status message. It can take several minutes to import large datasets. Import progress can be seen in backend command line.</li>
</ol>

# Running tests

Prerequisites:
<ul>
<li>Setup the frontend</li>
</ul>

Tests have been implemented as Cypress e2e tests using the actual backend for fetching. The tests cover the most important features of the app. Automatically recorded videos of tests are located in /bikeapp-front/cypress/videos/.
Run the tests in the frontend directory from the command line:
	npx cypress run