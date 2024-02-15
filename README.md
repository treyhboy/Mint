# Mint: Your Personal Finance Assistant (Node.js)

[![Mint tests Status](https://github.com/treyhboy/Mint/workflows/Mint%20tests/badge.svg)](https://github.com/treyhboy/Mint/actions)

## Take control of your finances with Mint, a modern and secure personal finance app built using Node.js and Express. Get real-time insights into your spending, manage bills, track progress towards goals, and access valuable financial tools - all in one convenient place.

A barebones Node.js app using [Express 4](http://expressjs.com/).

## Key Features:
* Seamless Data Aggregation: Connect securely to bank accounts, credit cards, and investment accounts for a comprehensive overview of your financial health.
* Automated Categorization: Mint automatically categorizes your transactions, saving you time and effort.
* Intuitive Budgeting: Set and track personalized budgets to see where your money goes and stay on top of your financial goals.
* Powerful Insights: Gain actionable insights into your spending habits, track your credit score, and receive personalized financial guidance.
* User-Friendly Interface: Navigate Mint's clean and intuitive interface with ease, whether on your desktop or mobile device.

## Screenshots

### About Page

![about](Screenshots/about.png)

### Login Page

![login](Screenshots/login.png)

### Main Page

![main](Screenshots/main.png)

### Working Page

![working page](Screenshots/working%20page.png)


## Running Locally

1. Clone the Repository:

```sh
git clone https://github.com/treyhboy/Mint.git # or clone your own fork
cd Mint
```

2. Install Dependencies: [Node.js](http://nodejs.org/) and [MySQL](https://dev.mysql.com/downloads/mysql/)

```sh
npm install
```
3. Run the App
```sh
npm start
```
You can also use Docker to run the app. This will remove the requirement of MySQL installed on your local machine and will run MySQL in a Docker container.

```sh
docker-compose up -d
```

Access your app at http://localhost:3100.

## Contributing:

We welcome contributions to help Mint grow and improve! Feel free to:

* Create issues for bug reports or feature suggestions.
* Submit pull requests with code changes and enhancements.
* Share your ideas and feedback for future development.

## Community:

Join our community of users and developers to discuss Mint, share your experiences, and help each other make the most of the app.
