import React from 'react'
import './index.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalContext } from './context'
import { MdOutlineFileDownload } from 'react-icons/md'

const apiKey = import.meta.env.VITE_API_KEY
const url = `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=cat`

const Gallery = () => {
  const { searchTerm, downloadImg } = useGlobalContext()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`)
      return result.data
    },
  })

  if (isLoading) {
    return (
      <section className='image-container'>
        <h4>Loading...</h4>
      </section>
    )
  }
  if (isError) {
    return (
      <section className='image-container'>
        <h4>There was an Error</h4>
      </section>
    )
  }

  if (data.length < 1) {
    return (
      <section className='image-container'>
        <h4>Result not found</h4>
      </section>
    )
  }

  return (
    <div className='image-container'>
      {data.results.map((image) => {
        const imageUrl = image?.urls?.regular
        const fileName = `${image.alt_description}.png`
        return (
          <div className='single-image' key={image.id}>
            <img src={imageUrl} alt={image.alt_description} className='img' />
            <button
              className='download-btn'
              onClick={() => downloadImg(imageUrl, fileName)}
            >
              <MdOutlineFileDownload />
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Gallery
