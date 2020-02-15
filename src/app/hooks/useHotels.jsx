import { useState, useEffect, useCallback } from 'react'
import hotelsAPI from '../utils/axios'
import moment from 'moment'

export default function useHotels() {
  const [allHotels, setAllHotels] = useState([])
  const [serverError, setServerError] = useState(null)
  const [dateFilteredHotels, setDateFilteredHotels] = useState([])
  const [hotels, setHotels] = useState([])
  const [sort, setSort] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [priceRange, setPriceRange] = useState({})
  const [priceFilterLimits, setPriceFilterLimits] = useState({
    max: 100,
    min: 0
  })
  const [nights, setNights] = useState(0)

  useEffect(() => {
    let newHotels = dateFilteredHotels

    if (nameFilter) {
      newHotels = newHotels.filter(hotel =>
        hotel.name.toUpperCase().includes(nameFilter.toUpperCase())
      )
    } else {
      newHotels = dateFilteredHotels
    }

    if (Object.keys(priceRange).length) {
      newHotels = newHotels.filter(
        hotel =>
          parseInt(hotel.price) >= priceRange.min &&
          parseInt(hotel.price) <= priceRange.max
      )
    }

    if (sort === 'name') {
      newHotels = newHotels.sort(sortByName)
    }

    if (sort === 'price') {
      newHotels = newHotels.sort(sortByPrice)
    }

    setHotels(newHotels)
  }, [sort, nameFilter, priceRange, dateFilteredHotels])

  const filterByDate = ([startDate, endtDate]) => {
    const nights = endtDate.diff(startDate, 'd')

    const filteredHotels = allHotels
      .filter(hotel =>
        hotel.availability.some(
          date =>
            startDate.isBetween(moment(date.from), moment(date.to)) &&
            endtDate.isBetween(moment(date.from), moment(date.to))
        )
      )
      .map(hotel => ({ ...hotel, price: hotel.price * nights }))

    setDateFilteredHotels(filteredHotels)
    setHotels(filteredHotels)

    setNights(nights)

    setPriceFilterLimits({
      max: Math.max(...filteredHotels.map(hotel => parseInt(hotel.price))),
      min: Math.min(...filteredHotels.map(hotel => parseInt(hotel.price)))
    })
  }

  const fetchHotels = async () => {
    const fixDateFormat = date =>
      date
        .split('-')
        .reverse()
        .join('-')

    try {
      const response = await hotelsAPI.get('/tl0bp')
      setAllHotels(
        response.data.hotels.map(hotel => ({
          ...hotel,
          availability: hotel.availability.map(date => ({
            to: fixDateFormat(date.to),
            from: fixDateFormat(date.from)
          }))
        }))
      )
      setNameFilter('')
      setPriceRange([])
    } catch (error) {
      setServerError(error.message)
    }
  }

  console.log('hotels maaan', hotels)

  return {
    dateFilteredHotels,
    filterByDate,
    fetchHotels,
    setNameFilter,
    priceRange,
    setSort,
    hotels,
    priceFilterLimits,
    setPriceRange,
    nights
  }
}

const sortByName = (hotelA, hotelB) => {
  const nameA = hotelA.name.toUpperCase()
  const nameB = hotelB.name.toUpperCase()

  if (nameA > nameB) return 1
  if (nameA < nameB) return -1

  return 0
}

const sortByPrice = (hotelA, hotelB) => {
  const priceA = hotelA.price
  const priceB = hotelB.price

  if (priceA > priceB) return 1
  if (priceA < priceB) return -1

  return 0
}
