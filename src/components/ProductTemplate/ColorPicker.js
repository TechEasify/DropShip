import React from 'react';
import clsx from 'clsx';

export default function ColorPicker({ colors, onToggleColor, error }) {
  const colorComponents = colors.map(({ color, isChoose }) => (
    <a
      href="#"
      className={clsx('swatches__item', isChoose ? 'swatches__item--active' : '')}
      role="button"
      onClick={() => onToggleColor(color)}
      key={color}
    >
      <span style={{ backgroundColor: color }} />
    </a>
  ));

  return (
    <>
      <div>
        <div className="generator-color-picker">
          <div className="margin-bottom-30">
            <h6>Choose colors:</h6>
            {/* <label className="margin-bottom-5" style={{ fontWeight: 'normal' }}>
              <input type="checkbox" />
              <span className="margin-left-10">Select all colors</span>
            </label> */}
            <div>
              <div className="swatches pf-m-0 pf-mb-12  swatches--huge swatches--click">
                {colorComponents}
              </div>
            </div>
            {
              error
                ? <div className="alert alert-danger text-center padding-10 ">Please select at least one color!</div> : null
            }
          </div>
        </div>
      </div>
    </>
  );
}
