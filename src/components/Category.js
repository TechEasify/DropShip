import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,

  
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {
  ChevronDown,
} from 'react-feather';

const useStyle = makeStyles({
  categories: {
    boxShadow: 'none',
    '& .MuiAccordionDetails-root': {
      padding: 0,
    },
    '& .MuiAccordionSummary-root': {
      padding: 0,
    },
    '& .MuiAccordionSummary-root a': {
      display: 'block',
      borderBottom: '1px solid #d8d8d8',
      padding: '0 0 5px',
      fontSize: 16,
      fontWeight: 700,
      color: '#222',
      width: '100%',
      textDecoration: 'none',
    },
  },
});

export default function Category({
  name,
  kids,
  isExpand,
  onChooseCategory,
}) {
  const classes = useStyle();
  const [expanded, setExpanded] = useState(false);

  let ChildrenComponents = null;

  if (!_.isEmpty(kids)) {
    ChildrenComponents = kids.map((child) => <li className="catalog__sidebar-menu__item pf-py-4" key={child.id}><a href="#" onClick={() => onChooseCategory(child.id)}>{child.name}</a></li>);
  }

  useEffect(() => {
    if (isExpand) {
      setExpanded(isExpand);
    }
    return () => {
      setExpanded(false);
    };
  }, [isExpand]);

  return (
    <>
      <li className="catalog__sidebar-menu__item pf-py-4 mb-0">
        <Accordion className={classes.categories} expanded={expanded} onChange={() => setExpanded(!expanded)}>
          <AccordionSummary expandIcon={<ChevronDown />}>
            <a href="#">
              {name}
            </a>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="catalog__sidebar-menu" style={{ height: 'auto' }}>
              {ChildrenComponents}
            </ul>
            <div className="catalog__sidebar-menu__current-item" />
          </AccordionDetails>
        </Accordion>
      </li>
    </>
  );
}
