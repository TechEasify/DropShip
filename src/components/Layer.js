import React, { useRef, useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export default function Layer({
  object,
  id,
  src,
  index,
  moveCard,
  onDeleteLayer,
  text
}) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'Layer',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.id
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'Layer', id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    setSize({ width: Math.round(object.width * 100) / 100, height: Math.round(object.height * 100) / 100 });
  }, [])

  return (
    <>
      <div
        className="layer-picker__item pf-border-bottom sortable-chosen"
        ref={ref}
        style={{ opacity: isDragging ? 0 : 1 }}
      >
        <div className="row no-gutters">
          <div className="col-auto"><div className="layer-picker__item__inside"><i className="pf-i pf-i-subdirectory-arrow-left pf-i-24 pf-text-gray pf-pr-8" /></div></div>
          <div className="col-auto"><div className="layer-picker__item__handle-wrap pf-py-16 pf-pr-12"><div className="layer-picker__item__thumb pf-border"><img src={src} alt="" className="layer-picker__item__image" draggable="false" /></div></div></div>
          <div className="col pf-ui-caption">
            <div className="layer-picker__item__handle-wrap pf-py-8">
              {
                text ?
                  <div className="layer-picker__item__title pf-pr-40"><span className="layer-picker__item__badge">Text</span>{text}</div>
                  : null
              }
              <div className="pf-mt-2 pf-d-inline-block">
                <span className="pf-bold">Width:</span> {size.width}
                {" "}
                <span className="pf-bold">Height:</span> {size.height}
              </div>
            </div>
            <div className='pf-pl-24'>
              <span
                className="layer-picker__item__delete"
                data-original-title="Delete"
                style={{ display: 'block' }}
                onClick={() => onDeleteLayer(id)}
              ><i className="pf-i pf-i-trash-can-outline pf-i-18"></i></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
