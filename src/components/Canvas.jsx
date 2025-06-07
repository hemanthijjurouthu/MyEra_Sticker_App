import React from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

const Canvas = ({ stickers, onDragEnd, onDelete, stageRef }) => {
  return (
    <div>
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={stageRef}>
        <Layer>
          {stickers.map((sticker) => (
            <DraggableSticker
              key={sticker.id}
              sticker={sticker}
              onDragEnd={onDragEnd}
              onDelete={onDelete}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

const DraggableSticker = ({ sticker, onDragEnd, onDelete }) => {
  const [image] = useImage(sticker.src);
  const [scale, setScale] = React.useState(1);
  const [position, setPosition] = React.useState({ x: sticker.x, y: sticker.y });

  React.useEffect(() => {
    if (image) {
      const scaleX = CANVAS_WIDTH / image.width;
      const scaleY = CANVAS_HEIGHT / image.height;
      const newScale = Math.max(scaleX, scaleY);

     
      const newX = (CANVAS_WIDTH - image.width * newScale) / 2;
      const newY = (CANVAS_HEIGHT - image.height * newScale) / 2;

      setScale(newScale);
      setPosition({ x: newX, y: newY });

     
      onDragEnd(sticker.id, newX, newY);
    }
  }, [image]);

  const handleDragEnd = (e) => {
    const { x, y } = e.target.position();
    setPosition({ x, y });
    onDragEnd(sticker.id, x, y);
  };

  const handleDblClick = () => {
    onDelete(sticker.id);
  };

  return (
    <KonvaImage
      image={image}
      x={position.x}
      y={position.y}
      scaleX={scale}
      scaleY={scale}
      draggable
      onDragEnd={handleDragEnd}
      onDblClick={handleDblClick}
    />
  );
};

export default Canvas;
