import React, { useState, useEffect } from 'react';
import shortId from 'shortid';
import * as _ from 'lodash';
import { fabric } from 'fabric';
import { CirclePicker } from 'react-color';

import { Drawer, IconButton, Divider } from '@mui/material';
import {makeStyles} from '@mui/styles';
import { ChevronLeft as ChevronLeftIcon } from 'react-feather';

import { clipByName } from '../utils';

const useStyle = makeStyles((theme) => ({
  drawer: {
    width: 350,
  },

  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const fonts = [
  'Arial',
  'Roboto',
  'Times New Roman',
  'Times',
  'Courier New',
  'Tangerine',
  'Pangolin',
];

const ColorPicker = ({ open, onHandleColor, name }) => (
  <>
    <div
      className="color-dropdown__dropdown pf-p-0 color-dropdown__dropdown--open"
      style={{ display: open ? 'block' : 'none' }}
    >
      <div className="col-md-12 pf-pt-12 pf-pb-12">
        <ul className="pf-tabs primary tabs-justify" style={{ top: 0 }}>
          <div className="tab-wrap">
            <li className="tab active">
              <a href="#">
                <span>Colors</span>
              </a>
            </li>
          </div>
        </ul>
        <div>
          <div className="pf-mb-8 pf-mt-12 pf-ui-body ">
            <span className="pf-px-2">
              <span>{name}</span>
            </span>
          </div>
          <div
            className="color-container pf-ui-body"
            style={{ paddingLeft: 12 }}
          >
            <div className="pf-d-inline-block">
              <div className="swatches swatches--click swatches--huge">
                <CirclePicker
                  width="100%"
                  onChange={(color) => onHandleColor(color.hex)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default function AddText({ onSaveTextObject, canvas }) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [textId, setTextId] = useState('');
  const [value, setValue] = useState('');
  const [openColorPicker, setOpenColorPicker] = useState({
    open: false,
    name: 'Text Color',
  });

  const [fontHandler, setFontHandler] = useState({
    currentFont: fonts[0],
    isChooseFont: false,
  });
  const [color, setColor] = useState({
    text: '#000000',
    outline: '',
    shadow: { hex: '', full: '' },
  });

  useEffect(() => {
    if (!textId) {
      setTextId(shortId.generate());
    }
  }, [textId]);

  useEffect(() => {
    if (value) {
      const clipPath = _.find(canvas.getObjects(), (o) => o.name === 'clip');
      const dropImage = _.find(canvas.getObjects(), (o) => o.name === 'drop');

      clipPath.set({ visible: true });
      dropImage.set({ visible: false });

      const oldText = _.find(canvas.getObjects(), (o) => o.name === textId);
      if (oldText) {
        oldText.set({
          text: value,
          fontFamily: fontHandler.currentFont,
          shadow: color.shadow.full,
          fill: color.text,
          stroke: color.outline,
        });

        canvas.renderAll();
      } else {
        const textObject = new fabric.Text(value, {
          top: 500 / 2,
          name: textId,
          fontFamily: fontHandler.currentFont,
          shadow: color.shadow.full,
          fill: color.text,
          stroke: color.outline,
          strokeWidth: 2,
          fontWeight: 800,
          clipTo(ctx) {
            return _.bind(clipByName, textObject)(ctx, clipPath);
          },
        });

        textObject.set({
          top: clipPath.top,
          left: clipPath.left,
        });
        canvas.add(textObject).setActiveObject(textObject);
      }
    } else if (textId && canvas && !_.isEmpty(canvas.getObjects())) {
      const oldText = _.find(canvas.getObjects(), (o) => o.name === textId);
      if (oldText) {
        canvas.remove(oldText);
      }

      if (canvas.getObjects().length < 4) {
        const clipPath = _.find(canvas.getObjects(), (o) => o.name === 'clip');
        const dropImage = _.find(canvas.getObjects(), (o) => o.name === 'drop');

        clipPath.set({ visible: false });
        dropImage.set({ visible: true });
      }
    }
  }, [value, textId, canvas, fontHandler, color]);

  const onHandleColor = (c) => {
    switch (openColorPicker.name) {
      case 'Text Color':
        setColor({ ...color, text: c });
        break;
      case 'Outline Color':
        setColor({ ...color, outline: c });
        break;
      case 'Shadow Color':
        setColor({ ...color, shadow: { full: `${c} 5px -4px 0px`, hex: c } });
        break;
      default:
    }
  };

  const resetState = () => {
    if (textId && value) {
      onSaveTextObject(textId);
    }
    setOpen(false);
    setTextId('');
    setValue('');
    setOpenColorPicker({ open: false, name: 'Text Color' });
    setColor({ text: '#000000', outline: '', shadow: { hex: '', full: '' } });
    setFontHandler({ currentFont: fonts[0], isChooseFont: false });
  };

  return (
    <>
      <div className="col-6 pf-py-4" onClick={() => setOpen(true)}>
        <div
          data-title=""
          data-toggle=""
          data-placement="top"
          data-html="true"
          className="layer-picker__type  pf-p-8 text-center pf-border"
        >
          <i className="pf-i pf-i-format-font pf-i-24 pf-text-gray" />
          <h6 className="pf-h6 pf-my-4">Add text</h6>
          <p className="pf-m-0 pf-text-muted pf-ui-caption ">
            Create a text-based design
          </p>
        </div>
      </div>

      <Drawer
        anchor="left"
        variant="persistent"
        open={open}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={resetState}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <div
          className="textbox-picker pf-mb-md-160 pf-mb-lg-128 mt-3 container"
          style={{ marginTop: 10 }}
        >
          <div>
            <div className="layer-picker__item__guideline-info" />
            <div className="pf-my-8">
              <div className="pf-d-inline">
                <span
                  className="pf-text-white pf-bg-cyan pf-ui-legal pf-bold pf-px-4 pf-mb-4 pf-d-none"
                  title="Let your customers create personalized versions of your design in real-time on your store"
                >
                  For personalization
                </span>
              </div>
              <h6 className="pf-d-inline">
                <span>Write your text</span>
              </h6>
            </div>
            <div style={{ position: 'relative' }}>
              <textarea
                placeholder="Start typing here"
                style={{
                  width: '100%',
                  height: 90,
                  maxWidth: '100%',
                  minWidth: '100%',
                  minHeight: 90,
                  overflow: 'hidden',
                  position: 'relative',
                }}
                spellCheck="false"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
            </div>
          </div>

          <div className="pf-mb-24">
            <h6>Choose typeface</h6>
            <div className="font-dropdown">
              <button
                className="btn btn-block btn-empty pf-px-8 text-left font-dropdown__button"
                type="button"
                onClick={() =>
                  setFontHandler({
                    ...fontHandler,
                    isChooseFont: !fontHandler.isChooseFont,
                  })
                }
              >
                <span style={{ fontFamily: fontHandler.currentFont }}>
                  {fontHandler.currentFont}
                </span>
              </button>
              <div
                className="font-dropdown__dropdown dropdown-menu pf-p-0"
                style={{ display: fontHandler.isChooseFont ? 'block' : 'none' }}
              >
                <ul className="pf-p-0 pf-m-0">
                  {fonts.map((font) => (
                    <li className="pf-p-0" key={font}>
                      <a
                        href="#"
                        style={{ fontFamily: font }}
                        className="pf-p-4"
                        onClick={(e) =>
                          setFontHandler({
                            isChooseFont: false,
                            currentFont: e.target.innerHTML,
                          })
                        }
                      >
                        {font}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="pf-mb-16">
            <div className="textbox-colors row">
              <div className="col-4 textbox-colors__text">
                <h6>Text color</h6>
                <div className="color-dropdown">
                  <button
                    className="pf-btn pf-btn-block pf-pl-8 pf-pr-24 text-left color-dropdown__button"
                    type="button"
                    onClick={() =>
                      setOpenColorPicker({ open: true, name: 'Text Color' })
                    }
                  >
                    <div className="swatches swatches--click swatches--big swatches--inline">
                      <span
                        className="swatches__item "
                        style={{ backgroundColor: color.text }}
                      />
                    </div>
                  </button>
                </div>
              </div>

              <div className="col-4 textbox-colors__outline">
                <h6>Outline</h6>
                <div className="color-dropdown">
                  <button
                    className="pf-btn pf-btn-block pf-pl-8 pf-pr-24 text-left color-dropdown__button"
                    type="button"
                    onClick={() =>
                      setOpenColorPicker({ open: true, name: 'Outline Color' })
                    }
                  >
                    <div className="swatches swatches--click swatches--big swatches--inline">
                      <span
                        className="swatches__item"
                        style={{ backgroundColor: color.outline }}
                      />
                    </div>
                  </button>
                </div>
              </div>

              <div className="col-4 textbox-colors__shadow">
                <h6>Shadow</h6>
                <div className="color-dropdown">
                  <button
                    className="pf-btn pf-btn-block pf-pl-8 pf-pr-24 text-left color-dropdown__button"
                    type="button"
                    onClick={() =>
                      setOpenColorPicker({ open: true, name: 'Shadow Color' })
                    }
                  >
                    <div className="swatches swatches--click swatches--big swatches--inline">
                      <span
                        className="swatches__item"
                        style={{ backgroundColor: color.shadow.hex }}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <ColorPicker
              open={openColorPicker.open}
              onHandleColor={onHandleColor}
              name={openColorPicker.name}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
}
