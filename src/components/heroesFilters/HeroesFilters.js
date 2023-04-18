import { useDispatch, useSelector } from 'react-redux'
import { useHttp } from '../../hooks/http.hook'
import { useEffect } from 'react'
import { activeFilterChanged, filtersFetched, filtersFetching, filtersFetchingError } from '../../actions'
import Spinner from '../spinner/Spinner'
import classNames from 'classnames'

const HeroesFilters = () => {
    const { filters, filtersLoadingStatus, activeFilter } = useSelector(state => state.filters)
    const dispatch = useDispatch()
    const { request } = useHttp()

    useEffect(() => {
        dispatch(filtersFetching())

        request("http://localhost:3001/filters")
          .then(response => dispatch(filtersFetched(response)))
          .catch(dispatch(filtersFetchingError()))
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
                      onClick={() => dispatch(activeFilterChanged(name))}
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