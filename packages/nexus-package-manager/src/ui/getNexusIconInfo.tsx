export function getNexusIconInfo(icon: string): { width: any; height: any; svgPath: any } {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [width, height, _ignoreOnce, _ignoreTwice, svgPath] = window.___FONT_AWESOME___.styles.fa[icon];
  return { width, height, svgPath };
}
