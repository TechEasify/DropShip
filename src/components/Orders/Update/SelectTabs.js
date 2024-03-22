import React from 'react';

export default function SelectTabs() {
  return (
    <>
      <div className="pf-pb-24">
        <ul className="pf-tabs primary" style={{ top: 0 }}>
          <div className="tab-wrap">
            <li className="tab active">
              <a href="#">
                <span>New products</span>
              </a>
            </li>
            <li className="tab ">
              <a href="#">
                <span>My product templates</span>
              </a>
            </li>
          </div>
          <span className="nav-arrow left hidden">
            <i className="pf-i pf-i-chevron-left pf-i-24" />
          </span>
          <span className="nav-arrow right hidden">
            <i className="pf-i pf-i-chevron-right pf-i-24" />
          </span>
        </ul>
      </div>
    </>
  );
}
