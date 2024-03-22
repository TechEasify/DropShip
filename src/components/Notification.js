import React from 'react';

export default function Notification() {
  return (
    <>
      <li className="pf-d-inline-block">
        <ul className="nav customer-notifications pf-mt-0 pf-mr-0 pf-mr-md-12">
          <li className="dropdown notification-li">
            <a id="toggle-customer-notifications" data-toggle="dropdown" className="header__link dropdown-toggle pf-px-0 pf-d-md-flex pf-flex-column pf-flex-md-row pf-align-items-center">
              <i className="header__link__icon pf-i pf-i-bell pf-i-24 pf-mr-auto pf-mr-sm-4" />
              <span className="header__link__text">Notifications</span>
              <span className="notification-count pf-badge pf-badge-small pf-badge--primary">1</span>
            </a>
          </li>
        </ul>
      </li>
    </>
  );
}
