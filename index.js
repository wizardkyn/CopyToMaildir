let Duplex = require('stream').Duplex;  

function bufferToStream(buffer) {  
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

var Client = require('ssh2').Client;
var connSettings = {
     host: 'www.mydomain.com',
     port: 22, 
     username: 'user',
     password: 'password',
     privateKey: require('fs').readFileSync('./puttyGeneral.ppk')
};
var remotePathToList = 'Maildir/new/';


var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var bucketName = 'the-bucket-name';

exports.handler = function(event, context, callback) {
    console.log('Process email');
 
    var sesNotification = event.Records[0].ses;
    console.log("SES Notification:\n", JSON.stringify(sesNotification, null, 2));
    
  	// Retrieve the email from your bucket
  	s3.getObject({
          Bucket: bucketName,
          Key: sesNotification.mail.messageId
      }, function(err, data) {
          if (err) {
              console.log(err, err.stack);
              callback(err);
          } else {
              console.log("Raw email:\n" + data.Body);

							var conn = new Client();
							conn.on('ready', function() {
							    conn.sftp(function(err, sftp) {
							        if (err) throw err;
							        console.log( "will create file in : " + remotePathToList + sesNotification.mail.messageId);
							        
							        var readStream = bufferToStream(data.Body);
							        var writeStream = sftp.createWriteStream(remotePathToList + sesNotification.mail.messageId);
							
							        writeStream.on('close',function () {
							            console.log( "- file transferred succesfully" );
							        });
							
							        writeStream.on('end', function () {
							            console.log( "sftp connection closed" );
							            conn.close();
							        });

							        readStream.pipe(writeStream);
							
							    });
							}).connect(connSettings);
							
              callback(null, null);
          }
      });
};