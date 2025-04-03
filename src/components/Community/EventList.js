import React from 'react'
import "./Community.css"
import Image from 'next/image'
const EventList = ({images,speed}) => {
  return (
    <div className="innertwo my-3">
      <div className="wrappertwo">
        <section className='mainArea' style={{ "--speed": `${speed}ms` }}>
          {images.map(({ id, image,link }) => (
            <a href={link}>
            <div className="homeImagetwo" key={id}>
              <Image className='galleryImageMain' src={image} alt="Union Living Community Events and Social Gatherings" />
            </div>
            </a>
          ))}
        </section>
        <section className='mainArea'  style={{ "--speed": `${speed}ms` }}>
          {images.map(({ id, image, link }) => (
            <a href={link}>
            <div className="homeImagetwo" key={id}>
              <Image className='galleryImageMain' src={image} alt="Union Living Community Events and Social Gatherings" />
            </div>
            </a>
          ))}
        </section>
        <section className='mainArea' style={{ "--speed": `${speed}ms` }}>
          {images.map(({ id, image, link }) => (
            <a href={link}>
            <div className="homeImagetwo" key={id}>
              <Image className='galleryImageMain' src={image} alt="Union Living Community Events and Social Gatherings" />
            </div>
            </a>
          ))}
        </section>
      </div>
    </div>
  )
}

export default EventList