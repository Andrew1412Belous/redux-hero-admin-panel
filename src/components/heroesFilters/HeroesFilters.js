import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import {
  filtersChanged,
  selectAll,
  fetchFilters
} from './filtersSlice'

import Spinner from '../spinner/Spinner'
import classNames from 'classnames'
import store from '../../store'

const HeroesFilters = () => {
  const { filtersLoadingStatus, activeFilter } = useSelector(state => state.filters)

  const dispatch = useDispatch()

  const filters = selectAll(store.getState())

  useEffect(() => {
    dispatch(fetchFilters())
  }, [])

  if (filtersLoadingStatus === "loading") {
    return <Spinner/>
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Loading error</h5>
  }

  const renderFilters = (arr) => {
    if (!arr.length) {
      return <h5 className="text-center mt-5">Filters not found</h5>
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
        <p className="card-text">Filter heroes by elements</p>
        <div className="btn-group">
          {elements}
        </div>
      </div>
    </div>
  )
}

export default HeroesFilters
