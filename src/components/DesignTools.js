import React from 'react';

import { Button } from '@mui/material';

export default function DesignTools({ onImageSelect, onAddText }) {
  return (
    <>
      <div>
        <div className="row row-flex row-flex--center no-gutters">
          <div className="col-6 pf-py-4 pf-pr-8">
            <div data-title="" data-toggle="" data-placement="top" data-html="true" className="layer-picker__type  pf-p-8 text-center pf-border">
              <i className="pf-i pf-i-upload pf-i-24 pf-text-gray" />
              <div className="pf-h6 pf-my-4">
                <Button
                  variant="contained"
                  component="label"
                >
                  Upload image
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={onImageSelect}
                  />
                </Button>
              </div>
            </div>
          </div>
          <div className="col-6 pf-py-4 ">
            <div data-title="" data-toggle="" data-placement="top" data-html="true" className="layer-picker__type  pf-p-8 text-center pf-border" onClick={onAddText}>
              <i className="pf-i pf-i-format-font pf-i-24 pf-text-gray" />
              <h6 className="pf-h6 pf-my-4">Add text</h6>
              <p className="pf-m-0 pf-text-muted pf-ui-caption pf-d-none">Create a text-based design</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
