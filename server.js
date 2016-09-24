//Required packages:
var connect = require('connect'); //used to connect to localhost
var url = require('url'); //used to parse url

var app = connect(); //instance of connect
//functions:

/*Equations: takes 3 parameters;
  -method accepts a string value that determines the equation to use (add, subtract, multiply, divide)
  -x,y are two numeric values used in the equation
*/


var equations = function(req, res, next){
  var qs = url.parse(req.url, true).query;
  var method = qs.method;
  var x = parseInt(qs.x);
  var y = parseInt(qs.y);
  var result;
  if(method === "add"){

    result = (x + y);
    res.end(x.toString() + " + " + y.toString() + " = " + result );
  }
  else if(method === "subtract"){
    result = (x - y);
    res.end(x.toString() + " - " + y.toString() + " = " + result );
  }
  else if (method === "multiply") {
    result = (x * y);
    res.end(x.toString() + " * " + y.toString() + " = " + result );
  }
  else if (method === "divide") {
    if(y === 0){
      //give error, cannot divide by 0
      res.end('Error: y-value cannot be 0 when dividing');
    }else{
        //y != 0
        result = (x / y);
        res.end(x.toString() + " / " + y.toString() + " = " + result );
    }

  }
  else{
    res.end('Error: values do not match types OR operator is not supported (valid operators: add, subtract, multiply and divide)');
  }
}

//lab3 function: message for the page at localhost:3000/lab3
var lab3 = function(req, res, next){
  res.end("At the end of the URL append '?method=a&x=b&y=c' where a is the operator ('add', 'subtract', 'multiply' or 'divide'), b is a numeric value and y is a numeric value");
}

var generic = function(req, res, next){
  res.end("To access the calculator, append '?method=a&x=b&y=c' to the end of the URL; where a is the operator ('add', 'subtract', 'multiply' or 'divide'), b is a numeric value and y is a numeric value");
}

app.use('/lab3', equations);
app.use(generic);

app.listen(3000);
console.log('Connect running on port 3000');
