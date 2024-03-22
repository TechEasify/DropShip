import { useEffect, useState } from 'react';
import { fabric } from 'fabric';

export function useCanvas(sizeEl, zoneEl) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    setSize({ width: sizeEl.current.offsetWidth });
  }, [sizeEl]);

  useEffect(() => {
    if (size.width !== 0) {
      setCanvas(new fabric.Canvas(zoneEl.current, {
        width: 1080,
        height: 1080,
        preserveObjectStacking: true,
      }));
    }
  }, [size, zoneEl]);

  return canvas;
}
