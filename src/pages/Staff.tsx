import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_STAFF } from "../lib/queries";
import { CircularLoading } from "../components/Loading";
import { SimpleHeader } from "../components/Header";
import { Footer } from "../components/Footer";
import { MyDivider } from "../components/MyComponents";
import { Grow } from "@mui/material";
import { StaffModel } from "../types";
import { Heart } from "phosphor-react";
import * as Tabs from "@radix-ui/react-tabs";

export function Staff() {
  const { id } = useParams() as { id: string };

  const { data, error } = useQuery(GET_STAFF, {
    variables: { id: id },
    notifyOnNetworkStatusChange: true,
  });

  const staff: StaffModel = data && data.Staff;

  if (error) console.error(error);

  if (staff) {
    const title = `${staff.name.full} · otakuVERISSIMO`;

    document.title = title;
  }

  if (error)
    return (
      <div className="flex flex-col p-4 m-auto bg-zinc-50 shadow-xl">
        <strong>{error.name}</strong>
        <span>{error.message}</span>
      </div>
    );

  if (!staff && !error) return <CircularLoading />;

  return (
    <div className="flex flex-col justify-between min-h-screen pt-10 bg-zinc-100">
      <SimpleHeader />

      {staff && (
        <div className="flex flex-col gap-2 mb-auto py-4 max-w-6xl mx-auto w-full">
          <div className="flex flex-col items-center">
            <strong className="text-2xl">{staff.name.full}</strong>
            <span>{staff.name.native}</span>
          </div>

          <div className="min-h-[312px] place-self-center">
            <img
              src={staff.image.large}
              alt={staff.name.full}
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

          <div className="flex gap-1 items-center place-self-center min-h-[22px]">
            <Heart size={22} weight="fill" className="text-red-600" />
            <span className="text-zinc-600 text-sm font-medium">
              {staff.favourites > 0 ? staff.favourites : 0}
            </span>
          </div>

          <MyDivider />

          <Tabs.Root defaultValue="voice">
            {/* <Tabs.List className="flex justify-center mt-auto w-full px-2 gap-3 md:gap-8 max-w-6xl bg-zinc-700 duration-200 text-zinc-100 text-md font-medium mx-auto rounded">
              <Tabs.Trigger
                className="uppercase py-2 text-[14px] md:text-[16px] hover:text-zinc-400 data-[state=active]:text-orange-500 border-b-2 border-transparent data-[state=active]:border-main duration-200"
                value="bio"
              >
                bio
              </Tabs.Trigger>

              <Tabs.Trigger
                className="uppercase py-2 text-[14px] md:text-[16px] hover:text-zinc-400 data-[state=active]:text-orange-500 border-b-2 border-transparent data-[state=active]:border-main duration-200"
                value="voice"
              >
                voice works
              </Tabs.Trigger>
              <Tabs.Trigger
                className="uppercase py-2 text-[14px] md:text-[16px] hover:text-zinc-400 data-[state=active]:text-orange-500 border-b-2 border-transparent data-[state=active]:border-main duration-200"
                value="anime"
              >
                anime staff roles
              </Tabs.Trigger>
            </Tabs.List> */}

            {/* <Tabs.Content value="bio" className="outline-none mt-4">
              <div className="grid">
                <span>Birth: </span>
                <span>Age: </span>
                <span>Gender: </span>
                <span>Years active: </span>
                <span>Hometown: </span>
              </div>
            </Tabs.Content> */}

            <Tabs.Content value="voice" className="outline-none mt-4">
              <Grow in timeout={600}>
                <div className="flex flex-col gap-4">
                  {staff.characters.edges.map((edge, index, array) => (
                    <div
                      key={edge.id}
                      className="grid px-4 flex-col gap-4 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-300 rounded-full">
                          <img
                            src={edge.node.image.large}
                            alt={edge.node.name.full}
                            className="object-cover w-24 h-24 md:w-32 md:h-32 shadow-black/20 shadow-lg rounded-full"
                            loading="lazy"
                            style={{
                              opacity: 0,
                              transitionDuration: "700ms",
                            }}
                            onLoad={(t) => {
                              t.currentTarget.style.opacity = "1";
                            }}
                            
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-lg">
                            {edge.node.name.full}
                          </span>
                          <span className="text-sm text-main">{edge.role}</span>
                        </div>
                      </div>

                      <strong className="text-lg font-medium">Series</strong>

                      <div className="grid grid-cols-[repeat(auto-fill,minmax(98px,1fr))] lg:grid-cols-[repeat(auto-fill,160px)] gap-y-4 gap-x-4 justify-between">
                        {edge.media.map((media) => (
                          <a key={media.id} href={`/anime/${media.id}`}>
                            <div className="rounded">
                              <div className="bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500 rounded">
                                <img
                                  src={media.coverImage.large}
                                  alt={media.title.romaji}
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

                              <div className="top-0 left-0 right-0 flex items-center pt-2">
                                <span className="text-sm text-main">
                                  {media.format
                                    ? media.format.replaceAll("_", " ")
                                    : ""}
                                </span>
                              </div>

                              <div className="bottom-0 left-0 right-0 flex items-center">
                                <span className="text-sm font-medium line-clamp-2 min-h-[20px]" >
                                  {media.title.romaji}
                                </span>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>

                      {index < array.length - 1 && <MyDivider />}
                    </div>
                  ))}
                </div>
              </Grow>
            </Tabs.Content>

            <Tabs.Content
              value="anime"
              className="outline-none mt-4"
            ></Tabs.Content>
          </Tabs.Root>
        </div>
      )}

      <MyDivider />

      <Footer />
    </div>
  );
}
