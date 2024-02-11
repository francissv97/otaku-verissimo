export type TViewer = {
  id: number;
  name: string;
  avatar: { medium: string };
};

export type TStoredViewer = TViewer & {
  lastAccess: number /** Date.now() */;
};
