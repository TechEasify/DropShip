import React, { useState } from 'react';
import { Button, Card, Icon, TextField } from '@shopify/polaris';
import { DeleteIcon } from '@shopify/polaris-icons';

export default function Template() {

  const [cost, setCost] = useState(11.90);
  const [shipping, setShipping] = useState(5);
  const [retailPrice, setRetailPrice] = useState(48);
  const [profit, setProfit] = useState(retailPrice - cost - shipping);

  const handleCostChange = (value) => {
    const newCost = value;
    setCost(newCost);
    setProfit(retailPrice - newCost - shipping);
  };

  const handleShippingChange = (value) => {
    const newShipping = value;
    setShipping(newShipping);
    setProfit(retailPrice - cost - newShipping);
  };

  const handleRetailPriceChange = (value) => {
    const newRetailPrice = value;
    setRetailPrice(newRetailPrice);
    setProfit(newRetailPrice - cost - shipping);
  };

  return (
    <>
      <div className='select-product'>
        <div className='product-head'>
          <h2 className='category-heading'>Select Product</h2>
        </div>
        <div className='main-card'>
          <Card>
            <div className='select-heading'>
              <h4 style={{ fontSize: 20, fontWeight: 600 }}>Natural Daily Moisturizer 1.7oz</h4>
            </div>
            <div className='select-stock'>
              <h6 style={{ fontSize: 16 }}>SKU: <span style={{ fontSize: 14 }}>natural-daily-moisturizer</span> | Stock: <span style={{ fontSize: 14 }}>1000</span></h6>
            </div>
            <div className='select-contain'>
              <div className='select-img'>
                <img
                  src='https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png'
                  className='product-img-select '
                />
              </div>
              <div className='select-detail'>
                <div className='select-price'>
                  <div className='select-cost'>
                    <p style={{ fontSize: 17 }}>Cost</p>
                    <TextField
                      type='number'
                      value={cost}
                      onChange={handleCostChange}
                    />
                  </div>
                  <div className='select-cost'>
                    <p style={{ fontSize: 17 }}>Shipping</p>
                    <TextField
                      type='number'
                      value={shipping}
                      onChange={handleShippingChange}
                    />
                  </div>
                  <div className='select-cost'>
                    <p style={{ fontSize: 17 }}>Retail Price</p>
                    <TextField
                      type='number'
                      value={retailPrice}
                      onChange={handleRetailPriceChange}
                    />
                  </div>
                  <div className='select-cost'>
                    <p style={{ fontSize: 17 }}>Profit</p>
                    <span style={{ color: "green", fontWeight: 600 }}>${profit + shipping}</span>
                  </div>
                </div>
                <div className='select-description'>
                  <div className='product-select-des'>
                    <p style={{ fontSize: 17, fontWeight: 600 }}>Description</p>
                  </div>
                  <div className='description-product'>
                    <p>Our product prices can change depending on where an order is fulfilled and which currency you use to pay for it.Each product has a fixed price for each location. Our North American products have a fixed USD price, and our products in Europe have a fixed EUR price.Products fulfilled in one location but charged in a different currency have a floating price.For example, let's say you're ordering a t-shirt that we only fulfill in the US and you're paying for it in EUR. The price you pay would be our USD price converted to EUR. The end price would also depend on that month's exchange rate, which is what makes it a floating price.If you're ordering a product that we fulfill in Europe and you're paying for it in EUR, you would pay our fixed EUR price.</p>
                    <p>Our product prices can change depending on where an order is fulfilled and which currency you use to pay for it.Each product has a fixed price for each location. Our North American products have a fixed USD price, and our products in Europe have a fixed EUR price.Products fulfilled in one location but charged in a different currency have a floating price.For example, let's say you're ordering a t-shirt that we only fulfill in the US and you're paying for it in EUR. The price you pay would be our USD price converted to EUR. The end price would also depend on that month's exchange rate, which is what makes it a floating price.If you're ordering a product that we fulfill in Europe and you're paying for it in EUR, you would pay our fixed EUR price.</p>
                    <p>Our product prices can change depending on where an order is fulfilled and which currency you use to pay for it.Each product has a fixed price for each location. Our North American products have a fixed USD price, and our products in Europe have a fixed EUR price.Products fulfilled in one location but charged in a different currency have a floating price.For example, let's say you're ordering a t-shirt that we only fulfill in the US and you're paying for it in EUR. The price you pay would be our USD price converted to EUR. The end price would also depend on that month's exchange rate, which is what makes it a floating price.If you're ordering a product that we fulfill in Europe and you're paying for it in EUR, you would pay our fixed EUR price.</p>
                  </div>
                </div>
                <div className='select-btn'>
                  <div className='delete-select'>
                    <Button className="delete-product">
                      <Icon
                        source={DeleteIcon}
                        tone="base"
                      />
                    </Button>
                  </div>
                  <div className='delete-select'>
                    <Button className="delete-product">
                      Push To Store
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
