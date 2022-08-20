This is an Online Shop project. The following tech stack is used:

    1. JavaScript(ES6+)
    2. React.js(Class components. There's also a functional component version of this project in repository called: OnlineStore-React.js_Graphql2 
    3. HTML5, CSS3
    4. Scss/Sass + CSS modules
    5. Responsive + Mobile first design
    6. Rest API(implemented using React Router)
    7. State management(implemented using Redux)
    8. Version control - git.
    9. Design - figma.

A brief description of the Online Shop:
1. The data is fetched from local GraphQL server running on port 4000. Make sure to run the GraphQL server first by using and then launch the actual project. The project is ran on local host 3000 and the GraphQL server must be running on port 4000. (In case if graphql server is missing you can download it from here: https://github.com/scandiweb/junior-react-endpoint)
Follow these steps to start the GraphQL server:

    1. Switch directory to the GraphQL server folder(the folder you unzipped the endpoint)
    2. Download apollo client by: 
    npm i @apollo/client
    3. Run the build(For npm): 
    npm run build
    4. Start the server:
    npm start
    5. Then switch directory to the folder containing the React project and start it as well:
    npm start

    1. Run the React project and start it:
    npm install
    npm start
    2. Switch directory to the GraphQL server folder(the folder you unzipped the endpoint)
    3. Download apollo client by: 
    npm i @apollo/client
    4. Run the build(For npm): 
    npm run build
    5. Start the server:
    npm start
    6. In order for application to work, both React project & the Graphql endpoint must be running.

2. You're able:

    1. To see the full product list
    2. Filter the list based on the category selected
    3. View a specific product separately
    4. Modify the product attributes like: size, color & so on.
    5. To add the product to your cart
    6. To remove the product from the cart
    7. To 'purchase' the product/products from the cart
    8. And many more

