export const convertImageIntoBase64EncodedImage = (file) => {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);


        // File Reader Events
        reader.onloadend = () => {
            console.log("File loaded ended...");
            const base64Data = reader.result;
            resolve(base64Data);
        }
        
        reader.onerror = () => {
            reader.abort();
            reject(new DOMException('File not uploaded successfully'))
        }

    })
}

