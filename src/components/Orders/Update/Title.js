import React from 'react';

export default function Title() {
  return (
    <>
      <div>
        <span
          className="twitter-typeahead"
          style={{
            position: 'relative',
            display: 'inline-block',
          }}
        >
          <input
            type="search"
            className="tt-hint"
            readOnly
            autoComplete="off"
            spellCheck="false"
            tabIndex={-1}
            dir="ltr"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              borderColor: 'transparent',
              boxShadow: 'none',
              opacity: 1,
            }}
          />
          <input
            placeholder="Search products…"
            type="search"
            className="tt-input"
            autoComplete="off"
            spellCheck="false"
            dir="auto"
            style={{
              position: 'relative',
              verticalAlign: 'top',
              backgroundColor: 'transparent',
            }}
          />
          <pre
            aria-hidden="true"
            style={{
              position: 'absolute',
              visibility: 'hidden',
              whiteSpace: 'pre',
            }}
          />
          <div
            className="tt-menu"
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              width: '100%',
              zIndex: 6,
              display: 'none',
            }}
          >
            <div className="tt-dataset tt-dataset-products" />
          </div>
        </span>
      </div>
    </>
  );
}
