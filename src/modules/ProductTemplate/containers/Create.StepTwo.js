import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as _ from 'lodash';

import { Snackbar } from '@mui/material';

import { Alert as MuiAlert } from '@mui/lab';

import Design from './Design';
import { SaveDesign } from '../action';

// import { SaveDesign, SaveColors } from '../action';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useQuery = () => new URLSearchParams(useLocation().search);

export default function CreateStepTwo() {
  const query = useQuery();
  console.log(query, "query");
  const dispatch = useDispatch();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState('');

  const onSaveDesign = (design, canvas) => {
    canvas.set({ backgroundColor: '#FFF' });

    const cloneCanvas = _.cloneDeep(canvas);
    const cObjects = cloneCanvas.getObjects();
    console.log(cloneCanvas);
    const [clipPath] = cObjects.filter((object) => object.name === 'clip');
    clipPath.set({ visible: false });
    const imagePreview = cloneCanvas.toDataURL();
    console.log(imagePreview);
    const [bg] = cObjects.filter((object) => object.name === 'bg');
    bg.set({ visible: false });
    const designImage = cloneCanvas.toDataURL();
    console.log(designImage, "designImage");
    
    dispatch(
      SaveDesign(design, { preview: imagePreview, design: designImage })
    );
  };

  const onReview = (objects, colors) => {
    let isEmpty = 0;

    // Object.values(objects).forEach((object) => {
    //   if (_.isEmpty(object)) {
    //     isEmpty += 1;
    //   }
    // });

    // if (_.isEmpty(colors)) {
    //   setErrorMessage('There is no color selected!');
    // } else if (isEmpty === Object.keys(objects).length) {
    //   setErrorMessage('There is no design added!');
    // } else {
    //   dispatch(SaveColors(colors.map((color) => ({ hex: color }))));

     
    // }

    history.push('/template/create?step=3');
  };

  const DesignComponent = (
    <Design
      template={query.get('design')}
      type={query.get('type')}
      onReview={onReview}
      onSaveDesign={onSaveDesign}
    />
  );

  return (
    <>
      {DesignComponent}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage('')}
      >
        <Alert
          onClose={() => setErrorMessage('')}
          severity="error"
          style={{ fontSize: 15 }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
