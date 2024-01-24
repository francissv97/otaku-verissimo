export interface IViewer {
  id: number;
  name: string;
  avatar: { medium: string };
}

export interface IViewerLocalStorage extends IViewer {
  lastAccess: number /** Date.now() */;
}
