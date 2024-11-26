import React, { useState } from 'react'
import './filter.scss'
import { useSearchParams } from 'react-router-dom'
const Filter = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    address: searchParams.get('address') || '',
    propertyType: searchParams.get("propertyType") || '',
    homeType: searchParams.get("homeType") || '',
    minPrice: searchParams.get("minPrice") || '',
    maxPrice: searchParams.get("maxPrice") || '',
    minRooms: searchParams.get("minRooms") || '',
    maxRooms: searchParams.get("maxRooms") || '',
    minSize: searchParams.get("minSize") || '',
    maxSize: searchParams.get("maxSize") || ''
  })
  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value
    })
  }
  const handleFilter = () => {
    setSearchParams(query);
  };
  const handleClearFilter = () => {
    setQuery({
      address:  '',
      propertyType: '',
      homeType:  '',
      minPrice:  '',
      maxPrice:  '',
      minRooms:  '',
      maxRooms:  '',
      minSize: '',
      maxSize: ''
    })
    setSearchParams({
      address:  '',
      propertyType: '',
      homeType:  '',
      minPrice:  '',
      maxPrice:  '',
      minRooms:  '',
      maxRooms:  '',
      minSize: '',
      maxSize: ''
    });
  };
  return (
    <div className='filter'>

          <fieldset>
            <legend>Location</legend>
            <div className='filter-searchBar' >
              <img className='searchImg' src="/searchIcon.svg" alt="" />
              <input onChange={handleChange} value={query.address} type="text" name='address'  placeholder='Search location , city or area'/>
            </div>
          </fieldset>


          <div style={{display:'flex' , gap:'35px'}}>

          <fieldset>
            <legend >Property Type</legend>
            <div className='homeType-block'>
              <label to='Room' className='type'><input onChange={handleChange} type="radio" id='Room' value='room'  name='homeType' checked={query.homeType === 'room'}/> Room   <span className="checkmark"></span></label>
              <label to='Apartment' className='type'><input onChange={handleChange} type="radio" id='Apartment' value='apartment'  checked={query.homeType === 'apartment'} name='homeType'/> Apartment   <span className="checkmark"></span></label>
              <label to='House' className='type'><input onChange={handleChange} type="radio" id='House' value='house' checked={query.homeType === 'house'}  name='homeType'/> House   <span className="checkmark"></span></label>
              <label to='Studio' className='type'><input onChange={handleChange} type="radio" id='Studio' value='studio' checked={query.homeType === 'studio'}  name='homeType'/> Studio   <span className="checkmark"></span></label>
            </div>
          </fieldset>
            <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
            <fieldset>
              <legend>Number of Rooms</legend>
              <div className='amount-block'>
              <input name='minRooms' value={query.minRooms} min={0}  onChange={handleChange} type="number" placeholder='Min'/>
                <input name='maxRooms' value={query.maxRooms} min={0}  onChange={handleChange} type="number" placeholder='Max'/>
  
              </div>
            </fieldset>
            <fieldset className="rent-block">
              <legend>Rent/Buy</legend>
              <select  value={query.propertyType} name='propertyType' onChange={handleChange}>
                <option value="">Any</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </fieldset>
            </div>
          </div>
      <div style={{display:'flex', gap:'35px'}}>
        <fieldset>
          <legend>Price</legend>
          <div className='price-block'>
            <input name='minPrice' min={0} value={query.minPrice}  onChange={handleChange} type="number" placeholder='Min'/>
            <input name='maxPrice' min={0} value={query.maxPrice}  onChange={handleChange} type="number" placeholder='Max' />
          </div>
        </fieldset>
        <fieldset>
          <legend>Size (m²)</legend>
          <div className='size-block'>
            <input name='minSize' min={0} value={query.minSize}  onChange={handleChange} type="number" placeholder='Min'/>
            <input name='maxSize' min={0} value={query.maxSize}  onChange={handleChange} type="number" placeholder='Max' />
          </div>
        </fieldset>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:"12px"}}>
        <button onClick={handleFilter} className='btn_1'>Update results</button>
        <button onClick={handleClearFilter} className='btn_2'>Clear All Filters</button>
      </div>
    </div>
  )
}

export default Filter