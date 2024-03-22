import React, { useCallback } from 'react';
import * as _ from 'lodash';

import { Layer } from '@components/index';

export default function ListLayer({
  objects,
  onModifyObjects,
  canvas,
}) {

  const cloneObjects = _.cloneDeep(objects);

  const moveCard = useCallback(
    (dragID, hoverID) => {
      const dragIndex = objects.findIndex((object) => object.name === dragID);
      const hoverIndex = objects.findIndex((object) => object.name === hoverID);

      const temp = objects[dragIndex];
      objects[dragIndex] = objects[hoverIndex];
      objects[hoverIndex] = temp;
      onModifyObjects(objects);
    },
    [objects, onModifyObjects],
  );

  const onDeleteObject = (name) => {
    const object = _.find(canvas.getObjects(), (o) => o.name === name);
    canvas.remove(object);

    objects.splice(objects.findIndex((obj) => obj.name === name), 1);
    onModifyObjects(objects);
  };

  const renderLayer = (layer, index) => (
    (
      <Layer
        object={layer}
        key={index}
        text={layer.text ? layer.text : null}
        index={layer.name}
        id={layer.name}
        src={layer.image ? layer.image.getSrc() : layer.getSrc()}
        moveCard={moveCard}
        onDeleteLayer={onDeleteObject}
      />
    )
  );

  return (
    <>
      <div className="nested-sortable">
        {cloneObjects.splice(0).reverse().map((object, index) => renderLayer(object, index))}
      </div>
    </>
  );
}
