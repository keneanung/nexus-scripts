import { SVGProps } from 'react';
import { getNexusIconInfo } from './getNexusIconInfo';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

/**
 * Returns an Icon for use in the Nexus 3 UI.
 * @param {{icon:string} & SVGProps} root0 props
 * @param {string} root0.icon The icon name in the fontawesome library
 * @returns {EmotionJSX.Element} The Icon element to display.
 */
export const NexusIcon = ({ icon, ...otherProps }: SVGProps<SVGSVGElement> & { icon: string }) => {
  const { width, height, svgPath } = getNexusIconInfo(icon);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="svg-inline--fa" {...otherProps}>
      <path d={svgPath} />
    </svg>
  );
};
