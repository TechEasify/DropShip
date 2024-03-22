import React, { useState } from 'react';

import { Dialog } from '@mui/material';

import { UploadFile } from '../../../modules/FileLibrary/pages';

export default function AddImage({ onChooseImage }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="col-6 pf-py-4 pf-pr-8" onClick={() => setOpen(true)}>
        <div
          data-title=""
          data-toggle=""
          data-placement="top"
          data-html="true"
          className="layer-picker__type  pf-p-8 text-center pf-border"
        >
          <i className="pf-i pf-i-upload pf-i-24 pf-text-gray" />
          {/* <h6 className="pf-h6 pf-my-4">Choose file</h6> */}
          <input
            type="file"
            onChange={(event) => onChooseImage(event.target.files[0])}
          />
          <p className="pf-m-0 pf-text-muted pf-ui-caption ">
            Use your own design
          </p>
        </div>
      </div>

      {/* <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <UploadFile
          isDesign
          onChooseImage={(src) => {
            onChooseImage(src);
            setOpen(false);
          }}
        />
      </Dialog> */}
    </>
  );
}
