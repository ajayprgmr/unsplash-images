import './index.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalContext } from './context'
const apiKey = import.meta.env.VITE_API_KEY
const url = `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=cat`

const Gallery = () => {
  const { searchTerm } = useGlobalContext()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['images', searchTerm], // whenever this array changes react-query make a get request.
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

  console.log(data)
  return (
    <div className='image-container'>
      {data.results.map((image) => {
        const url = image?.urls?.regular
        return (
          <div className='result' key={image.id}>
            <img src={url} alt={image.alt_description} className='img' />
          </div>
        )
      })}
    </div>
  )
}

export default Gallery
