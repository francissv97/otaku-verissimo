import { Link } from "react-router-dom";
import { Slide } from "@mui/material";
import { HorizontalCardSkeleton } from "../../../components/Loading";
import { IntersectionObserverComponent } from "../../../components/IntersectionObserverComponent";

interface CharactersContentProps {
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
}

export function CharactersContent({ characters, pagingFunction, isLoading }: CharactersContentProps) {
  return (
    <Slide in direction="up" timeout={500}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-2 grid gap-4 pb-2 md:grid-cols-2">
          {characters.edges.map((character) =>
            character.voiceActorRoles.length >= 1 ? (
              character.voiceActorRoles.map((voiceActorRole, index) => (
                <div key={index} className="flex overflow-hidden rounded-lg bg-zinc-800 shadow-lg">
                  <Link to={`/character/${character.node.id}`}>
                    <div className="overflow-hidden bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-300">
                      <img
                        src={character.node.image.medium}
                        alt={character.node.name.full}
                        style={{
                          opacity: 0,
                          transitionDuration: "600ms",
                        }}
                        onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                        className="aspect-[6/9] h-32 object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex w-fit gap-1 p-2">
                      <div className="flex w-full flex-col gap-1">
                        <Link to={`/character/${character.node.id}`}>
                          <span className="break-all text-sm font-medium">
                            {character.node.name.full}
                          </span>
                        </Link>
                        <span className="text-xs text-main">{character.role}</span>
                      </div>
                    </div>

                    {voiceActorRole && (
                      <div className="flex w-fit flex-col place-self-end p-2">
                        {voiceActorRole.roleNotes && (
                          <span className="text-end text-xs text-main">{voiceActorRole.roleNotes}</span>
                        )}

                        <Link to={`/staff/${voiceActorRole.voiceActor.id}`}>
                          <span className="text-end text-sm font-medium">
                            {voiceActorRole.voiceActor.name.full}
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>

                  {voiceActorRole && (
                    <Link to={`/staff/${voiceActorRole.voiceActor.id}`}>
                      <div className="overflow-hidden bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-300">
                        <img
                          src={voiceActorRole.voiceActor.image.medium}
                          alt={voiceActorRole.voiceActor.name.full}
                          style={{
                            opacity: 0,
                            transitionDuration: "600ms",
                          }}
                          onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                          className="aspect-[6_/_9] h-32 object-cover"
                        />
                      </div>
                    </Link>
                  )}
                </div>
              ))
            ) : (
              <div
                key={character.node.id}
                className="flex overflow-hidden rounded-lg bg-zinc-800 shadow-lg"
              >
                <div className="flex flex-1">
                  <img
                    src={character.node.image.medium}
                    alt={character.node.name.full}
                    style={{
                      opacity: 0,
                      transitionDuration: "600ms",
                    }}
                    onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                    className="aspect-[6_/_9] h-32 object-cover"
                  />

                  <div className="flex gap-1 p-2">
                    <div className="flex w-full flex-col gap-1">
                      <span className="text-sm font-medium ">{character.node.name.full}</span>

                      <span className="text-xs text-main">{character.role}</span>
                    </div>
                  </div>
                </div>
              </div>
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
    </Slide>
  );
}
