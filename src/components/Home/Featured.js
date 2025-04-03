import React from 'react'
import YourStory from "../../asset/newIcon/yourstory.png"
import ProjectToday from "../../asset/newIcon/ProjectToday.png"
import ISN from "../../asset/newIcon/isn.png"
import RealityPlus from "../../asset/newIcon/reality+.png"
import Midday from "../../asset/newIcon/midday.png"
import Outlook from "../../asset/newIcon/outlook.png"
import Business from "../../asset/newIcon/business.png"
import TIE from "../../asset/newIcon/tie.png"
import Epc from "../../asset/newIcon/epc.png"
import NXT from "../../asset/newIcon/nxt.png"
import Prop from "../../asset/newIcon/prop.png"
import BrandList from './BrandList';
const Featured = () => {
  const list = [
    {
      image:ProjectToday,
      link:"https://www.projectstoday.com/News/Union-Living-to-add-1000-beds-in-expansion-mode"
    },
    {
      image:YourStory,
      link:"https://yourstory.com/2024/01/startup-news-and-updates-daily-roundup-january-23"
    },
    {
      image:ISN,
      link:"https://indianstartupnews.com/news/co-living-startup-union-living-to-add-1-000-beds-in-mumbai-in-2024-to-invest-rs-10cr-on-expansion-2397372"

    },
    {
      image:RealityPlus,
      link:"https://www.rprealtyplus.com/realty-spotlight/co-living-startup-union-living-to-add-1000-beds-in-mumbai-113763.html"
    },
    {
      image:Midday,
      link:"https://www.mid-day.com/lifestyle/culture/article/tired-of-high-rentals-in-mumbai-here-is-a-pocket-friendly-co-living-option-23305483"
    },
  {
    image:Outlook,
    link:"https://startup.outlookindia.com/sector/e-commerce/co-living-start-up-introduces-varsity-by-union-living-in-mumbai-news-9254"
  },
  {
    image:Business,
    link:"https://mybs.in/2dSkpBP"
  },
  {
    image:TIE,
    link:"https://indianexpress.com/article/cities/pune/pune-inc-mumbai-co-living-brand-8893236/lite/"
  },
  {
    image:Epc,
    link:"https://www.epcworld.in/p/post/union-living-to-add-1-000-beds-in-mumbai-this-yr-to-invest-rs-10-crore-on-expansion"
  },
  {
    image:NXT,
    link:"https://realtynxt.com/news/union-living-invests-10-cr-for-new-centers-in-mumbai"
  },
  {
    image:Prop,
    link:"https://www.propnewstime.com/getdetailsStories/MjYyOQ==/mumbai-welcomes-luxurious-student-housing-with-the-launch-of-varsity-by-union-living"
  },
  ]
  const images = list?.slice(0,7)?.map((image) => ({
    id: crypto.randomUUID(),
    image:image.image,
    link:image.link
  }));
  return (
    <div className='relative  lg:mx-16 mx-4 py-4 lg:py-12' >
        <div>
        <h3 className='font-[NeueBold] uppercase mb-3 lg:mb-6 text-[1.2rem] lg:text-[2rem]' >As Featured In</h3>
          <BrandList images={images} speed={20000} />
        </div>
    </div>
  )
}

export default Featured