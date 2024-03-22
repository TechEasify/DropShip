import React, { useEffect, useState } from 'react';
import './UploadFile.scss';
import { UserGetIMG } from '../actions';
import { UploadImage, Image, PreviewImg } from '../../../components';

export default function UploadFile({ isDesign, onChooseImage }) {
  const [images, setImages] = useState([]);
  const [myFile, setMyFile] = useState(true);
  const [sampleFile, setSampleFile] = useState(false);

  useEffect(() => {
    UserGetIMG()
      .then((res) => {
        setImages(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClickHandle = (e) => {
    const { id } = e.target.parentElement;

    if (id === 'myFile') {
      setMyFile(true);
      setSampleFile(false);
    } else if (id === 'sampleFile') {
      setMyFile(false);
      setSampleFile(true);
    }
  };

  return (
    <>
      <div className="container-fluid dashboard__container pf-bg-white clearfix">
        <h2 className="pf-h2 pf-my-40">File library</h2>
        <div id="main-file-library">
          <div data-content="Drop files here" className="file-library dropzone">
            <div className="margin-bottom-20">
              <ul className="pf-tabs primary" style={{ top: '0px' }}>
                <div className="tab-wrap">
                  <li
                    id="myFile"
                    className={`tab ${myFile ? 'active' : ''}`}
                    onClick={onClickHandle}
                  >
                    <span>My files</span>
                  </li>
                  {/* <li
                    id="sampleFile"
                    className={`tab ${sampleFile ? 'active' : ''}`}
                    onClick={onClickHandle}
                  >
                    <span>Sample files</span>
                  </li> */}
                </div>
                <span className="nav-arrow left hidden">
                  <i className="pf-i pf-i-chevron-left pf-i-24" />
                </span>
                <span className="nav-arrow right hidden">
                  <i className="pf-i pf-i-chevron-right pf-i-24" />
                </span>
              </ul>
            </div>
            <div>
              <div className="filter">
                <div className="filter-store-select">
                  <select className="styled-select">
                    <option value="4772535">Personal orders</option>
                  </select>
                </div>
                <div className="filter-search">
                  <div style={{ minHeight: '39px' }}>
                    <input
                      type="text"
                      id="library-search-1"
                      style={{ display: 'none' }}
                    />
                    <div
                      id="library-search-1_tagsinput"
                      className="tagsinput"
                      style={{
                        width: 'auto',
                        minHeight: '39px',
                        height: '100%',
                      }}
                    >
                      <div id="library-search-1_addTag">
                        <span
                          role="status"
                          aria-live="polite"
                          className="ui-helper-hidden-accessible"
                        />
                        <input
                          id="library-search-1_tag"
                          value=""
                          data-default="Search files"
                          className="ui-autocomplete-input"
                          autoComplete="off"
                          style={{
                            color: 'rgb(102, 102, 102)',
                            fontFamily: 'helvetica',
                            width: '168px',
                          }}
                        />
                      </div>
                      <div className="tags_clear" />
                    </div>
                  </div>
                </div>
                <div className="filter-upload-methods">
                  <UploadImage />
                </div>
                <div className="clearfix" />
              </div>
              <div className="file-mover hidden">
                <div className="alert alert-warning">
                  <div className="row">
                    <div className="col-md-6 margin-top-10">
                      Selected store is removed. You can move files to another
                      store:
                    </div>
                    <div className="col-md-4">
                      <span
                        className="styled-select"
                        style={{ paddingRight: '45px' }}
                      >
                        <select>
                          <option data-status="active" value="4772535">
                            Personal orders
                          </option>
                        </select>
                      </span>
                    </div>
                    <div className="col-md-2">
                      <a
                        data-toggle="tooltip"
                        data-placement="top"
                        data-container="body"
                        data-trigger="hover"
                        data-original-title="Please select at least one file"
                        href=""
                        className="pf-btn pf-btn-secondary btn-sm btn-block"
                      >
                        Move
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <div className="text-center pf-my-24">
                      <nav className="pf-d-inline-block" />
                    </div>
                  </div>
                  <div className="row list">
                    <div />
                    {myFile &&
                      images &&
                      images.length &&
                      images.map((image, idx) => (
                        <Image
                          id={image.id}
                          key={String(idx)}
                          src={image.url}
                          name={image.name}
                          size={image.size}
                          createdAt={image.created_at}
                          isDesign={isDesign}
                          onChooseImage={onChooseImage}
                        />
                      ))}
                    <div className="clearfix" />
                  </div>
                </div>
              </div>
            </div>
            <div className={sampleFile ? '' : 'hidden'}>
              <div>
                <div>
                  <div className="row list">
                    {images && images.length && (
                      <Image
                        id={images[1].id}
                        src={images[1].url}
                        name={images[1].name}
                        size={images[1].size}
                        createdAt={images[1].created_at}
                        isDesign={images[1].isDesign}
                        onChooseImage={onChooseImage}
                      />
                    )}
                  </div>
                  <div className="clearfix" />
                </div>
                <div />
              </div>
            </div>
          </div>
          <ul
            className="ui-autocomplete ui-front ui-menu ui-widget ui-widget-content ui-corner-all"
            id="ui-id-1"
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <div className="conta-iner-fluid dashboard__container clearfix embedded-overlay" />
    </>
  );
}
