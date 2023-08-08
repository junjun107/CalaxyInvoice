# CalaxyInvoice

This is an Invoicing Web App built using the MERN (MongoDB, Express, React, Node.js) stack. 
The app allows users to create and manage invoices, add line items, track due dates, and view the status of each invoice.
The frontend is built with React, utilizing Material-UI (MUI) styling components and the MUI DataGrid for efficient tabular data display.
The backend is built with Express and Node.js, with data stored in a MongoDB database hosted on MongoAtlas.

## Features
Create Invoices: Users can easily create new invoices by filling out an intuitive invoice form.

Line Items: Invoices can have multiple line items, which are used to calculate subtotals and the grand total.

Issue and Due Dates: Each invoice has an issue date and a due date, selected using a DatePicker component.

Invoice List: The home page displays a list of all invoices. The status of each invoice is color-coded: late invoices are marked in red, fulfilled invoices are green, and outstanding invoices are orange.

Sorting and Filtering: Users can sort each column in the invoice list, making it easy to organize and find specific invoices.

Invoice Details: Users can view the details of each invoice, including its status (paid, outstanding, late, etc.).

Notes: The invoice form includes a notes section for administrators to add internal notes, and a notes section for customers to provide payment instructions.

Data Storage: Invoices are saved in the MongoDB database using HTTP POST and PUT requests to the server. Updates are performed using HTTP PUT requests.

## Technologies Used
Frontend: React, Material-UI (MUI) styling, MUI DataGrid, DatePicker

Backend: Express, Node.js

Database: MongoDB hosted on MongoAtlas

## Setup
* Clone the repository
* Navigate to the frontend directory
* Install frontend dependencies: npm install
* Start the frontend development server: npm start
* Open another terminal window/tab and navigate to the backend directory: 
* Install backend dependencies: npm install
Start the backend server: npm start server

<img width="961" alt="Screen Shot 2023-08-08 at 4 05 39 PM" src="https://github.com/junjun107/CalaxyInvoice/assets/60997220/89c5517e-d029-46f3-aad0-730e229d35dc">

