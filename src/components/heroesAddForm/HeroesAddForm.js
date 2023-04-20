import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHttp } from '../../hooks/http.hook'
import { v4 } from 'uuid'
import { heroCreated } from '../heroesList/heroesSlice'
import { selectAll } from '../heroesFilters/filtersSlice'
import store from '../../store'

import Spinner from '../spinner/Spinner'
const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState('')
  const [heroDescr, setHeroDescr] = useState('')
  const [heroElement, setHeroElement] = useState('')

  const { filtersLoading } = useSelector(state => state.filters)
  const filters = selectAll(store.getState())
  const dispatch = useDispatch()
  const { request } = useHttp()

  const onSubmit = (e) => {
    e.preventDefault()

    const newHero = {
      id: v4(),
      name: heroName,
      description: heroDescr,
      element: heroElement,
    }

    request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
      .then(response => console.log(response))
      .then(dispatch(heroCreated(newHero)))
      .catch(err => console.log(err))

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
              <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
              <input
                  required
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Как меня зовут?"
                  value={heroName}
                  onChange={e => setHeroName(e.target.value)}/>
          </div>

          <div className="mb-3">
              <label htmlFor="text" className="form-label fs-4">Описание</label>
              <textarea
                  required
                  name="text"
                  className="form-control"
                  id="text"
                  placeholder="Что я умею?"
                  style={{"height": '130px'}}
                  value={heroDescr}
                  onChange={e => setHeroDescr(e.target.value)}/>
          </div>

          <div className="mb-3">
              <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
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

          <button type="submit" className="btn btn-primary">Создать</button>
      </form>
  )
}

export default HeroesAddForm
