const {google}=require('googleapis');
const path=require('path');
const fs =require('fs');
const { file } = require('googleapis/build/src/apis/file');
const CLIENT_ID ='Your Clint ID'
const CLIENT_SECRET='Your client secret'

const REDIRECT_URI='https://developers.google.com/oauthplayground'

const REFRESH_TOKEN='Your Refresh Token ' //

const oauth2Client=new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oauth2Client.setCredentials({refresh_token:REFRESH_TOKEN});
const drive =google.drive({  
    version:'v3',
    auth:oauth2Client,

});

const filePath=path.join(__dirname,'rose.jpeg');

async function uploadFile(){
    try{
        const response = await drive.files.create({
            requestBody:{
                name:'abbbbb.png', // you can choose any name
                mimeType: 'image/png'
            },
            media:{
                mimeType:'image/png',
                body: fs.createReadStream(filePath),
            },
        });
        console.log(response.data);
        
    }catch(error){
        console.log(error.message)
    }
}
// uploadFile();

// For deleting upload same file 
async function deleteFile(){
    try {
        const response= await drive.files.delete({
            fileId:'', // file id of the uploaded file
        });
        console.log(response.data,response.status);
    } catch (error) {
        console.log(error.message);
    }
}
// deleteFile();

// for generating public 
async function generatePublic(){
    try {
        const fileId ='';
        await drive.permissions.create({
            fileId: fileId,
            requestBody:{
                role: 'reader',
                type:'anyone'
            }
        });
        const result=await drive.files.get({
            fileId: fileId,
            fields:'webViewLinks, webContentLink'

            // WebViewLinks will help to download the file
            // WebContentLinks will help to view that file 
        });
        console.log(result.data);


    } catch (error) {
        console.log(error.message);        
    }
}
generatePublic(); //this function will help to generate file for anyone   