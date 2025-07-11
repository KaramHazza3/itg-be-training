# Voting System

## Description

This project is a voting system where users can create and vote on polls. It features real-time updates on voting results, a clean and user-friendly interface, and validations to ensure high-quality polls.

## Features

- **Dashboard**
  - Displays the three most active polls.
  - Displays all polls in reverse chronological order.
  
- **Poll Creation**
  - Users can create polls with a question that is 10 characters or more.
  - Each poll must have at least two options to choose from.

- **Voting System**
  - Users can select an option to vote on a poll.
  - After voting, they are redirected to the results page for that poll.

- **Results Page**
  - Displays updated voting results (using Socket.io).
  - Displays a chart/graph showing the voting results.

## Extended Features Implemented

- **Socket.io Integration**: The results page updates in real time when new votes are cast.
- **Voting Results Chart**: A graphical representation of the voting results is displayed on the results page.
  
## Technologies Used

- **Frontend**
  - **EJS**: Template engine to render dynamic content.
  - **EJS Layout**: To manage the structure and layout of the pages.
  - **Reusable Components in EJS**: Modular components used throughout the site for consistent design and functionality.
  - **Sass**: CSS preprocessor for writing clean and maintainable stylesheets.
  - **Socket.io**: For real-time updates when voting results change.

- **Backend**
  - Node.js
  - Express.js

 - **Database**
    - SQLite
  
## Notes

1. Install the required dependencies:

    ```bash
    npm install
    ```
    
2. To feed your database with fake data write
   
   ```bash
    npm run seed
    ```
   
4. If you want to edit the SASS file NOTE THAT you must write
   
    ```bash
    npm run sass
    ```

5. Run the application:

    ```bash
    npm run dev
    ```

6. Open your browser and visit `http://localhost:8080` to view the voting system.
