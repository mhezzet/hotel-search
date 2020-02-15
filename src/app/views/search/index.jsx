import React, { useState } from 'react'
import { DatePicker, Button, Typography } from 'antd'
import styles from './search.module.css'

export default function Search({ onSearch, filterByDate }) {
  const [date, setDate] = useState(null)

  return (
    <div className={styles.searchContainer}>
      <Typography.Title className={styles.title}>hotel search</Typography.Title>
      <div className={styles.search}>
        <DatePicker.RangePicker
          allowClear={false}
          onChange={date => setDate(date)}
        />
        <Button
          disabled={!date}
          onClick={() => {
            filterByDate(date)
            onSearch()
          }}
          className={styles.button}
          icon='search'
        >
          Search
        </Button>
      </div>
    </div>
  )
}
