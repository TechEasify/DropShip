import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import * as _ from 'lodash';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import shortId from 'shortid';

import { DialogActions, Popover, Typography } from '@mui/material';

import { useCanvas } from '../hooks';

import { clipByName } from '../utils';

import ListLayer from './ListLayer';

import data from '../assets';

import { ResetDesign, SaveDesign } from '../action';
import { Canvg } from 'canvg';
import TabDesign from './Tab.Design';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';

// Defining labels for different templates
const labelName = {
  front: 'Main',
  back: 'Label',
};

// Main component
export default function Design({ onReview }) {
  const type = 'oil';
  const templateImage =
    'https://shopifyapp.iihtsrt.com/public/assets/uploads/collection/lavender.-without-logo.png';

  const backTemplateImage = data.label;

  const history = useHistory();
  const dispatch = useDispatch();

  const canvasSize = useRef(null);
  const canvasZone = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [uploadCanvas, setUploadCanvas] = useState(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [template, setTemplate] = useState('front');
  const [showLayers, setShowLayers] = useState(false);
  const [activeButton, setActiveButton] = useState('design');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [colors, setColors] = useState({ hexs: [], previews: [] });
  const [color, setColor] = useState('');
  const [tab, setTab] = useState('product');
  const [currentStep, setCurrentStep] = useState(1);
  const objectsRef = useRef({
    front: [],
    back: [],
    left: [],
    right: [],
    in: [],
    out: [],
  });

  const TEMPLATE_OPTIONS = ['front', 'back'];

  useEffect(() => {
    setSize({
      width: canvasSize.current.offsetWidth,
      height: canvasSize.current.offsetHeight,
    });
  }, [canvasSize]);

  useEffect(() => {
    if (canvasSize.width !== 0) {
      setCanvas(
        new fabric.Canvas(canvasZone.current, {
          width: 1080,
          height: 1080,
          preserveObjectStacking: true,
        })
      );
      setUploadCanvas(
        new fabric.Canvas(canvasZone.current, {
          width: 800,
          height: 800,
          preserveObjectStacking: true,
        })
      );
    }
  }, [canvasSize, canvasZone]);

  useEffect(() => {
    if (
      currentStep === 3 &&
      objectsRef.current['front'].length === 1 &&
      objectsRef.current['back'].length === 1
    ) {
      history.push('/template/create?step=3');
    }
  }, [currentStep, objectsRef.current]);

  const changeTemplate = (newTemplate) => {
    if (TEMPLATE_OPTIONS.includes(newTemplate)) {
      setTemplate(newTemplate);
    } else {
      console.error('Invalid template option');
    }
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === 'uploads') {
      if (objectsRef.current[template].length >= 1) {
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

  useEffect(() => {
    if (!uploadCanvas || !canvas) {
      console.error('Canvas is not initialized yet.');
      return;
    }

    const clipRectangle = new fabric.Rect({
      width: 210,
      height: 75,
      top: 360,
      left: 260,
      fill: 'transparent',
      strokeDashArray: [5, 5],
      stroke: 'red',
      selectable: false,
      lockRotation: true,
      name: 'clip',
      visible: true,
      strokeWidth: 4,
    });

    let clipRectangleBack;
    if (template === 'back') {
      clipRectangleBack = new fabric.Rect({
        width: 560,
        height: 250,
        top: 300,
        left: 50,
        fill: 'transparent',
        strokeDashArray: [5, 5],
        stroke: 'red',
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
      template === 'back' ? backTemplateImage : templateImage,
      (iomg) => {
        canvas.setBackgroundImage(iomg, canvas.renderAll.bind(canvas), {
          // scaleX: canvas.width / iomg.width,
          // scaleY: canvas.height / iomg.height,
          scaleX: 0.8,
          scaleY: 0.8,
          // top: 400,
          // originX: 'left',
          // originY: 'center',
        });
        uploadCanvas.setBackgroundImage(
          iomg,
          uploadCanvas.renderAll.bind(uploadCanvas),
          {
            // scaleX: uploadCanvas.width / iomg.width,
            // scaleY: uploadCanvas.height / iomg.height,
            scaleX: 0.9,
            scaleY: 0.9,
            // top: 400,
            // originX: 'left',
            // originY: 'center',
          }
        );
        //         var img1 = iomg.set({
        //           left: 0,
        //           top: 0
        //         });
        //         iomg.scaleToHeight(1080);
        //         iomg.scaleToWidth(1080);;
        //         console.log(img1, "img1");
        //  canvas.add(img1);
        //  uploadCanvas.add(img1)
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
        switch (template) {
          case 'front':
            clipRectangle.set({
              width: 260,
              height: 100,
              top: 430,
              left: 315,
              lockRotation: true,
            });
            dropImage.set({
              strokeDashArray: [5, 5],
              stroke: '#222',
              top: 430,
              left: 315,
              width: 260,
              height: 100,
              fill: 'yellow',
              clipPath: new fabric.Rect({
                absolutePositioned: true,
                originX: 'center',
                originY: 'center',
              }),
            });
            var resizeFilter = new fabric.Image.filters.Resize({
              scaleX: 0.5,
              scaleY: 0.5,
            });

            console.log(resizeFilter, 'resizeFilter');

            // Apply the Resize filter to the dropImage
            dropImage.filters.push(resizeFilter);
            dropImage.applyFilters();
            canvas.add(clipRectangle);
            break;
          case 'back':
            clipRectangleBack.set({
              width: 680,
              height: 310,
              top: 360,
              left: 60,
              lockRotation: true,
            });
            dropImage.set({
              strokeDashArray: [5, 5],
              stroke: '#222',
              top: 360,
              left: 60,
              width: 680,
              height: 310,
              clipPath: new fabric.Rect({
                absolutePositioned: true,
                originX: 'center',
                originY: 'center',
              }),
            });
            var resizeFilterBack = new fabric.Image.filters.Resize({
              scaleX: 0.5,
              scaleY: 0.5,
            });

            console.log(resizeFilterBack, 'resizeFilterBack');

            // Apply the Resize filter to the dropImage
            dropImage.filters.push(resizeFilterBack);

            // Apply filters to the dropImage
            dropImage.applyFilters();
            canvas.add(clipRectangleBack);
            break;
          default:
        }
        // Add masking
        dropImage.clipPath =
          template === 'front' ? clipRectangle : clipRectangleBack;
        canvas.add(dropImage);
      },
      {
        name: 'drop',
        crossOrigin: 'Anonymous',
        selectable: false,
      }
    );

    return () => {
      if (canvas) {
        canvas.clear();
      }
    };
  }, [canvas, uploadCanvas, templateImage, template, backTemplateImage]);

  useEffect(() => {
    if (canvas && uploadCanvas && objectsRef.current[template].length > 0) {
      objectsRef.current[template].forEach((object) => {
        if (!object.isRender) {
          object.set({ isRender: true });
          if (!object.isOld) {
            canvas.centerObjectH(object);
          }
          canvas.add(object).setActiveObject(object);
        }
      });

      // Clear the uploadCanvas after merging
      uploadCanvas.clear();
    }
  }, [canvas, uploadCanvas, template]);

  const onModifyObjects = (newObjects) => {
    objectsRef.current[template].forEach((object) => {
      uploadCanvas.remove(object);
    });

    objectsRef.current = {
      ...objectsRef.current,
      [template]: !_.isEmpty(newObjects)
        ? newObjects.map((obj) => {
            delete obj.isRender;
            return obj;
          })
        : [],
    };
  };

  // Function to handle file selection
  const handleFileSelect = (event) => {
    if (!uploadCanvas) {
      console.error('Canvas is not initialized yet.');
      return;
    }

    const file = event.target.files[0];
    if (file instanceof Blob) {
      let clipPath;
      if (template === 'front') {
        clipPath = _.find(canvas.getObjects(), (o) => o.name === 'clip');
      } else if (template === 'back') {
        clipPath = _.find(canvas.getObjects(), (o) => o.name === 'clip');
      } else {
        console.error('Invalid template:', template);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        fabric.Image.fromURL(
          reader.result,
          (iomg) => {
            // Calculate scale factors for width and height
            const scaleX = clipPath.width / iomg.width;
            const scaleY = clipPath.height / iomg.height;

            // Set the image's position and scale to fit within the clipping rectangle
            iomg.set({
              clipTo(ctx) {
                return _.bind(clipByName, iomg)(ctx, clipPath);
              },
              top: clipPath.top,
              left: clipPath.left,
              scaleX: scaleX,
              scaleY: scaleY,
              lockRotation: true,
            });

            iomg.on('mousemove', () => {
              iomg.set({ isOld: true });
            });

            iomg.on('mouseup', () => {});

            objectsRef.current[template].push(iomg);
            canvas.add(iomg);
          },
          {
            name: shortId.generate(),
            crossOrigin: 'anonymous',
          }
        );
      };

      reader.readAsDataURL(file);
    } else {
      console.error('Invalid file object:', file);
    }
  };

  const onSaveTextObject = (textId) => {
    const textObject = _.find(canvas.getObjects(), (o) => o.name === textId);

    uploadCanvas.remove(textObject);

    textObject.on('mousemove', () => {
      textObject.set({ isOld: true });
    });

    textObject.on('mouseup', () => {
      setIsCapture((prevCapture) => !prevCapture);
    });

    // Clone the text object as an image
    textObject.cloneAsImage((image) => {
      textObject.set({ image });

      objectsRef.current = {
        ...objectsRef.current,
        [template]: [...objectsRef.current[template], textObject],
      };
    });
  };

  // Function to handle continue button click
  const onSaveDesign = (design) => {
    if (!uploadCanvas) {
      console.error('Canvas is not initialized yet.');
      return;
    }

    if (template === 'front') {
      setTemplate('back');
      setCurrentStep(2);
      history.push(`/template/create?step=2&design=back&type=${type}`);
    } else if (template === 'back') {
      setCurrentStep(3);
      setTemplate('back');

      const svgData = canvas.toSVG({
        suppressPreamble: true,
        viewBox: {
          x: 50,
          y: 50,
          width: 500,
          height: 600,
        },
      });
      console.log(svgData, 'svgData');
  
      const ctx = canvasZone.current.getContext('2d');
      // Canvg.fromString(ctx, svgData, { ignoreDimensions: true }).render();
      // uploadCanvas.setBackgroundColor(
      //   '#ffffff',
      //   uploadCanvas.renderAll.bind(uploadCanvas)
      // );
      const pngDataUrl = canvasZone.current.toDataURL({
        format: 'png',
        quality: 1,
      });
  
      console.log(pngDataUrl, 'pngDataUrl');
      console.log(objectsRef.current, 'objects');

      dispatch(
          SaveDesign(design, { preview: pngDataUrl, design: pngDataUrl })
        );
      history.push('/template/create?step=3');
    }

    if (template === 'front' && objectsRef.current[template].length > 0) {
      setTemplate('back');
      history.push(`/template/create?step=2&design=back&type=${type}`);
    }
  };

  const onChangeDesignTemplate = (design) => {
    changeTemplate(design);

    if (objectsRef.current[template].length > 0) {
      onSaveDesign();
    }
    history.push(`/template/create?step=2&design=${design}&type=${type}`);
  };

  const onBack = () => {
    if (template === 'front') {
      history.push('/template/1');
    }
    if (template === 'back') {
      setTemplate('front');
      setCurrentStep(1);
    }
    dispatch(ResetDesign());
    // history.push('/template/create?step=1');
  };

  const isContinueDisabled = () => {
    const frontObjectsCount = objectsRef.current['front'].length;
    const backObjectsCount = objectsRef.current['back'].length;

    if (currentStep === 1 && frontObjectsCount !== 1) {
      return true;
    } else if (currentStep === 2 && backObjectsCount !== 1) {
      return true;
    }

    return false;
  };

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
                  {objectsRef.current[template].length !== 1 ? (
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
                        ></i>
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
                        disabled={objectsRef.current[template].length !== 1}
                      >
                        <i
                          data-v-f7d35098=""
                          data-test=""
                          aria-hidden="true"
                          class="sidebar-navigation-icon pf-i pf-i-24 pf-i-upload"
                        ></i>
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
                            {objectsRef.current[template].length > 0 && (
                              <>
                                <ListLayer
                                  objects={objectsRef.current[template]}
                                  canvas={canvas}
                                  onModifyObjects={onModifyObjects}
                                  objectsRef={objectsRef}
                                  template={template}
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
              <div className="col-12 col-md-8 pr-0" ref={canvasSize}>
                <div className="text-center">
                  <ul
                    className="pf-tabs secondary tabs-center "
                    style={{ top: 0 }}
                  >
                    <div className="tab-wrap">
                      {Object.keys(objectsRef.current).map((key) => (
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

                <canvas
                  id="uploadCanvas"
                  ref={canvasZone}
                  style={{ display: 'none' }}
                />
                <canvas
                  id="c"
                  ref={canvasZone}
                  style={{ width: 1080, height: 1080 }}
                />
                <div className="pf-mb-8" />
                <div className="generator-variant-area">
                  {colors.previews.map((preview) => (
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
                  ))}
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
                            isContinueDisabled() ? 'disable' : ''
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
