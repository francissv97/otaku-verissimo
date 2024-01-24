import { useToken } from "./useToken";
import { IViewer, IViewerLocalStorage } from "@/types/IViewer";

const GET_VIEWER = `
  query ViewerQuery {
    Viewer {
      id
      name
      avatar {
        medium
      }
    }
  }
`;

export function useViewer() {
  const { getURLToken, getLocalStorageToken } = useToken();

  function getLocalStorageViewer() {
    const viewer = localStorage.getItem("viewer");
    return viewer ? (JSON.parse(viewer) as IViewerLocalStorage) : null;
  }

  async function performViewerFetch(token: string): Promise<IViewer | undefined> {
    try {
      const viewerFetch = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ query: GET_VIEWER }),
      });

      if (!viewerFetch.ok) {
        throw new Error(`Error on request Viewer: ${viewerFetch.status}`);
      }

      const viewerData = await viewerFetch.json();

      localStorage.setItem(
        "viewer",
        JSON.stringify({ ...viewerData.data.Viewer, lastAccess: Date.now() })
      );

      return viewerData.data.Viewer;
    } catch (error) {
      console.error("Error on request Viewer:", error);
      return undefined;
    }
  }

  async function refreshViewerDataIfNeeded(): Promise<IViewer | undefined> {
    const urlToken = getURLToken();

    if (urlToken) {
      localStorage.setItem("access_token", urlToken);

      await performViewerFetch(urlToken);
    } else {
      const accessToken = getLocalStorageToken();

      if (!accessToken) return;

      const viewer = getLocalStorageViewer();

      if (!viewer) return;

      const timestampDifference = Date.now() - viewer.lastAccess;
      const oneHourInMs = 60 * 60 * 1000;

      if (timestampDifference > oneHourInMs) {
        await performViewerFetch(accessToken);
      } else {
        return viewer;
      }
    }
  }

  return {
    getLocalStorageViewer,
    refreshViewerDataIfNeeded,
  };
}
