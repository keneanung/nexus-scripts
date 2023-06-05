import { SVGProps } from 'react';
import { getNexusIconInfo } from './getNexusIconInfo';

export const NexusIcon = ({ icon, ...otherProps }: SVGProps<SVGSVGElement> & { icon: string }) => {
  const { width, height, svgPath } = getNexusIconInfo(icon);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="svg-inline--fa" {...otherProps}>
      <path d={svgPath} />
    </svg>
  );
};
