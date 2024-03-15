import React from 'react';
import ImageUpload from './ImageUpload';

const HomePage = () => {
  return (
    <section className=" mt-6 w-full flex flex-center flex-col">

        {/* HEADING */}
        <h1 className='text-center head_text'>
            AI-Powered
            <span className=" ml-3 orange_gradient text-center ">
            Image Generator
            </span>
        </h1>

        {/* IMAGE UPLOAD CONTAINER */}
        <ImageUpload/>
    </section>
  )
}

export default HomePage
