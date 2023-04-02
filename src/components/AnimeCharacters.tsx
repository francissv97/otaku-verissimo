import { Grow } from "@mui/material";
import { Link } from "react-router-dom";
import { IntersectionObserverComponent } from "./IntersectionObserverComponent";
import { HorizontalCardSkeleton } from "./Loading";

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
  isLoading: boolean;
};

export function AnimeCharacters({
  characters,
  pagingFunction,
  isLoading,
}: AnimeCharactersProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <strong>Characters</strong>

      <div className="grid md:grid-cols-2 gap-4 pb-2 mt-2">
        {characters.edges.map((character) =>
          character.voiceActorRoles.length >= 1 ? (
            character.voiceActorRoles.map((voiceActorRole) => (
              <Grow in timeout={600} key={voiceActorRole.voiceActor.id}>
                <div className="flex bg-zinc-50 shadow-lg rounded overflow-hidden">
                  <div className="bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-300">
                    <img
                      src={character.node.image.medium}
                      alt={character.node.name.full}
                      style={{
                        opacity: 0,
                        transitionDuration: "600ms",
                      }}
                      onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                      className="h-32 aspect-[6_/_9] object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex gap-1 p-2 w-fit">
                      <div className="flex flex-col gap-1 w-full">
                        <span className="text-sm font-medium break-all">
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

                        <Link to={`/staff/${voiceActorRole.voiceActor.id}`}>
                          <span className="text-sm font-medium text-end">
                            {voiceActorRole.voiceActor.name.full}
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>

                  {voiceActorRole && (
                    <Link to={`/staff/${voiceActorRole.voiceActor.id}`}>
                      <div className="bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-300">
                        <img
                          src={voiceActorRole.voiceActor.image.medium}
                          alt={voiceActorRole.voiceActor.name.full}
                          style={{
                            opacity: 0,
                            transitionDuration: "600ms",
                          }}
                          onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                          className="h-32 aspect-[6_/_9] object-cover"
                        />
                      </div>
                    </Link>
                  )}
                </div>
              </Grow>
            ))
          ) : (
            <Grow in key={character.node.id}>
              <div className="flex bg-zinc-50 shadow-lg rounded overflow-hidden">
                <div className="flex-1 flex">
                  <img
                    src={character.node.image.medium}
                    alt={character.node.name.full}
                    style={{
                      opacity: 0,
                      transitionDuration: "600ms",
                    }}
                    onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                    className="h-32 aspect-[6_/_9] object-cover"
                  />

                  <div className="flex gap-1 p-2">
                    <div className="flex flex-col gap-1 w-full">
                      <span className="text-sm font-medium ">
                        {character.node.name.full}
                      </span>

                      <span className="text-xs text-main">
                        {character.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Grow>
          )
        )}

        {isLoading && <HorizontalCardSkeleton />}
      </div>

      {!isLoading && characters.pageInfo.hasNextPage && (
        <IntersectionObserverComponent
          page={characters.pageInfo.currentPage}
          doSomething={() => pagingFunction()}
        />
      )}
    </div>
  );
}
