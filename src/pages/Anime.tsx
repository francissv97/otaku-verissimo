import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Pagination } from "antd";
import { GET_ANIME_MEDIA } from "../lib/queries";
import { AnimeMedia } from "../types";
import { Loading } from "../components/Loading";
import { MyDivider } from "../components/MyComponents";
import { Space } from "../components/MyComponents";
import { Footer } from "../components/Footer";
import { X } from "phosphor-react";
import logo from "../assets/logo.svg";

export function Anime() {
  const [showSpoilerTags, setShowSpoilerTags] = useState(false);
  const { id } = useParams() as { id: string };

  const query = useQuery(GET_ANIME_MEDIA, {
    variables: { id },
  });

  const anime: AnimeMedia = query.data && query.data.Media;

  return !anime ? (
    <Loading />
  ) : (
    <div>
      {anime.bannerImage ? (
        <img
          src={anime.bannerImage}
          className="h-48 md:h-80 w-full object-cover object-center"
          alt="anime banner image"
        />
      ) : (
        <Space pxHeight={64} />
      )}

      <AnimeHeader />

      <div className={`${anime.bannerImage && "-mt-32 md:-mt-0"}`}>
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-2 max-w-5xl mx-auto pt-4">
          <img
            src={anime.coverImage.large}
            alt={anime.title.romaji + " - cover image"}
            className={`rounded w-24 md:w-52 shadow-xl place-self-start ml-4 ${
              anime.bannerImage && "md:-mt-28"
            }`}
          />

          <div className="flex flex-1 flex-col gap-1">
            <h1 className="text-lg text-zinc-600 md:self-start md:break-words px-4">
              {anime.title.romaji}
            </h1>

            <div className="flex gap-2 px-4">
              {anime.seasonYear && (
                <>
                  <span className="text-emerald-700">{anime.seasonYear}</span>
                  {"·"}
                </>
              )}

              <div className="flex gap-1">
                {anime.format && (
                  <>
                    <span>{anime.format}</span>
                  </>
                )}

                {anime.episodes && (
                  <>
                    {"·"}
                    <span>{`${anime.episodes} ${
                      anime.episodes > 1 ? "episodes" : "episode"
                    }`}</span>
                  </>
                )}
              </div>
            </div>

            <ul className="flex gap-2 flex-wrap px-4">
              {anime.genres.map((genre) => (
                <li
                  key={genre}
                  className="bg-amber-700 rounded text-zinc-200 px-1"
                >
                  {genre}
                </li>
              ))}
            </ul>

            <MyDivider className="md:ml-4" />

            <div className="flex flex-col px-4">
              <strong className="mb-2">Description</strong>
              <p
                className="text-justify"
                dangerouslySetInnerHTML={{ __html: anime.description }}
              ></p>
            </div>
          </div>
        </div>

        <MyDivider />

        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between mb-4">
            <strong className="font-semibold">Tags</strong>
            {anime.tags.find((item) => item.isMediaSpoiler === true) && (
              <button
                className="text-emerald-600"
                onClick={() => setShowSpoilerTags(!showSpoilerTags)}
              >
                {showSpoilerTags ? "Hide Spoiler" : "Show Spoiler"}
              </button>
            )}
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

      <MyDivider />

      <Footer />
    </div>
  );
}

function AnimeHeader() {
  const navigate = useNavigate();

  return (
    <>
      <div className="hidden sm:block fixed h-16 bg-zinc-800/40 backdrop-blur-sm left-0 right-0 top-0"></div>
      <div className="flex z-10 fixed w-full justify-between max-w-5xl mx-auto px-4 right-0 left-0 top-0">
        <div
          className="p-4 cursor-pointer transition bg-main/10 hover:bg-main/20 rounded-full"
          onClick={() => navigate(-1)}
        >
          <X size={28} className="text-main" />
        </div>

        <div className="hidden sm:flex flex-1 justify-center">
          <img
            src={logo}
            alt="otakuVERISSIMOlogo"
            className="h-12 my-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </>
  );
}
