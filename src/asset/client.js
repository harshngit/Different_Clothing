import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = sanityClient({
    projectId:"7wato468",
    dataset:'production',
    apiVersion:'2022-10-11',
    userCdn:true,
    token:"skwpEC31v07HOYuNnYjS04xegqHW0PDJCraechvMCFWhuwJr4e6WQu2dsl0a4p2z3zogo78Ehwsml5rWtkwp8zWGUFFpjohqgl8H74pTzqRwJ53OOgvzdwpwSiaoNpCXL2vVxBk3yWsJQtOTuWM6LGf23tUxDqiZTJRLa07w3Tyi4LhieZUA"

})

const builder = imageUrlBuilder(client);

export const urlFor = (source)=> builder.image(source);