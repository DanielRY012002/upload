const {google}=require('googleapis');
const path=require('path');
const fs=require('fs');
const CLIENT_ID = '409911582879-d7n2m1kqmd8i3cj78knejmd8hr49b8h0.apps.googleusercontent.com';
const CLIENT_SECRET = 'fSt0ba-cMqVCvqW4u1v9zrl-';
const REDIRECT_URI='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04IbPO3xcx0iJCgYIARAAGAQSNwF-L9IrdypEveDA3R1MGiMi5dwYYyIw4eVtQkh9nGw2DtvLqWIU1Fypgdo1wJ0Dddk9WSUk8Rc';
const oauth2Client=new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oauth2Client.setCredentials({refresh_token:REFRESH_TOKEN});
const drive=google.drive({
    version:'v3',
    auth:oauth2Client
})
const filePath=path.join(__dirname,'img098.pdf');
const fileId='';
async function uploadFile(){
    try {
        const response = await drive.files.create({
            requestBody:{
                name:'chinocagao.jpg',
                mimeType:'image/jpg'
            },
            media:{
                mimeType:'image/jpg',
                body:fs.createReadStream(filePath)
            }
        })
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}
async function deleteFile(id){
    try {
        const response = await drive.files.delete({
            fileId:id
        });
        console.log(response.data,response.status);
    } catch (error) {
        console.log(error.message);
    }
}
async function generatePublicUrl(id){
    try {
        const fileId=id;
        await drive.permissions.create({
            fileId:fileId,
            requestBody:{
                role:'reader',
                type:'anyone'
            }
        })
        const result=await drive.files.get({
            fileId:fileId,
            fields:'webViewLink,webContentLink'
        });
        console.log(result.data);
    } catch (error) {
        console.log(error.message);
    }
}
async function uploadUrlFile(){
    try {
        const response = await drive.files.create({
            requestBody:{
                name:'receta.pdf',
                mimeType:'application/pdf'
            },
            media:{
                mimeType:'application/pdf',
                body:fs.createReadStream(filePath)
            }
        })
        console.log(response.data);
        generatePublicUrl(response.data.id);
    } catch (error) {
        console.log(error.message);
    }
}
//deleteFile();
//uploadFile();
//generatePublicUrl();
//deleteFile(response.data.id);
uploadUrlFile();