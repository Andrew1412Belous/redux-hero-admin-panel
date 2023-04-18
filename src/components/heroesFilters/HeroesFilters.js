import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  filtersChanged, selectAll,
} from './filtersSlice'
import Spinner from '../spinner/Spinner'
import classNames from 'classnames'
import { fetchFilters } from './filtersSlice'
import store from '../../store'

const HeroesFilters = () => {
  const { filtersLoadingStatus, activeFilter } = useSelector(state => state.filters)
  const dispatch = useDispatch()
  const filters = selectAll(store.getState())


  useEffect(() => {
    dispatch(fetchFilters())
  }, [])

  if (filtersLoadingStatus === "loading") {
    return <Spinner/>;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const renderFilters = (arr) => {
    if (!arr.length) {
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>
    }

    return arr.map(({ name, className, label }) => {
      const btnClasses = classNames('btn', className, {
        'active' : name === activeFilter
      })

      return <button
        key={name}
        id={name}
        className={btnClasses}
        onClick={() => dispatch(filtersChanged(name))}
      >{label}</button>
    })
  }

  const elements = renderFilters(filters)

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {elements}
        </div>
      </div>
    </div>
  )
}

export default HeroesFilters;
