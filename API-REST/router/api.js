
const router = require('express').Router();

router.post('/', ( req, res) => {

	var jsonData = req.body; 

	rulesRun( jsonData );

	try {

		res.json(

				{ 

					response: 'Se recibio con exito',

					hostnameOrigin:req.body.hostnameOrigin,

					ipOrigin:req.body.ipOrigin,

					hostnameDestination:req.body.hostnameDestination,

					ipDestination:req.body.ipDestination,

					ruleBlocking:req.body.ruleBlocking,

				}

		);

	} catch (error) {

		res.json(

			{ 

				response: error

			}

	);
			
	}

});

function rulesRun( jsonData ) {

	const { exec } = require('child_process');
	
	var hostnameOrigin      = jsonData.hostnameOrigin;

	var ipOrigin            = jsonData.ipOrigin;

	var hostnameDestination = jsonData.hostnameDestination;

	var ipDestination       = jsonData.ipDestination;

	var ruleBlocking        = jsonData.ruleBlocking;

	const rule = 'sudo iptables -A OUTPUT -s '+ ipOrigin +' -d '+ hostnameDestination + ' -j ' + ruleBlocking ;

	exec( rule, (error, stdout, stderr) => {

	  if (error) {

	    console.error(`error: ${error.message}`);
	    
	    return;
	  
	  }

	  if (stderr) {
	  
	    console.error(`stderr: ${stderr}`);
	  
	    return;
	  
	  }

	  saveRule();

	});

}

function saveRule(){

	const { exec } = require('child_process');

	const rule = 'sudo iptables-save > /etc/iptables/rules.v4';

	exec( rule, (error, stdout, stderr) => {

	  if (error) {

	    console.error(`error: ${error.message}`);
	    
	    return;
	  
	  }

	  if (stderr) {
	  
	    console.error(`stderr: ${stderr}`);
	  
	    return;
	  
	  } 

	  console.log('Se guarda regla');

	});

}


module.exports = router;