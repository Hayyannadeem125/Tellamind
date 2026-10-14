import React from 'react';
import { publicAsset } from '../utils/publicAsset.js';

export function SnapchatGhostIcon() {
  return (
    <img
      className="snapchat-ghost-icon"
      src={`${publicAsset('iconofsnapchat-black.png')}?v=3`}
      alt="Snapchat Ghost Icon"
      aria-hidden="true"
    />
  );
}
