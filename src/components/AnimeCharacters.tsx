import { Grow } from "@mui/material";
import { IntersectionObserverComponent } from "./IntersectionObserverComponent";

type AnimeCharactersProps = {
  characters: {
    edges: {
      node: {
        id: number;
        name: { full: string };
        image: { medium: string };
      };
      voiceActorRoles: {
        roleNotes: string | null;
        voiceActor: {
          id: number;
          name: { full: string };
          image: { medium: string };
        };
      }[];
      role: "MAIN" | "SUPPORTING" | "BACKGROUND";
    }[];
    pageInfo: {
      currentPage: number;
      hasNextPage: boolean;
    };
  };
  pagingFunction: () => void;
};

export function AnimeCharacters({ characters, pagingFunction }: AnimeCharactersProps) {
  return (
    <Grow in timeout={400}>
      <div className="max-w-6xl mx-auto">
        <strong>Characters</strong>

        <div className="grid md:grid-cols-2 gap-4 pb-2 mt-2">
          {characters.edges.map((character) =>
            character.voiceActorRoles.length >= 1 ? (
              character.voiceActorRoles.map((voiceActorRole) => (
                <div
                  key={voiceActorRole.voiceActor.id}
                  className="flex bg-zinc-50 shadow-lg rounded overflow-hidden"
                >
                  <img
                    src={character.node.image.medium}
                    alt={character.node.name.full}
                    style={{
                      opacity: 0,
                      transitionDuration: "900ms",
                    }}
                    onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                    className="h-32 aspect-[6_/_9] object-cover"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex gap-1 p-2 w-fit">
                      <div className="flex flex-col gap-1 w-full">
                        <span className="text-sm font-medium ">
                          {character.node.name.full}
                        </span>

                        <span className="text-xs text-main">
                          {character.role}
                        </span>
                      </div>
                    </div>

                    {voiceActorRole && (
                      <div className="flex flex-col p-2 w-fit place-self-end">
                        {voiceActorRole.roleNotes && (
                          <span className="text-xs text-end text-main">
                            {voiceActorRole.roleNotes}
                          </span>
                        )}

                        <span className="text-sm font-medium text-end">
                          {voiceActorRole.voiceActor.name.full}
                        </span>
                      </div>
                    )}
                  </div>

                  {voiceActorRole && (
                    <img
                      src={voiceActorRole.voiceActor.image.medium}
                      alt={voiceActorRole.voiceActor.name.full}
                      style={{
                        opacity: 0,
                        transitionDuration: "900ms",
                      }}
                      onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                      className="h-32 aspect-[6_/_9] object-cover"
                    />
                  )}
                </div>
              ))
            ) : (
              <div
                key={character.node.id}
                className="flex bg-zinc-50 shadow-lg rounded overflow-hidden"
              >
                <div className="flex-1 flex">
                  <img
                    src={character.node.image.medium}
                    alt={character.node.name.full}
                    style={{
                      opacity: 0,
                      transitionDuration: "900ms",
                    }}
                    onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                    className="h-32 aspect-[6_/_9] object-cover"
                  />

                  <div className="flex gap-1 p-2">
                    <div className="flex flex-col gap-1 w-full">
                      <span className="text-sm font-medium ">
                        {character.node.name.full}
                      </span>

                      <span className="text-xs">{character.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {characters.pageInfo.hasNextPage && (
          <IntersectionObserverComponent
            page={characters.pageInfo.currentPage}
            doSomething={() => pagingFunction()}
          />
        )}
      </div>
    </Grow>
  );
}
