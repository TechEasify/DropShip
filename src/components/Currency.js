import React from 'react';

export default function Currency() {
  return (
    <>
      <li className="pf-d-flex">
        <a className="pf-mr-16 pf-d-none pf-d-md-flex pf-mt-8 pf-py-12 pf-mx-8 user-settings js-user-settings-toggle pf-flex-column pf-flex-md-row pf-align-items-center">
          <i className="header__link__icon pf-i pf-i-24 pf-i-currency-usd" />
          <span className="header__link__text pf-ml-sm-4">USD</span>
        </a>
      </li>
    </>
  );
}
