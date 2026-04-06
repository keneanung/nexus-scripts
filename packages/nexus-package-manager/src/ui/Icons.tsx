import type { ComponentPropsWithoutRef, SVGProps } from 'react';
import { getNexusIconInfo } from './getNexusIconInfo';

type NexusIconProps = ComponentPropsWithoutRef<'svg'> & {
  icon: string;
};

/**
 * Returns an Icon for use in the Nexus 3 UI.
 * @param {NexusIconProps} root0 props
 * @param {string} root0.icon The icon name in the fontawesome library
 * @returns {EmotionJSX.Element} The Icon element to display.
 */
export const NexusIcon = ({ icon, ...otherProps }: NexusIconProps) => {
  const { width, height, svgPath } = getNexusIconInfo(icon);
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="svg-inline--fa"
      {...(otherProps as unknown as SVGProps<SVGSVGElement>)}
    >
      <path d={svgPath} />
    </svg>
  );
};
