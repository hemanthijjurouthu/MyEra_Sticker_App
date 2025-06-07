
import React, { useState, useRef } from 'react';
import Canvas from './components/Canvas';
import StickerButton from './components/StickerButton';
import './App.css';

const App = () => {
  const [stickers, setStickers] = useState([]);
  const stageRef = useRef();

  const stickerSources = [
    '/Stickers/sticker1.jpeg',
    '/Stickers/sticker2.jpeg',
    '/Stickers/sticker3.jpeg',
  ];

  const addSticker = (src) => {
    const id = Date.now();
    if (stickers.length > 0) {
      alert("Please delete the current sticker before adding a new one.");
      return;
    }    
    setStickers((prev) => [
      ...prev,
      { id, src, x: 0, y: 0, scale: 1 },
    ]);
  };

  const updateStickerPosition = (id, x, y) => {
    const snappedX = Math.round(x / 40) * 40;
    const snappedY = Math.round(y / 40) * 40;

    setStickers((prev) =>
      prev.map((sticker) =>
        sticker.id === id ? { ...sticker, x: snappedX, y: snappedY } : sticker
      )
    );
  };

  const deleteSticker = (id) => {
    setStickers((prev) => prev.filter((sticker) => sticker.id !== id));
  };

  const downloadCanvas = () => {
    if (!stageRef.current) return; 
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 p-6">
      <div className="md:w-1/4 w-full bg-white p-4 shadow-md rounded mb-4 md:mb-0 md:mr-4">
        <h2 className="text-lg font-semibold mb-2">Stickers</h2>
        <div className="flex md:flex-col flex-wrap gap-2">
          {stickerSources.map((src, index) => (
            <StickerButton key={index} src={src} onClick={() => addSticker(src)} />
          ))}
        </div>
        <button
          onClick={downloadCanvas}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
        >
          Download
        </button>
      </div>
      <div className="flex-1 flex justify-center items-center bg-white p-4 shadow-md ">
        <Canvas
          stickers={stickers}
          onDragEnd={updateStickerPosition}
          onDelete={deleteSticker}
          stageRef={stageRef}
        />
      </div>
    </div>
  );
};

export default App;
