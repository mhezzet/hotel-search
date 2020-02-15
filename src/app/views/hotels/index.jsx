import React from 'react'
import styles from './hotels.module.css'
import {
  Dropdown,
  Button,
  Icon,
  Menu,
  Typography,
  Input,
  Slider,
  Card
} from 'antd'

export default function Hotels({
  setSort,
  hotels,
  searchByName,
  priceFilterLimits,
  setPriceRange,
  onClose,
  nights
}) {
  const menu = (
    <Menu onClick={value => setSort(value.key)}>
      <Menu.Item key='name'>name</Menu.Item>
      <Menu.Item key='price'>price</Menu.Item>
    </Menu>
  )

  console.log('hotels*', hotels)

  return (
    <>
      <Icon className={styles.close} onClick={onClose} type='close' />

      <div className={styles.grid}>
        <div className={styles.header}>
          <Typography.Text>Total Nights: {nights} </Typography.Text>
          <Dropdown overlay={menu}>
            <Button>
              Sort <Icon type='down' />
            </Button>
          </Dropdown>
        </div>

        <div className={styles.side}>
          <Input.Search
            onChange={e => searchByName(e.target.value)}
            placeholder='Hotel Name'
          />
          <h4 className={styles.priceFilterLabel}>price filter</h4>
          <Slider
            onChange={([min, max]) => setPriceRange({ min, max })}
            range
            max={priceFilterLimits.max}
            min={priceFilterLimits.min}
            defaultValue={[priceFilterLimits.min, priceFilterLimits.max]}
          />
        </div>
        <div className={styles.main}>
          {hotels.map((hotel, index) => (
            <Card key={hotel.name} title={hotel.name}>
              <p>{hotel.price}$</p>
              <p>{hotel.city}</p>
            </Card>
          ))}
          {!hotels.length && (
            <div className={styles.noHotels}>
              <Typography.Text>there is no hotels</Typography.Text>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
