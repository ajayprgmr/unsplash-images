import { useGlobalContext } from './context'
import './index.css'

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext()
  const handleSubmit = (e) => {
    e.preventDefault()

    const searchFormValue = e.target.elements.search.value
    if (!searchFormValue) {
      return
    } else {
      setSearchTerm(searchFormValue)
    }
  }

  return (
    <section>
      <h1 className='title'>Unsplash Images</h1>
      <form className='search-form' onSubmit={handleSubmit}>
        <input
          type='text'
          className='form-input search-input'
          name='search'
          placeholder='cat'
        />
        <button type='submit' className='btn'>
          Search
        </button>
      </form>
    </section>
  )
}

export default SearchForm
