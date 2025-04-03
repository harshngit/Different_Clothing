import React from 'react'
import "./Community.css"
import Image from 'next/image'
const EventListTwo = ({images,speed}) => {
  return (
    <div className="innertwo my-3">
      <div className="wrappertwo">
        <section className='mainAreaTwo' style={{ "--speed": `${speed}ms` }}>
          {images.map(({ id, image,link }) => (
            <a href={link}>
            <div className="homeImagetwo" key={id}>
              <Image className='galleryImageMain'  src={image} alt="Union Living Community Events and Social Gatherings" />
            </div>
            </a>
          ))}
        </section>
        <section className='mainAreaTwo' style={{ "--speed": `${speed}ms` }}>
          {images.map(({ id, image, link }) => (
            <a href={link}>
            <div className="homeImagetwo" key={id}>
              <Image className='galleryImageMain'  src={image} alt="Union Living Community Events and Social Gatherings" />
            </div>
            </a>
          ))}
        </section>
        <section className='mainAreaTwo' style={{ "--speed": `${speed}ms` }}>
          {images.map(({ id, image, link }) => (
            <a href={link}>
            <div className="homeImagetwo" key={id}>
              <Image className='galleryImageMain'  src={image} alt="Union Living Community Events and Social Gatherings" />
            </div>
            </a>
          ))}
        </section>
      </div>
    </div>
  )
}

export default EventListTwo