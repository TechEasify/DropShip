import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import * as _ from 'lodash';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import shortId from 'shortid';

import { DialogActions, Popover, Typography } from '@mui/material';

import { useCanvas } from '../hooks';

import { clipByName } from '../utils';

import ListLayer from './ListLayer';
import TabProduct from './Tab.Product';
import TabDesign from './Tab.Design';

import data from '../assets';

import { ResetDesign, SaveDesign } from '../action';

const labelName = {
  front: 'Main',
  back: 'Label',
};

export default function Design({ type, onReview }) {
  const templateImage =
    'https://shopifyapp.iihtsrt.com/public/assets/uploads/collection/lavender.-without-logo.png';

  const backTemplateImage = data.label;

  const history = useHistory();
  const dispatch = useDispatch();

  const canvasSize = useRef(null);
  // console.log(canvasSize, "canvasSize");
  const canvasZone = useRef(null);
  // console.log(canvasZone, "canvasZone");

  const canvas = useCanvas(canvasSize, canvasZone);

  const [isReady, setIsReady] = useState(false);
  const [isCapture, setIsCapture] = useState(false);
  const [tab, setTab] = useState('product');
  const [template, setTemplate] = useState('front');
  const [objects, setObjects] = useState({
    front: [],
    back: [],
    left: [],
    right: [],
    in: [],
    out: [],
  });
  const [colors, setColors] = useState({ hexs: [], previews: [] });
  const [color, setColor] = useState('');

  const [activeButton, setActiveButton] = useState('design');
  const [showLayers, setShowLayers] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const TEMPLATE_OPTIONS = ['front', 'back'];

  useEffect(() => {
    if (
      currentStep === 3 &&
      objects['front'].length === 1 &&
      objects['back'].length === 1
    ) {
      history.push('/template/create?step=3');
    }
  }, [currentStep, objects]);

  // handle template function
  const changeTemplate = (newTemplate) => {
    if (TEMPLATE_OPTIONS.includes(newTemplate)) {
      setTemplate(newTemplate);
    } else {
      console.error('Invalid template option');
    }
  };

  // handle layout upload button function
  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === 'uploads') {
      if (objects[template].length >= 1) {
        setAnchorEl(document.getElementById('uploadsButton'));
        setIsPopoverOpen(true);
      } else {
        document.getElementById('fileInput').click();
      }
    } else if (button === 'layers') {
      setShowLayers(true);
    } else {
      setShowLayers(false);
    }
  };

  // Function to handle file selection
  const handleFileSelect = (event) => {
    if (objects[template].length >= 1) {
      setAnchorEl(event.currentTarget);
      setIsPopoverOpen(true);
      return;
    }

    const file = event.target.files[0];
    if (file instanceof Blob) {
      if (!canvas) {
        console.error('Canvas is not initialized yet.');
        return;
      }
      const clipPath = _.find(canvas.getObjects(), (o) => o.name === 'clip');
      const reader = new FileReader();
      reader.onload = () => {
        fabric.Image.fromURL(
          reader.result,
          (iomg) => {
            iomg.set({
              clipTo(ctx) {
                return _.bind(clipByName, iomg)(ctx, clipPath);
              },
            });
            iomg.scaleToWidth(clipPath.width);
            iomg.on('mousemove', () => {
              iomg.set({ isOld: true });
            });
            iomg.on('mouseup', () => {
              setIsCapture((preCapture) => !preCapture);
            });
            setObjects({
              ...objects,
              [template]: [...objects[template], iomg],
            });
            canvas.add(iomg);

            console.log('Uploaded Image URL:', reader.result);
          },
          {
            name: shortId.generate(),
            top: (clipPath.top + clipPath.height) / 2,
            left: clipPath.left,
            lockRotation: true,
            crossOrigin: 'anonymous',
          }
        );
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Invalid file object:', file);
    }
  };


  useEffect(() => {
    if (!canvas) {
      console.error('Canvas is not initialized yet.');
      return;
    }

    const clipRectangle = new fabric.Rect({
      width: 150,
      height: 120,
      top: 480,
      left: 420,
      fill: 'transparent',
      strokeDashArray: [5, 5],
      stroke: '#222',
      selectable: false,
      lockRotation: true,
      name: 'clip',
      visible: true,
      strokeWidth: 4,
    });

    let clipRectangleBack
    if (template === 'back') {
      clipRectangleBack = new fabric.Rect({
        width: 760,
        height: 350,
        top: 400,
        left: 65,
        fill: 'transparent',
        strokeDashArray: [5, 5],
        stroke: '#222',
        selectable: false,
        lockRotation: true,
        name: 'clip',
        visible: true,
        strokeWidth: 4,
      });

    }

    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = 'blue';
    fabric.Object.prototype.cornerStyle = 'circle';

    fabric.Image.fromURL(
      template === 'front' ? templateImage : backTemplateImage,
      (iomg) => {
        canvas.setBackgroundImage(iomg, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / iomg.width,
          scaleY: canvas.height / iomg.height,
        });

        console.log(canvas.width, 'canvas.width');
        console.log(canvas.height, 'canvas.height');
      },
      {
        selectable: false,
        name: 'bg',
        width: canvas.width,
        height: canvas.height,
        crossOrigin: 'Anonymous',
      }
    );

    fabric.Image.fromURL(
      data.drop,
      (dropImage) => {
        // canvas.centerObjectH(iomg);
        // canvas.add(iomg);

        switch (template) {
          case 'front':
            clipRectangle.set({
              width: 150,
              height: 120,
              top: 480,
              left: 420,
              lockRotation: true,
            });
            dropImage.set({
              strokeDashArray: [5, 5],
              stroke: '#222',
              top: 480,
              left: 420,
              width: 150,
              height: 120,
              fill: 'yellow',
            });
            dropImage.scaleToWidth(clipRectangle.width);
            canvas.add(clipRectangle);
            break;
          case 'back':
            clipRectangleBack.set({
              width: 760,
              height: 350,
              top: 400,
              left: 65,
              lockRotation: true,
            });
            dropImage.set({
              strokeDashArray: [5, 5],
              stroke: '#222',
              top: 400,
              left: 280,
              width: 280,
              height: 250,
              fill: 'yellow',
            });
            dropImage.scaleToWidth(clipRectangleBack.width);
            canvas.add(clipRectangleBack);
            break;

          default:
        }
        canvas.add(dropImage);

        setIsReady(true);
      },
      {
        top: 519,
        left: 397,
        fill: 'yellow',
        name: 'drop',
        crossOrigin: 'Anonymous',
        selectable: false,
      }
    );

    return () => {
      if (canvas) {
        canvas.clear();
      }
      setIsReady(false);
      setObjects((preObjects) => ({
        ...preObjects,
        [template]: preObjects[template].map((object) => {
          delete object.isRender;
          return object;
        }),
      }));
    };
  }, [canvas, templateImage, template, backTemplateImage]);

  useEffect(() => {
    if (canvas && isReady && !_.isEmpty(canvas.getObjects())) {
      const clipPath = _.find(canvas.getObjects(), (o) => o.name === 'clip');
      const dropImage = _.find(canvas.getObjects(), (o) => o.name === 'drop');
      if (canvas.getObjects().length > 2) {
        clipPath.set({ visible: true });
        dropImage.set({ visible: false });
      } else {
        clipPath.set({ visible: false });
        dropImage.set({ visible: true });
      }
      canvas.renderAll();
    }
  });

  useEffect(() => {
    if (objects[template].length > 0 && isReady) {
      objects[template].forEach((object) => {
        if (!object.isRender) {
          object.set({ isRender: true });
          if (!object.isOld) {
            canvas.centerObjectH(object);
          }
          canvas.add(object).setActiveObject(object);
        }
      });
    }
    setIsCapture((preCapture) => !preCapture);
  }, [objects, isReady]);

  const onModifyObjects = (newObjects) => {
    objects[template].forEach((object) => {
      canvas.remove(object);
    });

    setObjects({
      ...objects,
      [template]: !_.isEmpty(newObjects)
        ? newObjects.map((obj) => {
            delete obj.isRender;
            return obj;
          })
        : [],
    });
  };

  const onSaveTextObject = (textId) => {
    const textObject = _.find(canvas.getObjects(), (o) => o.name === textId);
    canvas.remove(textObject);

    textObject.on('mousemove', () => {
      textObject.set({ isOld: true });
    });

    textObject.on('mouseup', () => {
      setIsCapture((preCapture) => !preCapture);
    });

    textObject.cloneAsImage((image) => {
      textObject.set({ image });

      setObjects({
        ...objects,
        [template]: [...objects[template], textObject],
      });
    });
  };

  // handle continue button function
  const onSaveDesign = (design) => {
    if (template === 'front') {
      setTemplate('back');
      setCurrentStep(2);
    } else if (template === 'back') {
      setCurrentStep(3);
      // Proceed with further actions
      setTemplate('back');
      const cloneCanvas = _.cloneDeep(canvas);
      console.log(cloneCanvas, 'cloneCanvas');

      const cObjects = cloneCanvas.getObjects();
      const [clipPath] = cObjects.filter((object) => object.name === 'clip');
      clipPath.set({ visible: false });
      const imagePreview = cloneCanvas.toDataURL();
      console.log(imagePreview, 'imagePreview');

      dispatch(
        SaveDesign(design, { preview: imagePreview, design: imagePreview })
      );

      history.push('/template/create?step=3');
    }
    console.log(objects, 'objects');
  };

  const onChangeDesignTemplate = (desgin) => {
    changeTemplate(desgin);

    if (objects[template].length > 0) {
      onSaveDesign(template, canvas);
    }
    history.push(`/template/create?step=2&design=${desgin}&type=oil`);
  };

  const onBack = () => {
    if (template === 'back') {
      setTemplate('front');
      setCurrentStep(1);
    }
    dispatch(ResetDesign());
    history.push('/template/create?step=1');
  };

  const isContinueDisabled = () => {
    if (currentStep === 1 && objects['front'].length !== 1) {
      return true;
    } else if (currentStep === 2 && objects['back'].length !== 1) {
      return true;
    }
    return false;
  };

  // handle close popover close function
  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  return (
    <>
      <div
        className="pf-mb-48  dropzone dropzone-1"
        id="js--product-push-designer"
      >
        <div className="row">
          <Popover
            open={isPopoverOpen}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }} style={{ color: 'red' }}>
              Cannot upload multiple image.
            </Typography>
          </Popover>
          <div className="design-imges">
            <div className="designer-sidebar">
              <div class="sidebar-product">
                <div className="nav-select bg-color">
                  <div className="btn-design">
                    <button
                      onClick={() => handleButtonClick('layers')}
                      className={`item pf-text-center pf-py-8 pf-py-md-12 pf-px-2 pf-my-8 pf-my-md-4 pf-cursor-pointer pf-d-inline-block pf-d-md-block pf-btn-unstyled ${
                        activeButton === 'layers' ? 'active' : ''
                      }`}
                    >
                      <i className="sidebar-navigation-icon pf-i pf-i-24 pf-i-layers-outline"></i>
                      <span className="title pf-ui-legal pf-d-block pf-mt-4">
                        Layers
                      </span>
                    </button>
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                  />
                  {objects[template].length !== 1 ? (
                    <div className="btn-design">
                      <button
                        onClick={() => handleButtonClick('uploads')}
                        className={`item pf-text-center pf-py-8 pf-py-md-12 pf-px-2 pf-my-8 pf-my-md-4 pf-cursor-pointer pf-d-inline-block pf-d-md-block pf-btn-unstyled ${
                          activeButton === 'uploads' ? 'active' : ''
                        }`}
                      >
                        <i
                          data-v-f7d35098=""
                          data-test=""
                          aria-hidden="true"
                          class="sidebar-navigation-icon pf-i pf-i-24 pf-i-upload"
                        ></i>{' '}
                        <span
                          data-v-f7d35098=""
                          class="title pf-ui-legal pf-d-block pf-mt-4"
                        >
                          Uploads
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="btn-design">
                      <button
                        onClick={() => handleButtonClick('uploads')}
                        className={`item pf-text-center pf-py-8 pf-py-md-12 pf-px-2 pf-my-8 pf-my-md-4 pf-cursor-pointer pf-d-inline-block pf-d-md-block pf-btn-unstyled ${
                          activeButton === 'uploads' ? 'active' : ''
                        }`}
                        disabled={objects[template].length !== 1}
                      >
                        <i
                          data-v-f7d35098=""
                          data-test=""
                          aria-hidden="true"
                          class="sidebar-navigation-icon pf-i pf-i-24 pf-i-upload"
                        ></i>{' '}
                        <span
                          data-v-f7d35098=""
                          class="title pf-ui-legal pf-d-block pf-mt-4"
                        >
                          Uploads
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="nav-select">
                  {showLayers && (
                    <>
                      <div className="layers-list">
                        <div className="layers-head">
                          <h6>Layers:</h6>
                        </div>
                        <div className="layers-tab">
                          <DndProvider backend={HTML5Backend}>
                            {objects[template].length > 0 && (
                              <>
                                <ListLayer
                                  objects={objects[template]}
                                  canvas={canvas}
                                  onModifyObjects={onModifyObjects}
                                />
                              </>
                            )}
                          </DndProvider>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div
                className="col-12 col-md-8 pr-0"
                // style={{ padding: 0, height: 1080 }}
                ref={canvasSize}
              >
                <div className="text-center">
                  <ul
                    className="pf-tabs secondary tabs-center "
                    style={{ top: 0 }}
                  >
                    <div className="tab-wrap">
                      {Object.keys(objects).map((key) => (
                        <li
                          key={key}
                          className={clsx(
                            'tab',
                            template === key ? 'active' : ''
                          )}
                        >
                          <a
                            href="#"
                            onClick={() => onChangeDesignTemplate(key)}
                          >
                            <span>{labelName[key]}</span>
                          </a>
                        </li>
                      ))}
                    </div>
                    <span className="nav-arrow left hidden">
                      <i className="pf-i pf-i-chevron-left pf-i-24" />
                    </span>
                    <span className="nav-arrow right hidden">
                      <i className="pf-i pf-i-chevron-right pf-i-24" />
                    </span>
                  </ul>
                </div>

                <canvas id="c" ref={canvasZone} />
                <div className="pf-mb-8" />
                <div className="generator-variant-area">
                  {colors.previews.map(
                    (preview) => (
                      console.log(preview, 'preview'),
                      (
                        <div
                          className="variant-item active"
                          title=""
                          role="button"
                          onClick={() => setColor(preview.color)}
                          key={preview.color}
                        >
                          <div className="quality-icon" />
                          <div
                            className="generator-mockup-preview pf-mx-auto"
                            style={{ minHeight: 100, width: 100 }}
                          >
                            <div
                              style={{
                                backgroundImage: `url("${preview.image}")`,
                              }}
                            />
                            <div />
                          </div>
                          <div />
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <TabDesign
            canvas={canvas}
            onChooseImage={handleFileSelect}
            onSaveTextObject={onSaveTextObject}
            visible={tab === 'design' ? 'block' : 'none'}
          />
        </div>
      </div>

      <DialogActions
        style={{ position: 'sticky', bottom: 0, backgroundColor: 'white' }}
      >
        <div className="dynamic-sticky-footer  pf-p-0 pf-py-md-16">
          <div className="dynamic-sticky-footer__second-wrap">
            <div className="dynamic-sticky-footer__second">
              <div className="container">
                <div>
                  <div className="row no-gutters pf-px-12 pf-px-md-0 pf-pt-8 pf-pt-md-0">
                    <div
                      className="row no-gutters pf-px-12 pf-px-md-0 pf-pt-8 pf-pt-md-0"
                      style={{ justifyContent: 'end' }}
                    >
                      <div className="col-12 col-md-auto order-2 order-md-1 pf-d-flex pf-align-items-stretch">
                        <a
                          href="#"
                          className="pf-btn pf-btn-secondary pf-mr-12 pf-w-25 pf-w-md-auto"
                          onClick={onBack}
                        >
                          Back
                        </a>
                        <a
                          href="#"
                          className={`pf-btn pf-btn-primary pf-w-75 pf-w-md-auto ${
                            isContinueDisabled() ? 'disabled' : ''
                          }`}
                          onClick={onSaveDesign}
                        >
                          Continue
                          <span className="pf-i pf-i-chevron-right pf-i-16 pf-pl-8" />
                        </a>
                      </div>
                    </div>
                    <div className="col-12 col-md-auto order-3 order-md-2">
                      <div className="pf-text-red pf-bold pf-pb-8 pf-pb-md-0 pf-px-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogActions>
    </>
  );
}
