import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import { Step } from '@components/index';

import {
  CreateStepOne,
  CreateStepTwo,
  CreateStepThree,
} from '../containers';

import {
  ResetDesign,
} from '../action';
import Design from '../containers/Design';

const useStyle = makeStyles({
  root: {
    '& .MuiPaper-elevation4': {
      // boxShadow: '2px 3px 5px 1px #e5e5e5',
      borderRight: "1px solid rgb(255, 255, 255, .1)"
    },
  },

  appBar: {
    position: 'relative',
    background: 'rgb(241, 241, 241, 1)',
  },
});

const steps = [
  { step: 1, title: 'Design' },
  { step: 2, title: 'Review' },
];

const useQuery = () => new URLSearchParams(useLocation().search);

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function CreateProductTemplate() {
  const history = useHistory();
  const classes = useStyle();
  const query = useQuery();
  console.log(query, "query");
  const dispatch = useDispatch();

  let StepComponent = null;
  let isStepDone = 1;

  switch (query.get('step')) {
    case '2':
      StepComponent = <CreateStepTwo />;
      isStepDone = 2;
      break;
    case '3':
      StepComponent = <CreateStepThree />;
      isStepDone = 3;
      break;
    default:
      StepComponent = <Design />;
  }

  const StepBreadcrumbComponents = steps.map((step) => {
    if (step.step === isStepDone) {
      return <Step title={step.title} step={step.step} isDone key={step.title} />;
    }
    return <Step title={step.title} step={step.step} key={step.title} />;
  });

  const onCloseDialog = () => {
    dispatch(ResetDesign());
    history.push('/catalog');
  };

  return (
    <>
      <div
        className={classes.root}
        fullWidth
        maxWidth="xl"
        open
        TransitionComponent={Transition}
        onClose={onCloseDialog}
      >
        {/* <AppBar className={classes.appBar}>
          <Toolbar className="pf-d-flex pf-flex-wrap pf-justify-content-between pf-align-items-center">
            <div>
              <h4 className="pf-h3 pf-m-0 product-create">Create a product template</h4>
            </div>
            <div className="order-4 order-md-2 pf-width-max pf-width-md-auto pf-mt-16 pf-mt-md-0">
              <ul className="pf-steps pf-py-0 pf-border-0">
                <div className="pf-steps-wrap pf-steps--small pf-steps--oneside pf-steps--clickable pf-justify-content-center pf-justify-content-md-end">
                  {StepBreadcrumbComponents}
                </div>
                <span className="nav-arrow left hidden"><i className="pf-i pf-i-chevron-left pf-i-24 pf-pt-0" /></span>
                <span className="nav-arrow right hidden"><i className="pf-i pf-i-chevron-right pf-i-24 pf-pt-0" /></span>
              </ul>
            </div>
            <div className="order-3 text-right basis-md-auto basis-20">
              <span className="pf-i pf-i-32 pf-i-close pf-modal__close-icon" onClick={onCloseDialog} />
            </div>
          </Toolbar>
        </AppBar> */}
        <main className="modal-body mt-4" style={{ paddingBottom: 0 }}>
          {StepComponent}
        </main>
      </div>
    </>
  );
}
