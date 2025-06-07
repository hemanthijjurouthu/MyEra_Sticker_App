import React from 'react';

const StickerButton = ({ src, onClick }) => (
  <button
    onClick={onClick}
    className="m-1 p-1 rounded hover:scale-105 transition-transform shadow"
  >
    <img
      src={src}
      alt="sticker"
      className="w-[50px] h-[50px] object-contain"
    />
  </button>
);

export default StickerButton;
