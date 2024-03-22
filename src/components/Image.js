import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import PreviewImg from './UploadImage/PreviewImg';
import ConfirmDelImg from '../components/UploadImage/ConfirmDelete';

export default function Image(props) {
  const size = `${props.size} MB`;
  const { name, src, id, createdAt } = props;

  const [showModal, setModal] = useState(false);
  const [showModalDelImg, setModelDelImg] = useState(false);

  const handleShowModal = () => {
    setModal(!showModal);
  };

  const handleShowModalDelImg = () => {
    setModelDelImg(!showModalDelImg);
  };

  return (
    <>
      {src && name && (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 pf-mb-16 pf-mb-md-24 pf-mb-lg-32">
          <div className="item-holder">
            <a href="" className="pf-link-block">
              <div className="item">
                <img alt="" src={src} className="item-image" />
                <div className="overlay">
                  <a
                    onClick={handleShowModal}
                    href="#"
                    className="pf-btn pf-btn-secondary choose"
                  >
                    Preview
                  </a>
                  {props.isDesign ? (
                    <a
                      href="#"
                      className="pf-btn pf-btn-secondary choose"
                      onClick={() => props.onChooseImage(props.src)}
                    >
                      Choose
                    </a>
                  ) : null}
                </div>
              </div>
              <div className="details-holder">
                <div className="details" style={{ height: '153px' }}>
                  <div className="details-filename">{name}</div>
                  <ul className="attributes list-unstyled">
                    <li>
                      <div className="attr-title">Type: </div>
                      <div className="attr-value ">DropShippy</div>
                    </li>
                    <li>
                      <div className="attr-title">Size: </div>
                      <div className="attr-value ">{size}</div>
                    </li>
                  </ul>
                  <ul className="attributes list-unstyled" />
                </div>
              </div>
            </a>
            <div className="actions">
              <a
                data-toggle="tooltip"
                data-placement="top"
                data-container="body"
                data-trigger="hover"
                data-original-title="Preview"
                href="#"
                onClick={handleShowModal}
                className="icon preview"
              />
              <a
                data-toggle="tooltip"
                data-placement="top"
                data-container="body"
                data-trigger="hover"
                data-original-title="Download"
                href={src}
                className="icon download"
              />
              <a
                data-toggle="tooltip"
                data-placement="top"
                data-container="body"
                data-trigger="hover"
                data-original-title="Remove"
                href="#"
                onClick={handleShowModalDelImg}
                className="icon remove"
              />
            </div>
          </div>
        </div>
      )}
      <Dialog
        open={showModal}
        onClose={() => handleShowModal()}
        fullWidth
        maxWidth="md"
      >
        <PreviewImg
          id={id}
          previewModal={handleShowModal}
          createdAt={createdAt}
          size={size}
          name={name}
          src={src}
        />
      </Dialog>
      <Dialog
        open={showModalDelImg}
        onClose={() => handleShowModalDelImg()}
        fullWidth
        maxWidth="sm"
      >
        <ConfirmDelImg id={id} cancelDelImgModal={handleShowModalDelImg} />
      </Dialog>
    </>
  );
}
