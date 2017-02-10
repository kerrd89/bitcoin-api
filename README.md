# bitcoin-api

### Live production application can be found [here](http://bitcoin-received.herokuapp.com/1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F)

### Technologies: React, React-Router, Node

## Getting Started

`npm install`

`npm run build`

`npm start`

Application will be served from http://localhost:3000/

### Helpful resources
* [Bitcoin transaction wiki: ](https://en.bitcoin.it/wiki/Transaction)
This was helpful to understand the composition of each transactions
* [Bitcoin API for transactions: ](https://blockchain.info/api/blockchain_api)
Used the endpoint for a 'Single Address' which returns a JSON object of transactions
* [Bitcoin API for conversion rates: ](https://blockchain.info/api/exchange_rates_api)
Returns a JSON object of the Bitcoin exchange rates for currencies around the world

### Decisions  
* **Redux**: Given the simplicity of the application with only one stateful component centrally managing state, I choose to not implement redux and focus on other extensions.
* **WebSockets**: Reading through the websocket implementation api [here](https://blockchain.info/api/api_websocket), I see that subscribing to this particular API is not too challenging.  There is a specific subscription service for a given address, which I would have implemented if I had time.  On the front-end, I would then create a custom event listener for to implement websockets and trigger and update once a new payment is received.
* **Server side rendering**: A server was necessary to bypass cors, so in order to deploy only one application I choose to use webpack to bundle the resources and send the index.html.
* **How I would have tackled multiple addresses**: I would have changed the endpoint so it accepted multiple parameters.  This would cap the amount of addresses Sam could enter for himself, but it allows for a single api call and a single response.  This would keep server traffic down since the front-end no longer has to make a call for each address.
* If I had more time, I would have move the data manipulation from the application to the server.  This would minimize the size of the response packets for each API call as well as reducing the size/complexity of the application itself.
* Out of curiosity, I implemented a currency conversion to USD for reference.  If I had more time, I would have made the table header a dropdown to select which conversion the user would like to see.
