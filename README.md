## The Client Panel App

Features:
- The app can let user add, edit and delete clients with their respective account balances
- The user can see on the dashboard the total amount owed to him/her.
- The user can also change some settings like enabling registration and edit/delete client balances

This is a serverless app or this uses firebase/firestore on the back-end with a React front-end

Notes:

Logic:
- The logic or add all balance on account is found at Clients.js file.
- This is done by getting data from firestore data collection for 'clients'.
- The app uses react-pose library for some of the page animations

