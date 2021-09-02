
const router = require('express').Router();

const fs = require('fs');

let posIpOrigin;

let posIpDestination; 

let splitIterator;

let posRule;

let posPort;

var json;

var obj;

let jsonResponse;

var aDataResponse;


//FIX ME, ARREGLAR exportar funcion aSincrona

/*function rulesList() {

	fs.readFile('/etc/iptables/rules.v4', 'utf8',(error, datos)=>{

		if(error){

			console.log(error);

		}else{

			var linesExceptFirst = datos.split('\n').slice(5,-3);

			linesExceptFirst.forEach((elem)=>{

				splitIterator = elem.split(' ');

				posIpOrigin = splitIterator.indexOf('-s')+1;

				posIpDestination = splitIterator.indexOf('-d')+1;

				posRule = splitIterator.indexOf('-j')+1;

				posPort = splitIterator.indexOf('-p')+1;


				if( splitIterator.indexOf('-s') != -1 ){

					ipOrigin = splitIterator[posIpOrigin];

				}else{

					ipOrigin = '';

				}

				if( splitIterator.indexOf('-d') != -1 ){

					ipDestination = splitIterator[posIpDestination];

				}else{

					ipDestination = '';

				}

				if( splitIterator.indexOf('-j') != -1 ){

					rule = splitIterator[posRule];

				}else{

					rule = '';

				}

				if( splitIterator.indexOf('-p') != -1 ){

					port = splitIterator[posPort];

				}else{

					port = '';

				}


				json = {

						    "ipOrigin": ipOrigin,
						    
						    "ipDestination": ipDestination,
						    
						    "ruleBlocking" : rule,

						    "port" : port 
						}

                jsonResponse.push( json );	

			})

	    }

	    console.log(jsonResponse);

	});

}*/

router.get('/', ( req, res) => {

	fs.readFile('/etc/iptables/rules.v4', 'utf8',(error, datos)=>{

		if(error){

			console.log(error);

		}else{

			var linesExceptFirst = datos.split('\n').slice(5,-3);

			jsonResponse = [];

			linesExceptFirst.forEach((elem)=>{

				splitIterator = elem.split(' ');

				posIpOrigin = splitIterator.indexOf('-s')+1;

				posIpDestination = splitIterator.indexOf('-d')+1;

				posRule = splitIterator.indexOf('-j')+1;

				posPort = splitIterator.indexOf('--dport')+1;


				if( splitIterator.indexOf('-s') != -1 ){

					ipOrigin = splitIterator[posIpOrigin];

				}else{

					ipOrigin = '';

				}

				if( splitIterator.indexOf('-d') != -1 ){

					ipDestination = splitIterator[posIpDestination];

				}else{

					ipDestination = '';

				}

				if( splitIterator.indexOf('-j') != -1 ){

					rule = splitIterator[posRule];

				}else{

					rule = '';

				}

				if( splitIterator.indexOf('-p') != -1 ){

					port = splitIterator[posPort];

				}else{

					port = '';

				}


				json = {

						    "ipOrigin": ipOrigin,
						    
						    "ipDestination": ipDestination,
						    
						    "ruleBlocking" : rule,

						    "port" : port 
						}

                jsonResponse.push( json );	

			})

	    }

	    if( linesExceptFirst.length === 0){

	    	json =  {
					    "message": "No Content",
					    
					    "status": 204
					}


	    	aDataResponse = json


	    }else{


	    	aDataResponse = jsonResponse;


	    }

	    res.send(

	    	aDataResponse

	    )

	});

});

module.exports = router;