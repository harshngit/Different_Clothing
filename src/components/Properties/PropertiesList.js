import React, { Suspense } from 'react'

import HamletImage from "../../asset/hamlet.png"
import PropertyLoadingCard from './PropertyLoadingCard'
import { propertyListData } from '../../app/data/PropertyList'
import PropertiesCardNew from './PropertiesCardNew'

const PropertiesList = () => {
  return (
    <div>
         <div className='md:px-12 px-4 pb-12' >
        <div className='grid grid-cols-1 lg:grid-cols-3 grid-flow-row gap-6   ' >
        {propertyListData && propertyListData?.map((property,key)=>(
    
          <Suspense fallback={<PropertyLoadingCard />} >
      <PropertiesCardNew property={property}  />
      </Suspense>
     
    ))}
        </div>
    </div>
    </div>
  )
}

export default PropertiesList