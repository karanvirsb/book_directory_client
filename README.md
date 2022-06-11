# Book Finder

A website to find a variety of books and their details. For the admin it allows them to create new books, update books, read the books and delete books. 

## Run Locally

Clone the project <br/>
Also Clone the backend [here](https://github.com/karanvirsb/book_directory_server)

```bash
  git clone https://github.com/karanvirsb/book_directory_client.git
```

Go to the project directory

```bash
  cd book_directory_client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Go to http://localhost:3000 in your browser and start searching. 
Important that under Api in axios you change teh BASE_URL to point to http://localhost:8000

## How to search
1. When page loads use the search bar at the top.
2. You can click on each book which leads to more details

## How to create books
1. Login with an administrative account and you will see a blue add book button on the home page
2. After that fill in the form and submit using the blue Add button.  

## How to update and delete
1. To update a book you will need to click on one of the books which will lead to the details page
2. From their in the top right you will see a green update button. 
3. Fill in the form and submit using the Edit button

1. To delete a book you will need to access teh same details page mentioned above (Step 1)
2. Then in the top right corner you will see a red delete button
3. A modal will pop up to confirm. 
4. Click Yes to delete. 

## User Stories
1. User wants to look at books
2. User wants to search for books
3. Admin wants to Add Books
4. Admin wants to Update Books
5. Admin wants to Delete Books

## Tech Stack
**Client:** React, CSS
**Server:** Express, Mongo DB, Node Js, IBM Cloud Object Storage

## Features
1. Login with JWT authentication
2. Register page with accessibility
3. Authorization of roles such as User, Admin, Editor, Demo Admin
4. Have Demo Admin to showcase admin work but it is not persistent
5. CRUD operations

## How it looks

