import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "../lib/queries";
import { CircularLoading } from "../components/Loading";
import { SimpleHeader } from "../components/Header";
import { Footer } from "../components/Footer";
import { MyDivider } from "../components/MyComponents";
import { Grow } from "@mui/material";
import { CharacterModel } from "../types";
import { Heart } from "phosphor-react";

export function Character() {
  const { id } = useParams() as { id: string };

  const { data, error } = useQuery(GET_CHARACTER, {
    variables: { id: id, withRoles: false },
    notifyOnNetworkStatusChange: true,
  });

  const character: CharacterModel = data && data.Character;

  if (error) console.error(error);

  if (character) {
    const title = `${character.name.full} · otakuVERISSIMO`;

    document.title = title;
  }

  useEffect(() => {
    scrollTo({ top: 0 });
  }, []);

  if (error)
    return (
      <div className="flex flex-col p-4 m-auto bg-zinc-50 shadow-xl">
        <strong>{error.name}</strong>
        <span>{error.message}</span>
      </div>
    );

  if (!character && !error) return <CircularLoading />;

  return (
    <div className="flex flex-col justify-between min-h-screen pt-10 bg-zinc-100">
      <SimpleHeader />

      {character && (
        <div className="flex flex-col gap-2 mb-auto py-4 max-w-6xl mx-auto w-full">
          <div className="flex flex-col items-center">
            <strong className="text-2xl">{character.name.full}</strong>
            <span>{character.name.native}</span>
          </div>

          <div className="min-h-[312px] place-self-center">
            <img
              src={character.image.large}
              alt={character.name.full}
              loading="lazy"
              style={{
                opacity: 0,
                transform: "scale(0.84)",
                transitionDuration: "700ms",
              }}
              onLoad={(t) => {
                t.currentTarget.style.opacity = "1";
                t.currentTarget.style.transform = "initial";
              }}
              className="w-52 rounded shadow-lg"
            />
          </div>

          {character.favourites > 0 && (
            <div className="flex gap-1 items-center place-self-center min-h-[22px]">
              <Heart size={22} weight="fill" className="text-red-600" />
              <span className="text-zinc-600 text-sm font-medium">
                {character.favourites}
              </span>
            </div>
          )}

          <MyDivider />

          <Grow in timeout={600}>
            <div className="flex flex-col gap-4 px-4">
              <strong className="text-lg font-medium">Series</strong>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] lg:grid-cols-[repeat(auto-fill,160px)] gap-y-4 gap-x-4 justify-between">
                {character.media.edges.map((edge) =>
                  edge.node.type == "ANIME" ? (
                    <Link key={edge.node.id} to={`/anime/${edge.node.id}`}>
                      <div className="bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500 rounded">
                        <img
                          src={edge.node.coverImage.large}
                          alt={edge.node.title.romaji}
                          loading="lazy"
                          style={{
                            opacity: 0,
                            aspectRatio: "6/9",
                            objectFit: "cover",
                            width: "100%",
                            transitionDuration: "700ms",
                          }}
                          onLoad={(t) => {
                            t.currentTarget.style.opacity = "1";
                          }}
                          className="shadow-black/20 shadow-lg rounded"
                        />
                      </div>

                      <span className="text-sm font-medium line-clamp-2 min-h-[20px] mt-2">
                        {edge.node.title.romaji}
                      </span>
                    </Link>
                  ) : (
                    <div key={edge.node.id}>
                      <div className="bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500 rounded">
                        <img
                          src={edge.node.coverImage.large}
                          alt={edge.node.title.romaji}
                          loading="lazy"
                          style={{
                            opacity: 0,
                            aspectRatio: "6/9",
                            objectFit: "cover",
                            width: "100%",
                            transitionDuration: "700ms",
                          }}
                          onLoad={(t) => {
                            t.currentTarget.style.opacity = "1";
                          }}
                          className="shadow-black/20 shadow-lg rounded"
                        />
                      </div>

                      <span className="text-sm font-medium line-clamp-2 min-h-[20px] mt-2">
                        {edge.node.title.romaji}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </Grow>
        </div>
      )}

      <MyDivider />

      <Footer />
    </div>
  );
}
