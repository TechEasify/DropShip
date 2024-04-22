import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import * as _ from 'lodash';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import shortId from 'shortid';

import {
  AppBar,
  DialogActions,
  Popover,
  Typography,
  Toolbar,
} from '@mui/material';

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
import { LabelPrinterIcon } from '@shopify/polaris-icons';
import { Icon } from '@shopify/polaris';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
  root: {
    '& .MuiPaper-elevation4': {
      // boxShadow: '2px 3px 5px 1px #e5e5e5',
      borderRight: '1px solid rgb(255, 255, 255, .1)',
    },
  },

  appBar: {
    position: 'relative',
    background: 'rgb(241, 241, 241, 1)',
  },
});

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

// Defining labels for different templates
const labelName = {
  front: 'Main',
  back: 'Label',
};

// Main component
export default function Design({ onReview }) {
  const classes = useStyle();
  const type = 'oil';
  // const templateImage =
  //   'https://shopifyapp.iihtsrt.com/public/assets/uploads/collection/lavender.-without-logo.png';

  const backTemplateImage = data.label;

  const history = useHistory();
  const dispatch = useDispatch();

  const canvasSize = useRef(null);
  const canvasZone = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [uploadCanvas, setUploadCanvas] = useState(null);
  const [backCanvas, setBackCanvas] = useState(null);
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

  const [templateImageBase64, setTemplateImageBase64] = useState(null);

  const fetchImageAsBase64 = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  useEffect(() => {
    // Fetch template image and convert to base64
    const fetchTemplateImage = async () => {
      const base64Image = await fetchImageAsBase64(data.label);
      // Create a new image element
      const image = new Image();
      image.onload = () => {
        // Create a canvas with the desired width and height
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        // Draw the image onto the canvas with the new dimensions
        ctx.drawImage(image, 0, 0, 600, 600);
        // Convert the canvas content back to base64
        const resizedBase64 = canvas.toDataURL('image/png');
        // Set the resized base64 image as the state
        setTemplateImageBase64(resizedBase64);
      };
      image.src = base64Image;
    };

    fetchTemplateImage();
  }, []);

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
          width: 600,
          height: 600,
          preserveObjectStacking: true,
        })
      );
      setBackCanvas(
        new fabric.Canvas(canvasZone.current, {
          width: 600,
          height: 600,
          preserveObjectStacking: true,
        })
      );
      setUploadCanvas(
        new fabric.Canvas(canvasZone.current, {
          width: 600,
          height: 600,
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
      // history.push('/template/create?step=3');
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

    // Create clipping rectangles for both front and back templates
    const clipRectangle = new fabric.Rect({
      width: 560,
      height: 250,
      top: 300,
      left: 50,
      fill: 'transparent',
      strokeDashArray: [5, 5],
      stroke: 'red',
      selectable: false,
      lockRotation: true,
      lockMovementX: true,
      backgroundVpt: false,
      name: 'clip',
      visible: true,
      strokeWidth: 2,
    });

    let clipRectangleBack;
    if (template === 'back') {
      clipRectangleBack = new fabric.Rect({
        width: 250,
        height: 60,
        top: 340,
        left: 175,
        fill: 'transparent',
        strokeDashArray: [5, 5],
        stroke: 'red',
        selectable: false,
        lockRotation: true,
        name: 'clip',
        visible: true,
        strokeWidth: 2,
      });
      canvas.add(clipRectangleBack);
    }

    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = 'blue';
    fabric.Object.prototype.cornerStyle = 'circle';

    canvas.add(clipRectangle);

    // Load drop image and apply filters and clipping paths
    fabric.Image.fromURL(
      data.drop,
      (dropImage) => {
        switch (template) {
          case 'front':
            clipRectangle.set({
              width: 505,
              height: 230,
              top: 320,
              left: 45,
              lockRotation: true,
            });

            //left side
            // clipRectangle.set({
            //   width: 150,
            //   height: 230,
            //   top: 320,
            //   left: 45,
            //   lockRotation: true,
            // });

            // right side
            // clipRectangle.set({
            //   width: 150,
            //   height: 230,
            //   top: 320,
            //   left: 400,
            //   lockRotation: true,
            // });
            dropImage.set({
              width: 505,
              height: 230,
              top: 320,
              left: 45,
              fill: 'yellow',
              clipPath: new fabric.Rect({
                absolutePositioned: true,
                originX: 'center',
                originY: 'center',
              }),
            });
            canvas.add(clipRectangle);
            break;
          case 'back':
            clipRectangleBack.set({
              width: 250,
              height: 60,
              top: 340,
              left: 175,
              lockRotation: true,
            });
            dropImage.set({
              strokeDashArray: [5, 5],
              stroke: '#222',
              top: 340,
              left: 175,
              width: 250,
              height: 60,
              clipPath: new fabric.Rect({
                absolutePositioned: true,
                originX: 'center',
                originY: 'center',
              }),
            });
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
      // Clear canvas when component unmounts
      if (canvas) {
        canvas.clear();
      }
    };
  }, [canvas, template, data.drop]);

  useEffect(() => {
    if (
      canvas &&
      uploadCanvas &&
      backCanvas &&
      objectsRef.current[template].length > 0
    ) {
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
  }, [canvas, uploadCanvas, backCanvas, template]);

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
            console.log(iomg, 'reader.result');
            const scaleX = clipPath.width / iomg.width;
            const scaleY = clipPath.height / iomg.height;

            iomg.set({
              clipTo(ctx) {
                return _.bind(clipByName, iomg)(ctx, clipPath);
              },
              scaleX: scaleX,
              scaleY: scaleY,
            });

            iomg.set({
              top: clipPath.top,
              left: clipPath.left,
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

  // Inside the onSaveDesign function

  // const onSaveDesign = (design) => {
  //   // Retrieve the uploaded image from the canvas
  //   const uploadedImage = canvas.toDataURL('image/png');

  //   // Create a new canvas to composite both the template and uploaded image
  //   const compositeCanvas = document.createElement('canvas');
  //   const compositeCtx = compositeCanvas.getContext('2d');

  //   // Set the composite canvas size to match the canvasZone
  //   compositeCanvas.width = canvasZone.current.offsetWidth;
  //   compositeCanvas.height = canvasZone.current.offsetHeight;

  //   // Draw the template image onto the composite canvas
  //   const templateImage = new Image();
  //   templateImage.src = templateImageBase64;
  //   templateImage.onload = () => {
  //     compositeCtx.drawImage(templateImage, 0, 0, compositeCanvas.width, compositeCanvas.height);

  //     // Draw the left part of the uploaded image onto the composite canvas
  //     const leftImage = new Image();
  //     leftImage.src = uploadedImage;
  //     leftImage.onload = () => {
  //       compositeCtx.drawImage(leftImage, 45, 320, 150, 230, 0, 0, 150, 230);

  //       // Draw the right part of the uploaded image onto the composite canvas
  //       const rightImage = new Image();
  //       rightImage.src = uploadedImage;
  //       rightImage.onload = () => {
  //         compositeCtx.drawImage(rightImage, 400, 320, 150, 230, 150, 0, 150, 230);

  //         // Export the composite canvas as a PNG
  //         const pngDataUrl = compositeCanvas.toDataURL('image/png');
  //         console.log(pngDataUrl, "pngDataUrl");

  //         // Dispatch action or perform further operations with the PNG data
  //         dispatch(SaveDesign(design, { preview: pngDataUrl, design: pngDataUrl }));
  //       };
  //     };
  //   };
  // };

  // const onSaveDesign = (design) => {
  //   // Create a new canvas to draw the cropped template images
  //   const croppedCanvas = document.createElement('canvas');
  //   const croppedCtx = croppedCanvas.getContext('2d');

  //   // Set the canvas size to match the dimensions of the clipped images
  //   croppedCanvas.width = 150; // Width of the clipped image
  //   croppedCanvas.height = 230; // Height of the clipped image

  //   // Load the template image onto a new Image object
  //   const templateImage = new Image();
  //   templateImage.src = templateImageBase64;
  //   templateImage.onload = () => {
  //     // Draw the left part of the template image onto the cropped canvas
  //     croppedCtx.drawImage(templateImage, 45, 320, 150, 230, 0, 0, 150, 230);

  //     // Convert the left part of the template image to base64
  //     const leftImageDataUrl = croppedCanvas.toDataURL('image/png');
  //     console.log(leftImageDataUrl, "leftImageDataUrl");

  //     // Clear the cropped canvas for drawing the right part
  //     croppedCtx.clearRect(0, 0, croppedCanvas.width, croppedCanvas.height);

  //     // Draw the right part of the template image onto the cropped canvas
  //     croppedCtx.drawImage(templateImage, 400, 320, 150, 230, 0, 0, 150, 230);

  //     // Convert the right part of the template image to base64
  //     const rightImageDataUrl = croppedCanvas.toDataURL('image/png');
  //     console.log(rightImageDataUrl, "rightImageDataUrl");

  //     // Now you have the left and right parts of the template image as base64 data
  //     // You can further process or use these base64 strings as needed
  //   };
  // };

  // Inside the onSaveDesign function

  const onSaveDesign = (design) => {
    // Create a new canvas to draw the entire template image
    const fullCanvas = document.createElement('canvas');
    const fullCtx = fullCanvas.getContext('2d');

    fullCanvas.width = 600;
    fullCanvas.height = 600;

    // Load the template image onto a new Image object
    const templateImage = new Image();
    templateImage.src = templateImageBase64;
    templateImage.onload = () => {
      // Draw the entire template image onto the full canvas
      fullCtx.drawImage(templateImage, 0, 0, 600, 600);

      // Clear the areas covered by the left and right clipping rectangles
      fullCtx.clearRect(45, 270, 160, 230);
      fullCtx.clearRect(400, 270, 150, 230);

      const ImageDataUrl = fullCanvas.toDataURL('image/png');
      console.log(ImageDataUrl, 'ImageDataUrl');

      // Load the uploaded image onto a new Image object
      const uploadedImage = new Image();
      uploadedImage.src = canvas.toDataURL('image/png');
      uploadedImage.onload = () => {
        // Draw the uploaded image onto the full canvas
        fullCtx.drawImage(uploadedImage, 0, -50, 600, 600);
        const withoutImageDataUrl = fullCanvas.toDataURL('image/png');
        console.log(withoutImageDataUrl, 'withoutImageDataUrl');

        fullCtx.clearRect(45, 270, 160, 230);
        fullCtx.clearRect(400, 270, 150, 230);

        const fullImageDataUrl = fullCanvas.toDataURL('image/png');
        console.log(fullImageDataUrl, 'fullImageDataUrl');

        dispatch(
          SaveDesign(design, {
            preview: fullImageDataUrl,
            design: fullImageDataUrl,
          })
        );
      };
    };
  };

  // const onSaveDesign = (design) => {
  //   // Create a new canvas to draw the entire template image
  //   const fullCanvas = document.createElement('canvas');
  //   const fullCtx = fullCanvas.getContext('2d');

  //   fullCanvas.width = 600;
  //   fullCanvas.height = 600;

  //   // Load the template image onto a new Image object
  //   const templateImage = new Image();
  //   templateImage.src = templateImageBase64;
  //   templateImage.onload = () => {
  //     // Draw the entire template image onto the full canvas
  //     fullCtx.drawImage(templateImage, 0, 0, 600, 600);

  //     // Clear the areas covered by the left and right clipping rectangles
  //     fullCtx.clearRect(45, 270, 160, 230);
  //     fullCtx.clearRect(400, 270, 150, 230);

  //     // Convert the modified template image to base64
  //     const fullImageDataUrl = fullCanvas.toDataURL('image/png');
  //     console.log(fullImageDataUrl, 'fullImageDataUrl');
  //   };
  // };

  // const onSaveDesign = (design) => {
  //   if (!uploadCanvas && !canvas) {
  //     console.error('Canvas is not initialized yet.');
  //     return;
  //   }

  //   // if (template === 'front') {
  //   //   setTemplate('back');
  //   //   setCurrentStep(2);
  //   // } else if (template === 'back') {
  //   //   setCurrentStep(3);
  //   // }

  //   const frontClipRectangle = {
  //     width: 435,
  //     height: 350,
  //     top: 205,
  //     left: 210,
  //   };

  //   const backClipRectangle = {
  //     width: 600,
  //     height: 600,
  //     top: -50,
  //     left: 0,
  //   };

  //   // Create a new canvas to composite both the background and uploaded image
  //   const compositeCanvas = document.createElement('canvas');
  //   console.log(compositeCanvas, 'compositeCanvas');
  //   const compositeCtx = compositeCanvas.getContext('2d');

  //   // Set the composite canvas size to match the canvasZone
  //   compositeCanvas.width = canvasZone.current.offsetWidth;
  //   compositeCanvas.height = canvasZone.current.offsetHeight;

  //   // Draw the background image onto the composite canvas
  //   const backgroundImage = new Image();
  //   backgroundImage.src = templateImageBase64;
  //   backgroundImage.onload = () => {
  //     compositeCtx.drawImage(
  //       backgroundImage,
  //       0,
  //       0,
  //       compositeCanvas.width,
  //       compositeCanvas.height
  //     );

  //     // Draw the uploaded image onto the composite canvas
  //     const uploadedImage = new Image();
  //     console.log(uploadedImage, 'uploadedImage');
  //     uploadedImage.src = canvas.toDataURL('image/png');
  //     uploadedImage.onload = () => {
  //       // const clipRectangle =
  //       //   template === 'front' ? frontClipRectangle : backClipRectangle;

  //       const clipRectangle = backClipRectangle;

  //       // Draw the uploaded image with the same dimensions and position as in useEffect
  //       compositeCtx.drawImage(
  //         uploadedImage,
  //         clipRectangle.left,
  //         clipRectangle.top,
  //         clipRectangle.width,
  //         clipRectangle.height
  //       );

  //       // Export the composite canvas as a PNG
  //       const pngDataUrl = compositeCanvas.toDataURL('image/png');
  //       console.log(pngDataUrl, 'pngDataUrl');

  //       // Dispatch action or perform further operations with the PNG data
  //       dispatch(
  //         SaveDesign(design, { preview: pngDataUrl, design: pngDataUrl })
  //       );

  //       console.log(objectsRef.current, 'objectsRef.current');
  //     };
  //   };
  // };

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

  const onCloseDialog = () => {
    dispatch(ResetDesign());
    history.push('/catalog');
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
              <div
                className={classes.root}
                fullWidth
                maxWidth="xl"
                open
                TransitionComponent={Transition}
                onClose={onCloseDialog}
              >
                <AppBar className={classes.appBar}>
                  <Toolbar className="pf-d-flex pf-flex-wrap pf-justify-content-between pf-align-items-center">
                    <div>
                      <h4 className="pf-h3 pf-m-0 product-create">
                        Product Template
                      </h4>
                    </div>
                    <div>
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
                            <div className="label-icon">
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
                                Upload Label
                              </span>
                            </div>
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
                            <div className="label-icon">
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
                                Upload Label
                              </span>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="order-3 text-right basis-md-auto basis-20">
                      <span
                        className="pf-i pf-i-32 pf-i-close pf-modal__close-icon"
                        onClick={onCloseDialog}
                      />
                    </div>
                  </Toolbar>
                </AppBar>
              </div>
              {/* <div class="sidebar-product">
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
                          Upload Label
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
                          Upload Label
                        </span>
                      </button>
                    </div>
                  )}
                  <hr />
                  <div className="btn-design">
                    <button
                      className={`item pf-text-center pf-py-8 pf-py-md-12 pf-px-2 pf-my-8 pf-my-md-4 pf-cursor-pointer pf-d-inline-block pf-d-md-block pf-btn-unstyled disable`}
                      style={{ background: '#fff', color: '#232323' }}
                    >
                      <Icon source={LabelPrinterIcon} tone="base" />
                      <span className="title pf-ui-legal pf-d-block pf-mt-4">
                        Label
                      </span>
                    </button>
                  </div>
                </div>
                </div> */}
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
              <div className="col-12 col-md-8 pr-0" ref={canvasSize}>
                {/* <div className="text-center">
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
                </div> */}

                <div
                  className="canvas-container"
                  style={{
                    width: '600px',
                    height: '600px',
                    position: 'relative',
                    userSelect: 'none',
                    margin: '0 auto',
                  }}
                >
                  <canvas
                    id="c"
                    ref={canvasZone}
                    style={{
                      backgroundImage: `url(${templateImageBase64})`,
                      position: 'absolute',
                      width: '600px',
                      height: '600px',
                      left: 0,
                      top: 0,
                      touchAction: 'none',
                      userSelect: 'none',
                    }}
                  />
                  <canvas
                    id="backCanvas"
                    ref={canvasZone}
                    style={{
                      position: 'absolute',
                      width: '600px',
                      height: '600px',
                      left: 0,
                      top: 0,
                      touchAction: 'manipulation',
                      userSelect: 'none',
                      cursor: 'default',
                    }}
                  />
                  <canvas
                    id="uploadCanvas"
                    ref={canvasZone}
                    style={{ width: '600px', height: '600px' }}
                  />
                </div>

                {/* <canvas
                  id="uploadCanvas"
                  ref={canvasZone}
                  style={{ width: 800, height: 800 }}
                />
                <canvas
                  id="backCanvas"
                  ref={canvasZone}
                  style={{ width: 800, height: 800 }}
                />
                <canvas
                  id="c"
                  ref={canvasZone}
                  style={{ width: 800, height: 800 }}
                /> */}
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

      <DialogActions style={{ backgroundColor: 'rgb(26, 26, 26, 1)' }}>
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
