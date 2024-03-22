import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as _ from 'lodash';

import { ColorPicker, ProductInfo } from '@components/ProductTemplate';

import { SaveName, SaveTechnique } from '../action';

export default function TabProduct({ onChooseColor, visible }) {
  const dispatch = useDispatch();

  const [colors, setColors] = useState([]);
  const [productName, setProductName] = useState('');
  const [error, setError] = useState(false);
  const [technique, setTechnique] = useState('dtg');

  useEffect(() => {
    // setColors([
    //   { color: '#4D4D4D', isChoose: false },
    //   { color: '#999999', isChoose: false },
    //   { color: '#FFFFFF', isChoose: false },
    //   { color: '#F44E3B', isChoose: false },
    // ]);
    // setError(true);
  }, []);

  useEffect(() => {
    setProductName('Essential Oil');
    dispatch(SaveName('Essential Oil'));
  }, []);

  useEffect(() => {
    dispatch(SaveTechnique(technique));
  }, [technique]);

  const onToggleColor = (chooseColor) => {
    setError(false);
    let currentColor = chooseColor;
    const unChooseColor = colors.find(
      (color) => color.color === chooseColor && color.isChoose
    );
    if (unChooseColor) {
      const anotherChooseColor = colors.find(
        (color) => color.color !== chooseColor && color.isChoose
      );
      if (anotherChooseColor) {
        currentColor = anotherChooseColor.color;
      } else {
        setError(true);
      }
    }

    const newColors = colors.map((color) =>
      color.color === chooseColor
        ? { ...color, isChoose: !color.isChoose }
        : color
    );
    const chooseColors = newColors.filter((color) => color.isChoose);
    onChooseColor(
      chooseColors.map((color) => color.color),
      currentColor
    );
    setColors(newColors);
  };

  return (
    <>
      <div style={{ display: visible }}>
        <ProductInfo name={productName} />
        <div>
          <div className="row no-gutters">
            <hr />
          
          </div>
        </div>
        <div className="pf-mb-24" />
        <div>
          <hr />
        </div>
        {/* <ColorPicker
          colors={colors}
          onToggleColor={onToggleColor}
          error={error}
        /> */}
      </div>
    </>
  );
}
