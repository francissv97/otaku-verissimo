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

  async function performViewerFetch(
    token: string,
  ): Promise<IViewerLocalStorage | undefined> {
    try {
      const viewerFetch = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: GET_VIEWER }),
      });

      if (!viewerFetch.ok) {
        throw new Error(`Error on request Viewer: ${viewerFetch.status}`);
      }

      const viewerData = await viewerFetch.json();
      const viewerLocalStorage = {
        ...viewerData.data.Viewer,
        lastAccess: Date.now(),
      };

      localStorage.setItem("viewer", JSON.stringify(viewerLocalStorage));

      return viewerLocalStorage as IViewerLocalStorage;
    } catch (error) {
      console.error("Error on request Viewer:", error);
      return undefined;
    }
  }

  async function refreshViewerDataIfNeeded(): Promise<
    IViewerLocalStorage | undefined
  > {
    const urlToken = getURLToken();

    if (!urlToken) {
      const accessToken = getLocalStorageToken();

      if (!accessToken) return;

      const viewer = getLocalStorageViewer() as IViewerLocalStorage;

      if (!viewer) return;

      const timestampDifference = Date.now() - viewer.lastAccess;
      const oneHourInMs = 60 * 60 * 1000;

      if (timestampDifference > oneHourInMs) {
        return await performViewerFetch(accessToken);
      } else {
        return viewer;
      }
    }

    localStorage.setItem("access_token", urlToken);

    return await performViewerFetch(urlToken);
  }

  return {
    getLocalStorageViewer,
    refreshViewerDataIfNeeded,
  };
}
