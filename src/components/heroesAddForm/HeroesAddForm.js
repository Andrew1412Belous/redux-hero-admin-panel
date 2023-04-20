import { useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { selectAll } from '../heroesFilters/filtersSlice'
import { useCreateHeroMutation } from '../../api/apiSlice'

import store from '../../store'
import Spinner from '../spinner/Spinner'

const HeroesAddForm = () => {
  const [createHero] = useCreateHeroMutation()

  const [heroName, setHeroName] = useState('')
  const [heroDescr, setHeroDescr] = useState('')
  const [heroElement, setHeroElement] = useState('')

  const { filtersLoading } = useSelector(state => state.filters)
  const filters = selectAll(store.getState())

  const onSubmit = (e) => {
    e.preventDefault()

    const newHero = {
      id: uuidv4(),
      name: heroName,
      description: heroDescr,
      element: heroElement,
    }

    createHero(newHero).unwrap()

    setHeroElement('')
    setHeroDescr('')
    setHeroName('')
  }

  const renderFilters = (arr, status) => {
    if (status === "loading") {
      return <Spinner/>
    } else if (status === "error") {
      return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    if (filters && filters.length) {
      return filters
        .map(({ name, label }) => {
          if (name === 'all') return

          return <option key={name} value={name}>{label}</option>
        })
    }
  }


  return (
      <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
          <div className="mb-3">
              <label htmlFor="name" className="form-label fs-4">Name new hero</label>
              <input
                  required
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="My name?"
                  value={heroName}
                  onChange={e => setHeroName(e.target.value)}/>
          </div>

          <div className="mb-3">
              <label htmlFor="text" className="form-label fs-4">Description</label>
              <textarea
                  required
                  name="text"
                  className="form-control"
                  id="text"
                  placeholder="My abilities?"
                  style={{"height": '130px'}}
                  value={heroDescr}
                  onChange={e => setHeroDescr(e.target.value)}/>
          </div>

          <div className="mb-3">
              <label htmlFor="element" className="form-label">Choice hero element</label>
              <select
                  required
                  className="form-select"
                  id="element"
                  name="element"
                  value={heroElement}
                  onChange={e => setHeroElement(e.target.value)}>
                  <option >Я владею элементом...</option>
                  {renderFilters(filters, filtersLoading)}
              </select>
          </div>

          <button type="submit" className="btn btn-primary">Create</button>
      </form>
  )
}

export default HeroesAddForm
