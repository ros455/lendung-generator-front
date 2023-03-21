import React from 'react'

const Discount = ({lowPrice, percent, price}) => {
  return (
    <div className='discount'>
      <div className="discount__lowPrice">
        <div className="discount__lowPrice-value">{lowPrice}</div>
        <span className="discount__lowPrice-value-uah">грн</span>
      </div>
      <div className="discount__title">
        <div className="discount__title-text">
          <div className="discount__title-text1">ЗНИЖКА</div>
          <div className="discount__title-text2">{percent}%</div>
        </div>
        <div className="discount__title-frame"></div>
      </div>
      <div className="discount__price">
        <div className="discount__price-value"><span className="discount__price-text">від</span>{price}</div>
      </div>
    </div>
  )
}

export default Discount