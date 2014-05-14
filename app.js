var soap 	= require('soap');
var fs 		= require("fs");
var config 	= (JSON.parse(fs.readFileSync("./config.json", "utf8")));
var url 	= config.api_endpoint;

if(process.argv.length <= 3)
{
	console.log("Usage: <add|remove|update> <cartId> <product_id> <qty>");
	process.exit(code=1)
}


var action 	= process.argv[2];
var someId 	= process.argv[3];
var pid 	= process.argv[4];
var qty 	= process.argv[5];


function addProductsToCart(client, sessionId, cartId, products)
{
	client.shoppingCartProductAdd({sessionId:sessionId, quoteId:someId, products: products} , function(err, result) {
		client.shoppingCartProductMoveToCustomerQuote({sessionId:sessionId, quoteId:someId, products: products}, function(err, result) {
       	});          	
    });
}

function removeProductsFromCart(client, sessionId, cartId, products)
{
	client.shoppingCartProductRemove({sessionId:sessionId, quoteId:someId, products: products}, function(err, result) {
	});
}
function updateCart(client,sessionId, cartId, products)
{
	client.shoppingCartProductUpdate({sessionId:sessionId, quoteId:someId, products: products}, function(err, result) {
	});
}

 soap.createClient(url, function(err, client) {
 	client.login({username: config.username, apiKey: config.apiKey}, function(err, result) {
 
          var sessionId = result.loginReturn;

		  if(action=="add")
          	addProductsToCart(client, sessionId, someId, [{qty:qty, product_id: pid}]);
          if(action=="remove")
          	removeProductsFromCart(client, sessionId, someId, [{product_id: pid}]);
      	  if(action=="update")
      	  	updateCart(client, sessionId, someId, [{qty:qty, product_id: pid}])
          	
      });

 });