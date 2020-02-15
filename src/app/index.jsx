import React, { useState, useEffect } from 'react'
import useHotels from './hooks/useHotels'
import Hotels from './views/hotels'
import Search from './views/search'

function App() {
  const {
    fetchHotels,
    filterByDate,
    setSort,
    setNameFilter,
    hotels,
    priceFilterLimits,
    setPriceRange,
    nights
  } = useHotels()
  const [view, setview] = useState('search')

  useEffect(() => {
    fetchHotels()
  }, [])

  return (
    <div>
      {view === 'search' && (
        <Search
          filterByDate={filterByDate}
          onSearch={() => setview('hotels')}
        />
      )}
      {view === 'hotels' && (
        <Hotels
          searchByName={setNameFilter}
          priceFilterLimits={priceFilterLimits}
          setPriceRange={setPriceRange}
          setSort={setSort}
          nights={nights}
          hotels={hotels}
          onClose={() => setview('search')}
        />
      )}
    </div>
  )
}

export default App
