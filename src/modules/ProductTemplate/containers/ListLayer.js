import React, { useCallback } from 'react';
import * as _ from 'lodash';

import { Layer } from '@components/index';

export default function ListLayer({
  objects,
  onModifyObjects,
  canvas,
  objectsRef,
  template
}) {

  const cloneObjects = _.cloneDeep(objects);
  console.log(cloneObjects, "cloneObjects", typeof cloneObjects);

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
    const objectIndex = objects.findIndex((obj) => obj.name === name);
    if (objectIndex !== -1) {
      const updatedObjects = [...objects.slice(0, objectIndex), ...objects.slice(objectIndex + 1)];
      onModifyObjects(updatedObjects);
    }
  
    const object = _.find(canvas.getObjects(), (o) => o.name === name);
    if (object) {
      canvas.remove(object);
    }
  
    // Update objectsRef.current to reflect the deletion
    objectsRef.current = {
      ...objectsRef.current,
      [template]: objectsRef.current[template].filter(obj => obj.name !== name)
    };
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
        {/* Ensure cloneObjects is an array before using reverse and map */}
        {Array.isArray(cloneObjects) && cloneObjects.reverse().map((object, index) => renderLayer(object, index))}
      </div>
    </>
  );
}
