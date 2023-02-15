import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ANIME_MEDIA } from "../lib/queries";
import { AnimeMedia } from "../types";
import { Loading } from "../components/Loading";
import logo from "../assets/logo.svg";
import { ArrowFatLeft } from "phosphor-react";
import { Space } from "../components/Space";
import { Divider } from "antd";
import { useState } from "react";

export function Anime() {
  const [showSpoilerTags, setShowSpoilerTags] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const query = useQuery(GET_ANIME_MEDIA, {
    variables: { id },
  });

  const anime: AnimeMedia = query.data && query.data.Media;

  return !anime ? (
    <Loading />
  ) : (
    <div>
      <div className="hidden md:block fixed h-16 bg-zinc-700/20 right-0 left-0 top-0"></div>
      <div className="flex fixed w-full justify-between max-w-5xl mx-auto px-4 right-0 left-0">
        <div
          className="p-4 cursor-pointer transition bg-main/10 hover:bg-main/20 rounded-full"
          onClick={() => navigate("/")}
        >
          <ArrowFatLeft size={32} className="text-main" />
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <img
            src={logo}
            alt="97AnimeList"
            className="h-12 my-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      </div>

      {anime.bannerImage ? (
        <img
          src={anime.bannerImage}
          className="h-48 md:h-80 w-full object-cover object-center"
          alt="anime banner image"
        />
      ) : (
        <Space pxHeight={64} />
      )}

      <div
        className={`flex flex-col md:flex-row gap-x-4 gap-y-2 max-w-5xl mx-auto px-4 pt-4`}
      >
        <img
          src={anime.coverImage.large}
          alt="anime cover image"
          className={`rounded-md w-24 md:w-52 shadow-xl place-self-start`}
        />

        <div className="flex flex-col gap-1">
          <h1 className="text-lg text-zinc-600 md:self-start whitespace-nowrap truncate">
            {anime.title.romaji}
          </h1>

          <span>{anime.seasonYear}</span>

          <div className="flex gap-1">
            <span>{anime.format}</span>

            {anime.episodes && (
              <>
                {"·"}
                <span>{`${anime.episodes} ${
                  anime.episodes > 1 ? "episodes" : "episode"
                }`}</span>
              </>
            )}
          </div>

          <ul className="flex gap-2 flex-wrap">
            {anime.genres.map((genre) => (
              <li
                key={genre}
                className="bg-zinc-600 rounded text-zinc-200 px-1"
              >
                {genre}
              </li>
            ))}
          </ul>

          <div className="flex flex-col mt-4">
            <strong>Description</strong>
            <p
              className="text-justify"
              dangerouslySetInnerHTML={{ __html: anime.description }}
            ></p>
          </div>
        </div>
      </div>

      <Divider className="my-4 bg-zinc-400/70" />

      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between mb-4">
          <strong className="font-medium">Tags</strong>
          <button
            className="text-emerald-600"
            onClick={() => setShowSpoilerTags(!showSpoilerTags)}
          >
            {showSpoilerTags ? "Hide Spoiler" : "Show Spoiler"}
          </button>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          {anime.tags.map((tag) => {
            if (!tag.isMediaSpoiler || showSpoilerTags) {
              return (
                <div key={tag.id} className="flex justify-between">
                  <span
                    className={
                      tag.isMediaSpoiler ? "text-main" : "text-zinc-600"
                    }
                  >
                    {tag.name}
                  </span>
                  <span
                    className={
                      tag.isMediaSpoiler ? "text-main" : "text-zinc-600"
                    }
                  >
                    {tag.rank + "%"}
                  </span>
                </div>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
