// import fs from 'fs';

export const generateAiImagesEndpoint = async () => {
    try{
        const url = 'https://beta-sdk.photoroom.com/v1/instant-backgrounds';
        console.log("URL: ", url)
        // const image = await fs.readFile('/images/grid.svg');
        // console.log("Image Loading....")
        // console.log(image);
    }
    catch(err){
        console.log("Error: ", err)
    }

}



// import requests

// url = "https://beta-sdk.photoroom.com/v1/instant-backgrounds"
// with open('./image/testimage.jpg','rb') as image_file:
//     print(">>>>>>>>>>>>>>>>>>>>>>")
//     print("Image Directory Found!")
//     print("<<<<<<<<<<<<<<<<<<<<<<")
//     files = { "imageFile": image_file.read() }
// print()
// payload = { "prompt": "A man watching football" }
// headers = {
//     "Accept": "image/png, application/json",
//     "x-api-key": "a1316fe69bfd41cf9c5af4d9eae4d910f000e926"
// }

// response = requests.post(url, data=payload, files=files, headers=headers)
// print()
// if response:
//     print(">>>>>>>>>>>>>>>>>>>>")
//     print("Your Background has been changed!")
//     print("Status Code : 200")
//     print("<<<<<<<<<<<<<<<<<<<<")
// else:
//     print(">>>>>>>>>>>>>>>>>>>>")
//     print("Your Background couldn't be changed!")
//     print("Error : 404")
//     print("<<<<<<<<<<<<<<<<<<<<")
// print()
// with open('./image/changedimage.jpg', 'wb') as f:
//     f.write(response.content)
//     print(">>>>>>>>>>>>>")
//     print("Image has been saved!")
//     print("<<<<<<<<<<<<<")

