type SpaceProps = { pxHeight?: number };

export function Space({ pxHeight }: SpaceProps) {
  return <div style={{ height: pxHeight ? pxHeight : 8 }}></div>;
}
