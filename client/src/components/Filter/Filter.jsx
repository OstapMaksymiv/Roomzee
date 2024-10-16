import React from 'react'
import './filter.scss'
const Filter = () => {
  return (
    <form className='filter'>
      <div style={{display:'flex', gap:'25px'}}>

        <div style={{display:'flex', flexDirection:'column', gap:'35px'}}>
          <fieldset>
            <legend>Location</legend>
            <div className='filter-searchBar' >
              <img className='searchImg' src="/searchIcon.svg" alt="" />
              <input type="text" name='filter-searchBar'  placeholder='Search location , city or area'/>
            </div>
          </fieldset>
          <div style={{display:'flex', gap:'35px'}}>
            <fieldset>
              <legend>Price</legend>
              <div className='price-block'>
                <input type="number" placeholder='Min'/>
                <input type="number" placeholder='Max' />
              </div>
            </fieldset>
            <fieldset>
              <legend>Size (m²)</legend>
              <div className='size-block'>
                <input type="number" placeholder='Min'/>
                <input type="number" placeholder='Max' />
              </div>
            </fieldset>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:"12px"}}>
            <button className='btn_1'>Update results</button>
            <button className='btn_2'>Clear All Filters</button>
          </div>
        </div>


        <div style={{display:'flex', gap:'15px', flexDirection:'column'}}>
          <fieldset>
            <legend >Property Type</legend>
            <div className='homeType-block'>
              <label to='Room' className='type'><input type="checkbox" id='Room' name='hometype'/> Room   <span class="checkmark"></span></label>
              <label to='Apartment' className='type'><input type="checkbox" id='Apartment' name='hometype'/> Apartment   <span class="checkmark"></span></label>
              <label to='House' className='type'><input type="checkbox" id='House' name='hometype'/> House   <span class="checkmark"></span></label>
              <label to='Studio' className='type'><input type="checkbox" id='Studio' name='hometype'/> Studio   <span class="checkmark"></span></label>
            </div>
          </fieldset>
          <div style={{display:'flex',flexDirection:"column",gap:'12px'}}>
            <fieldset>
              <legend>Number of Rooms</legend>
              <div className='amount-block'>
                <select>
                    <option value="" hidden selected>Min</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <select>
                    <option value="" hidden selected>Max</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
              </div>
            </fieldset>
            <fieldset className="rent-block">
              <legend>Rent/Buy</legend>
              <select>
                <option value="">Any</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </fieldset>
          </div>
        </div>
      </div>
      {/* <div style={{display:'flex', flexDirection:'column', gap:"12px"}}>
        <button className='btn_1'>Update results</button>
        <button className='btn_2'>Clear All Filters</button>
      </div> */}
    

    </form>
  )
}

export default Filter