import React from 'react';
import { publicAsset } from '../utils/publicAsset.js';

export function TellaMindMark({ className = '' }) {
  return <img className={`tellamind-mark-icon ${className}`.trim()} src={publicAsset('tellamind-mark.svg')} alt="" aria-hidden="true" />;
}
