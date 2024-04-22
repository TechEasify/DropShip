import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import * as _ from 'lodash';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import shortId from 'shortid';

import { AppBar, DialogActions, Toolbar } from '@mui/material';

import { clipByName } from '../../modules/ProductTemplate/utils';

import ListLayer from '../../modules/ProductTemplate/containers/ListLayer';
import TabProduct from '../../modules/ProductTemplate/containers/Tab.Product';
import TabDesign from '../../modules/ProductTemplate/containers/Tab.Design';

import data from '../../modules/ProductTemplate/assets';

import { ResetDesign } from '../../modules/ProductTemplate/action';
import { useCanvas } from '../../modules/ProductTemplate/hooks';
import Crop75Icon from '@mui/icons-material/Crop75';
import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import { Icon } from '@shopify/polaris';
import { ProductFilledIcon } from '@shopify/polaris-icons';
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

const labelName = {
  front: 'Main',
  back: 'Label',
};

function Editdesign() {
  const classes = useStyle();
  const location = useLocation();

  const templateImage =
    'https://shopifyapp.iihtsrt.com/public/assets/uploads/collection/lavender.-without-logo.png';
  const backTemplateImage =
    'https://shopifyapp.iihtsrt.com/public/assets/uploads/collection/lavender.-without-logo.png';

  const history = useHistory();
  const dispatch = useDispatch();

  const canvasSize = useRef(null);
  const canvasZone = useRef(null);
  const canvas = useCanvas(canvasSize, canvasZone);

  const clipRectangle = useRef(null);
  const dropImageRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isCapture, setIsCapture] = useState(false);
  const [tab, setTab] = useState('product');
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
  const [template, setTemplate] = useState('front');
  const [activeButton, setActiveButton] = useState('product');
  const [clipType, setClipType] = useState('rectangle');
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  // Function to handle button click
  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === 'uploads') {
      document.getElementById('fileInput').click();
    }
  };

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    console.log(file, 'file');
    const clipPath = _.find(canvas.getObjects(), (o) => o.name === 'clip');
    console.log(clipPath, 'clipPath');

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

          setObjects({ ...objects, [template]: [...objects[template], iomg] });
          setIsImageUploaded(true);
        },
        {
          name: shortId.generate(),
          top: clipPath.top,
          left: clipPath.left,
          crossOrigin: 'anonymous',
        }
      );
    };

    reader.readAsDataURL(file);
  };

  const TEMPLATE_OPTIONS = ['front', 'back'];

  const changeTemplate = (newTemplate) => {
    if (TEMPLATE_OPTIONS.includes(newTemplate)) {
      setTemplate(newTemplate);
    } else {
      console.error('Invalid template option');
    }
  };

  const handleChangeClipType = (type) => {
    if (canvas) {
      const clipPath = clipRectangle.current;
      const dropImage = dropImageRef.current;

      let clipShape;
      let clipWidth;
      let clipHeight;
      let clipLeft;
      let clipTop;

      // Define initial position front side
      clipWidth = 260;
      clipHeight = 110;
      clipLeft = 365;
      clipTop = 525;

      // Define initial position back side
      if (template === 'back') {
        clipWidth = 700;
        clipHeight = 110;
        clipLeft = 140;
        clipTop = 526;
      }

      if (type === 'rectangle') {
        clipShape = new fabric.Rect({
          width: clipWidth,
          height: clipHeight,
          top: clipTop,
          left: clipLeft,
          fill: 'green',
          selectable: true,
          centeredScaling: true,
          centerTransform: false,
          lockRotation: true,
          name: 'clip',
          strokeWidth: 4,
        });
      } else if (type === 'circle') {
        const centerX = clipLeft + clipWidth / 2;
        console.log(centerX, 'centerX');
        const centerY = clipTop + clipHeight / 2;
        console.log(centerY, 'centerY');
        const radius = Math.sqrt(
          Math.pow(clipWidth / 2, 2) + Math.pow(clipHeight / 2, 2)
        );
        console.log(Math.pow(clipWidth / 2, 2), 'Math.pow(clipWidth / 2, 2)');
        console.log(Math.pow(clipHeight / 2, 2), 'Math.pow(clipHeight / 2, 2)');
        console.log(radius, 'radius');
        clipShape = new fabric.Circle({
          radius: radius,
          top: centerY - radius,
          left: centerX - radius,
          fill: 'green',
          centeredScaling: true,
          centerTransform: false,
          lockRotation: true,
          selectable: true,
          name: 'clip',
          strokeWidth: 4,
        });
      }

      clipRectangle.current = clipShape;

      // Update drop image position
      // dropImage.set({
      //     top: clipTop,
      //     left: clipLeft,
      //     width: clipWidth,
      //     height: clipHeight,
      //     angle: type === 'circle' ? -15 : 0,
      //     clipPath: type === 'circle' ? new fabric.Circle({
      //         radius: clipWidth / 2,
      //         originX: 'center',
      //         originY: 'center',
      //         angle: -15,
      //     }) : null,
      // });

      canvas.remove(clipPath);
      canvas.add(clipRectangle.current);
      // canvas.add(dropImage);

      // if (dropImage) {
      //     updateDropImage();
      // }

      canvas.renderAll();
    }
    setClipType(type);
  };

  useEffect(() => {
    if (canvas) {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Calculate dynamic position and size for clipRectangle
      let clipWidth = 260;
      let clipHeight = 110;
      let clipLeft = 365;
      let clipTop = 525;

      if (template === 'back') {
        console.log(template === 'back', "template === 'back'");
        clipWidth = 700;
        clipHeight = 110;
        clipLeft = 140;
        clipTop = 526;
      }

      clipRectangle.current = new fabric.Rect({
        width: clipWidth,
        height: clipHeight,
        top: clipTop,
        left: clipLeft,
        lockRotation: true,
        name: 'clip',
        fill: 'green',
        selectable: true,
        centeredScaling: true,
        centerTransform: false,
        strokeWidth: 4,
      });

      const backgroundImageURL =
        template === 'front' ? templateImage : backTemplateImage;
      console.log(backgroundImageURL, 'backgroundImageURL');

      fabric.Object.prototype.transparentCorners = false;
      fabric.Object.prototype.cornerColor = 'blue';
      fabric.Object.prototype.cornerStyle = 'circle';

      fabric.Image.fromURL(
        backgroundImageURL,
        (image) => {
          canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas), {
            scaleX: canvasWidth / image.width,
            scaleY: canvasHeight / image.height,
          });
        },
        {
          selectable: false,
          name: 'bg',
          width: canvasWidth,
          crossOrigin: 'Anonymous',
        }
      );

      canvas.add(clipRectangle.current);
      canvas.renderAll();

      // fabric.Image.fromURL(
      //     data.drop,
      //     (dropImage) => {
      //         console.log(dropImage, "dropImage");
      //         // Logic for handling drop image based on the template
      //         switch (template) {
      //             case 'front':
      //                 // Add logic if needed
      //                 break;
      //             case 'back':
      //                 // Add logic if needed
      //                 break;
      //             default:
      //         }

      //         canvas.add(clipRectangle.current);
      //         canvas.add(dropImage);
      //         dropImageRef.current = dropImage;
      //         setIsReady(true);

      //         clipRectangle.current.set({
      //             width: clipWidth,
      //             height: clipHeight,
      //             top: clipTop,
      //             left: clipLeft,
      //         });
      //         canvas.renderAll();
      //     },
      //     {
      //         selectable: false,
      //         name: 'drop',
      //         crossOrigin: 'Anonymous',
      //         selectable: true,
      //     },
      // );
    }

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
  }, [canvas, template]);

  console.log(clipRectangle.current, 'clipRectangle');

  const updateDropImage = () => {
    const modifiedObject = clipRectangle.current;
    if (modifiedObject && modifiedObject.name === 'clip') {
      const { left, top, width, height } = modifiedObject;
      console.log(
        'left :- ',
        left,
        'top :- ',
        top,
        'width :- ',
        width,
        'height :- ',
        height
      );
      const dropImage = dropImageRef.current;
      if (dropImage) {
        dropImage.set({
          left: Math.round(left),
          top: Math.round(top),
          width: Math.round(width),
          height: Math.round(height),
        });
      }
      canvas.renderAll();
    }
  };

  useEffect(() => {
    if (canvas) {
      updateDropImage();
      canvas.on('object:modified', updateDropImage);
    }

    return () => {
      if (canvas) {
        canvas.off('object:modified', updateDropImage);
      }
    };
  }, [canvas, clipRectangle.current]);

  const onContinueButtonClick = () => {
    // Other actions to continue
    const cloneCanvas = _.cloneDeep(canvas);
    const cObjects = cloneCanvas.getObjects();
    const [clipPath] = cObjects.filter((object) => object.name === 'clip');
    clipPath.set({ visible: false });
    const imagePreview = cloneCanvas.toDataURL();

    console.log(imagePreview, 'imagePreview');
    console.log(objects, 'objects');
  };

  useEffect(() => {
    if (colors.hexs.length > 0 && isReady) {
      const cloneCanvas = _.cloneDeep(canvas);
      const clipPath = _.find(
        cloneCanvas.getObjects(),
        (o) => o.name === 'clip'
      );
      const dropImage = _.find(
        cloneCanvas.getObjects(),
        (o) => o.name === 'drop'
      );
      cloneCanvas.remove(clipPath);
      cloneCanvas.remove(dropImage);
      const previews = colors.hexs.map((c) => {
        cloneCanvas.set({ backgroundColor: c });
        return {
          image: cloneCanvas.toDataURL(),
          color: c,
        };
      });

      canvas.set({ backgroundColor: color });
      canvas.renderAll();

      setColors((prevColors) => ({ ...prevColors, previews }));
    }
  }, [isReady, canvas, color, template, isCapture]);

  useEffect(() => {
    if (canvas && isReady && !_.isEmpty(canvas.getObjects())) {
      const clipPath = _.find(canvas.getObjects(), (o) => o.name === 'clip');
      const dropImage = _.find(canvas.getObjects(), (o) => o.name === 'drop');
      if (canvas.getObjects().length > 2) {
        clipPath.set({ visible: true });
        // dropImage.set({ visible: false });
      } else {
        clipPath.set({ visible: false });
        // dropImage.set({ visible: true });
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

  const onChangeDesignTemplate = (design) => {
    changeTemplate(design);

    if (objects[template].length > 0) {
      onSaveDesign(templateImage, canvas);
    }
    history.push(`/manageable/editproduct?step=2&design=${design}&type=oil`);
  };

  const onBack = () => {
    dispatch(ResetDesign());
    history.push('/admin/manageable/products');
  };

  const onCloseDialog = () => {
    dispatch(ResetDesign());
    history.push('/admin/manageable/products');
  };

  return (
    <>
      <div className="dropzone dropzone-1" id="js--product-push-designer">
        <div className="row">
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
                  <div className="btn-rectangle">
                    <button
                      onClick={() => handleChangeClipType('rectangle')}
                      className={`item pf-text-center pf-py-8 pf-py-md-12 pf-px-2 pf-my-8 pf-my-md-4 pf-cursor-pointer pf-d-inline-block pf-d-md-block pf-btn-unstyled ${
                        clipType === 'rectangle' ? 'active' : ''
                      }`}
                      style={{ fontSize: 13, marginRight: '10px' }}
                    >
                      <div className="label-icon">
                        <Crop75Icon className="sidebar-navigation-icon pf-i pf-i-24 pf-i-format-text" />
                        <span
                          data-v-f7d35098=""
                          class="title pf-ui-legal pf-d-block pf-mt-4"
                        >
                          Rectangle
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() => handleChangeClipType('circle')}
                      className={`item pf-text-center pf-py-8 pf-py-md-12 pf-px-2 pf-my-8 pf-my-md-4 pf-cursor-pointer pf-d-inline-block pf-d-md-block pf-btn-unstyled ${
                        clipType === 'circle' ? 'active' : ''
                      }`}
                      style={{ fontSize: 13 }}
                    >
                      <div className="label-icon">
                        <BlurCircularIcon className="sidebar-navigation-icon pf-i pf-i-24 pf-i-format-text" />
                        <span
                          data-v-f7d35098=""
                          class="title pf-ui-legal pf-d-block pf-mt-4"
                        >
                          Circle
                        </span>
                      </div>
                    </button>
                  </div>
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

          {/* <div className="design-img col-12 pf-mt-md-8 pf-mb-md-48">
            <div class="designer-sidebar pf-w-100">
            <aside
                aria-label="Design Maker sidebar"
                class="sidebar-navigation pf-d-flex pf-align-items-center pf-scrollbar-hide"
              >
                <div className="btn-rectangle">
                  <button
                    onClick={() => handleChangeClipType('rectangle')}
                    className={`item pf-text-center pf-py-8 pf-py-md-12 pf-px-2 pf-my-8 pf-my-md-4 pf-cursor-pointer pf-d-inline-block pf-d-md-block pf-btn-unstyled ${
                      clipType === 'rectangle' ? 'active' : ''
                    }`}
                    style={{ fontSize: 13 }}
                  >
                    <div>
                      <Crop75Icon className="sidebar-navigation-icon pf-i pf-i-24 pf-i-format-text" />
                    </div>
                    Rectangle
                  </button>
                </div>
                <div className="btn-rectangle">
                  <button
                    onClick={() => handleChangeClipType('circle')}
                    className={`item pf-text-center pf-py-8 pf-py-md-12 pf-px-2 pf-my-8 pf-my-md-4 pf-cursor-pointer pf-d-inline-block pf-d-md-block pf-btn-unstyled ${
                      clipType === 'circle' ? 'active' : ''
                    }`}
                    style={{ fontSize: 13 }}
                  >
                    <div>
                      <BlurCircularIcon className="sidebar-navigation-icon pf-i pf-i-24 pf-i-format-text" />
                    </div>
                    Circle
                  </button>
                </div>
                <hr data-v-0a2c8d53="" class="divider pf-my-4" />
                <div className="btn-design">
                  <button
                    className={`item pf-text-center pf-py-8 pf-py-md-12 pf-px-2 pf-my-8 pf-my-md-4 pf-cursor-pointer pf-d-inline-block pf-d-md-block pf-btn-unstyled disable`}
                    style={{ background: 'beige' }}
                  >
                    <Icon source={ProductFilledIcon} tone="base" />
                    <span className="title pf-ui-legal pf-d-block pf-mt-4">
                      Product
                    </span>
                  </button>
                </div>
              </aside>

              </div>
              </div> */}
        </div>
        <TabDesign
          canvas={canvas}
          onChooseImage={handleFileSelect}
          onSaveTextObject={onSaveTextObject}
          visible={tab === 'design' ? 'block' : 'none'}
        />
      </div>
      <div
        className="col-12 col-md-8 pr-0"
        style={{
          padding: 0,
          margin: '40px auto',
          height: '85vh',
          overflow: 'hidden',
        }}
        ref={canvasSize}
      >
        {/* <div className="text-center">
              <ul className="pf-tabs secondary tabs-center " style={{ top: 0 }}>
                <div className="tab-wrap">
                  {Object.keys(objects).map((key) => (
                    <li
                      key={key}
                      className={clsx('tab', template === key ? 'active' : '')}
                    >
                      <a href="#" onClick={() => onChangeDesignTemplate(key)}>
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

        <canvas id="c" ref={canvasZone} style={{ margin: '0 auto' }} />
      </div>

      <DialogActions style={{ background: 'rgb(26, 26, 26, 1)' }}>
        <div className="dynamic-sticky-footer  pf-p-0">
          <div className="dynamic-sticky-footer__second-wrap">
            <div className="dynamic-sticky-footer__second">
              <div className="container">
                <div>
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
                        className="pf-btn pf-btn-primary pf-w-75 pf-w-md-auto"
                        onClick={onContinueButtonClick}
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
      </DialogActions>
    </>
  );
}

export default function WrappedEditDesign() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Editdesign />
    </DndProvider>
  );
}
