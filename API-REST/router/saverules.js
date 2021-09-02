
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

