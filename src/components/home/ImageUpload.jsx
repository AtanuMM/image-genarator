import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Button } from '@material-tailwind/react'
import ImagePlacehoderSkeleton from "../common/ImageSkeleton";
import { PhotoIcon } from '@heroicons/react/24/solid';
import Select from 'react-select'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { convertImageIntoBase64EncodedImage } from '../../helper/helper'

const fileTypes = ["JPG", "PNG", "SVG", "JPEG"];
const fileNameString = fileTypes.reduce((acc, curr) => {
    return acc + ", " + curr
}, "");

const options = [
    { value: '111', label: 'Change the entire background' },
    { value: '222', label: 'Remove background' },
    { value: '333', label: 'Make background Black' },
    { value: '444', label: "Add some padding" },
    { value: '555', label: "Add dogs in the foreground" },
];

export default function ImageUpload() {

    const [file, setFile] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [generatedimageUrl, setGeneratedImageUrl] = useState(null);
    const [fileTypeError, setFileTypeError] = useState(null);
    const [loader, setLoader] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);


    /////////////////////////////////////////////
    // FILE UPLOAD CALLBACKS 
    /////////////////////////////////////////////

    // Executes when new Image is uploaded
    const handleChange = async (file) => {
        try {
            const base64encodedImage = await convertImageIntoBase64EncodedImage(file);
            if (!base64encodedImage) throw new Error('Something went wrong! while uploading file.')
            console.log("Base 64 encoded Image: ", base64encodedImage);
            setTimeout(() => {
                setFileTypeError(false);
                setGeneratedImageUrl(null);
                setFile(file);
                setUploadedFile(base64encodedImage);
                setLoader(false);
            }, 150);
        }
        catch (err) {
            toast("Something went wrong ! while uploading Image.");
        }
    };

    // Executes when there is mismatch in filetype
    const handleFileTypeError = (err) => {
        if (err) {
            setFileTypeError(true);
            setUploadedFile(null);
            setFile(null);
            setSelectedOption(null);
            setLoader(false);
            setGeneratedImageUrl(null);
        }
    }

    // Handle Reset Upload 
    const resetUploader = () => {
        setFile(null);
        setUploadedFile(null);
        setSelectedOption(null);
        setLoader(false);
        setGeneratedImageUrl(false);
    }

    // Photoroom API Call
    const generateAiImagesEndpoint = async () => {

        setLoader(true);
        const formData = new FormData();
        formData.append("imageFile", file);
        formData.append("prompt", selectedOption.label);

        try {
            const apiUrl = "https://beta-sdk.photoroom.com/v1/instant-backgrounds";
            const headers = {
                'Content-Type': 'multipart/form-data',
                // "x-api-key": import.meta.env.VITE_PHOTOROOM_API_KEY
                "x-api-key": "91f921fec05a8d2c43fea05181a7bde9e0210d4a"
            }
            const res = await axios.post(apiUrl, formData, {
                headers,
                responseType: 'blob'
            });

            // Convert Binary Image to Base 64
            const reader = new FileReader();
            reader.readAsDataURL(res.data);
            reader.onloadend = () => {
                const base64data = reader.result;
                setLoader(false)
                setGeneratedImageUrl(base64data);
            };
        }
        catch (err) {
            setLoader(false);
            toast("Something went wrong! Please check your limit.");
        }


    }


    return (

        <div>

            {/* IMAGE UPLOAD OR DROP FILE CONTAINER */}
            <div className="flex flex-col items-center justify-center mt-8">

                <FileUploader
                    // multiple={true}
                    types={fileTypes}
                    name="file"
                    handleChange={handleChange}
                    onTypeError={handleFileTypeError}
                    dropMessageStyle={{
                        backgroundColor: '#F0F3FF',
                        color: 'black',
                        opacity: 1,
                        borderWidth: '1px'
                    }}
                >
                    <div className="border border-dashed border-[#0D1115] w-[500px] p-6 rounded-lg flex flex-col items-center">
                        <PhotoIcon className="h-6 w-6 text-gray" />
                        {
                            fileTypeError ? (
                                <>
                                    <div className="text-sm text-[red]">
                                        File Not supported !
                                    </div>
                                    <div className="text-[12px] mt-2 text-[#646060]">
                                        Supported Files {fileNameString.substring(2)}
                                    </div>
                                    <div className="text-[12px] text-[#646060] hover:underline hover:cursor-pointer">
                                        Upload another
                                    </div>
                                </>
                            ) : (
                                !file ? (
                                    <>
                                        <div className="text-sm text-[#646060]">
                                            Upload or Drop your files right here
                                        </div>
                                        <div className="text-[12px] text-[#646060]">
                                            Supported Files {fileNameString.substring(2)}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-sm text-[#646060]">
                                            Uploaded Successfylly !
                                        </div>
                                        <div className="text-[12px] mt-2 text-[#646060]">
                                            Supported Files {fileNameString.substring(2)}
                                        </div>
                                        <div className="text-[12px] text-[#646060] hover:underline hover:cursor-pointer">
                                            Upload another
                                        </div>
                                    </>
                                )
                            )
                        }
                    </div>
                </FileUploader>

                <div className="text-gray-600 text-sm mt-2 ">
                    {file ? <div> <span className="font-semibold" > Uploaded File: </span> {`${file.name}`} </div> : "Please Drop your file here"}
                </div>

                <div className="mt-2 ">
                    {uploadedFile && <img src={uploadedFile} className="w-[150px] h-[150px] rounded-sm" />}
                </div>

            </div>

            {/* SELECT PROMPTS */}
            <div className="flex flex-col items-center justify-center mt-8">
                {
                    file
                    &&
                    <>
                        <div className="w-[50%]">
                            <label className="text-gray-600 text-sm mt-2">Select Prompt</label>
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                className="focus:outline-none focus:ring-0 focus:border-gray-900"
                            />
                        </div>
                        {/* <div className="w-[50%]">
                    <label className="text-sm">Select Prompt</label>
                    <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        className="border border-1"
                    />
                </div> */}
                    </>

                }
            </div>

            {/* CTA BUTTONS ( GENERATE || ( REGENERATE + RESET ) ) */}
            <div className="flex justify-center pt-5">
                {
                    (file && selectedOption && generatedimageUrl) ? (
                        // SHOW REGENERATE AND RESET BUTTONS
                        <div className="text-center w-full">

                            <Button
                                loading={loader}
                                className="w-[50%] mx-auto hover:bg-black hover:text-white transition-opacity duration-1500 ease-in-out"
                                onClick={generateAiImagesEndpoint}
                            >
                                {loader ? 'Regenerating' : 'Regenerate'}
                            </Button>

                            {
                                !loader
                                &&
                                <>
                                    <br />
                                    <Button
                                        className="w-[50%] mt-2 mx-auto hover:bg-black hover:text-white transition-opacity duration-500 ease-in-out"
                                        onClick={resetUploader}
                                        variant="outlined"
                                    >
                                        Reset
                                    </Button>
                                </>
                            }
                        </div>
                    ) : (

                        (file && selectedOption)
                        &&
                        <Button
                            loading={loader}
                            className="w-[50%] hover:bg-black hover:text-white    transition-opacity duration-500 ease-in-out"
                            onClick={generateAiImagesEndpoint}
                        >Generate</Button>

                    )
                }
            </div>

            {/* GENERATED IMAGES CONTAINER */}
            <section id='results'>
                {
                    loader ?
                        <ImagePlacehoderSkeleton />
                        :
                        generatedimageUrl
                        &&
                        <div className=" p-4  mt-6  h-[300px] flex justify-center items-center relative">
                            {<img src={generatedimageUrl} className="h-full w-[600px] rounded-md " alt="Editted Image" />}
                        </div>
                }
            </section>


            {/* TOAST */}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />


        </div>
    );
}


