/**
 * Returns the information about a given FontAwesome icon.
 * @param {string} icon The icon to get the information for.
 * @returns {{width:number,height:number,svgPath:string}} Width, height and the SVG path for the given icon.
 */
export function getNexusIconInfo(icon: string): { width: number; height: number; svgPath: string } {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [width, height, _ignoreOnce, _ignoreTwice, svgPath] = window.___FONT_AWESOME___.styles.fa[icon];
  return { width, height, svgPath };
}
