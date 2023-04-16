import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Grow, Slide } from "@mui/material";
import {
  GET_STAFF,
  GET_STAFF_MORE_CHARACTERS,
  GET_STAFF_MORE_STAFF_MEDIA,
} from "../lib/queries";
import { Heart } from "phosphor-react";
import {
  formatDateToString,
  groupStaffRolesByMedia,
  sortStaffMediaRolesByStartDate,
} from "../utils";
import { StaffModel } from "../types";
import { IntersectionObserverComponent } from "../components/IntersectionObserverComponent";
import {
  CircularLoading,
  StaffAnimeStaffRolesSkeleton,
  StaffCharactersSkeleton,
} from "../components/Loading";
import { SimpleHeader } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  MyDivider,
  MySpace,
  ReadMoreReadLess,
} from "../components/MyComponents";

export function Staff() {
  const { id } = useParams() as { id: string };
  const [isLoading, setIsLoading] = useState(false);

  const { data, error, fetchMore } = useQuery(GET_STAFF, {
    variables: { id: id },
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      document.title = `${data.Staff.name.full} · otakuVERISSIMO`;
      setIsLoading(false);
    },
    onError(error) {
      console.error(error);
      setIsLoading(false);
    },
  });

  const staff: StaffModel = data && data.Staff;

  return (
    <div className="flex flex-col justify-between min-h-screen pt-10">
      <SimpleHeader />

      <div className="flex flex-col gap-2 my-auto">
        {error && (
          <div className="flex flex-col p-4 mx-auto my-4 bg-zinc-50 shadow-xl rounded">
            <strong>{error.name}</strong>
            <span>{error.message}</span>
          </div>
        )}

        {!staff && !error && <CircularLoading />}

        {staff && (
          <div>
            <Slide in direction="down" timeout={300}>
              <div className="bg-gradient-to-t from-transparent via-zinc-100 to-zinc-100 px-4 py-4">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
                  <div className="flex flex-col-reverse md:flex-col gap-2">
                    <div className="min-w-max mx-auto">
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
                        className="w-56 rounded shadow-lg"
                      />
                    </div>

                    {staff.favourites > 0 && (
                      <div className="flex gap-1 items-center place-self-center min-h-[22px]">
                        <Heart
                          size={22}
                          weight="fill"
                          className="text-red-600"
                        />
                        <span className="text-zinc-600 text-sm font-medium">
                          {staff.favourites}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col p-4 gap-1">
                    <div className="flex flex-col gap-1 items-center md:items-start mb-4">
                      <strong className="text-2xl">{staff.name.full}</strong>
                      <span>{staff.name.native}</span>
                    </div>

                    {staff.dateOfBirth && (
                      <div>
                        <span className="font-medium">Birth: </span>
                        <span>
                          {formatDateToString(
                            staff.dateOfBirth.year,
                            staff.dateOfBirth.month,
                            staff.dateOfBirth.day
                          )}
                        </span>
                      </div>
                    )}

                    {staff.age && (
                      <div>
                        <span className="font-medium">Age: </span>
                        <span>{staff.age}</span>
                      </div>
                    )}

                    {staff.gender && (
                      <div>
                        <span className="font-medium">Gender: </span>
                        <span>{staff.gender}</span>
                      </div>
                    )}

                    {staff.yearsActive && staff.yearsActive.length > 0 && (
                      <div>
                        <span className="font-medium">Years active: </span>
                        <span>
                          {staff.yearsActive.length > 1
                            ? staff.yearsActive.map((year) => (
                                <span key={year}>{year}</span>
                              ))
                            : `${staff.yearsActive[0]} - Present`}
                        </span>
                      </div>
                    )}

                    {staff.homeTown && (
                      <div>
                        <span className="font-medium">Hometown: </span>
                        <span>{staff.homeTown}</span>
                      </div>
                    )}

                    {staff.bloodType && (
                      <div>
                        <span className="font-medium">Blood Type: </span>
                        <span>{staff.bloodType}</span>
                      </div>
                    )}

                    {staff.description && (
                      <ReadMoreReadLess
                        description={staff.description}
                        className="text-justify flex flex-col gap-1 [&_a]:text-main"
                      />
                    )}
                  </div>
                </div>
              </div>
            </Slide>

            <div>
              {staff.characters.edges.length > 0 && (
                <div className="px-4">
                  <MyDivider />
                  <div className="py-4 flex flex-col gap-4 max-w-6xl mx-auto">
                    {staff.characters.edges.map((edge, index, array) => (
                      <Grow in key={index} timeout={500}>
                        <div className="grid flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-300 rounded-full overflow-hidden shadow-black/20 shadow-md">
                              <Link to={`/character/${edge.node.id}`}>
                                <img
                                  src={edge.node.image.large}
                                  alt={edge.node.name.full}
                                  className="object-cover w-24 h-24 md:w-28 md:h-28"
                                  loading="lazy"
                                  style={{
                                    opacity: 0,
                                    transitionDuration: "700ms",
                                  }}
                                  onLoad={(t) => {
                                    t.currentTarget.style.opacity = "1";
                                  }}
                                />
                              </Link>
                            </div>

                            <div className="flex flex-col flex-1">
                              <Link
                                to={`/character/${edge.node.id}`}
                                className="w-fit"
                              >
                                <span className="font-medium text-lg break-all">
                                  {edge.node.name.full}
                                </span>
                              </Link>
                              <span className="text-sm text-main">
                                {edge.role}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] md:grid-cols-[repeat(auto-fill,176px)] gap-y-8 gap-x-4 justify-between">
                            {edge.media.map((media, index) => (
                              <Link key={index} to={`/anime/${media.id}`}>
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
                                    <span className="text-sm font-medium line-clamp-2 min-h-[20px]">
                                      {media.title.romaji}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>

                          {index < array.length - 1 && <MyDivider />}
                        </div>
                      </Grow>
                    ))}

                    {isLoading && <StaffCharactersSkeleton />}
                  </div>

                  {!isLoading && staff.characters.pageInfo.hasNextPage && (
                    <IntersectionObserverComponent
                      doSomething={() => {
                        setIsLoading(true);
                        fetchMore({
                          query: GET_STAFF_MORE_CHARACTERS,
                          variables: {
                            charactersPage:
                              staff.characters.pageInfo.currentPage + 1,
                            id: staff.id,
                          },
                          updateQuery(pv, { fetchMoreResult }) {
                            if (!fetchMoreResult) return pv;
                            return {
                              Staff: {
                                ...pv.Staff,
                                characters: {
                                  ...fetchMoreResult.Staff.characters,
                                  edges: [
                                    ...pv.Staff.characters.edges,
                                    ...fetchMoreResult.Staff.characters.edges,
                                  ],
                                },
                              },
                            };
                          },
                        });
                      }}
                      page={staff.characters.pageInfo.currentPage}
                    />
                  )}

                  <MySpace pxHeight={32} />
                </div>
              )}
            </div>

            <div>
              {staff.staffMedia.edges.length > 0 &&
                !staff.characters.pageInfo.hasNextPage && (
                  <div className="px-4 py-4">
                    <div className="flex flex-col gap-4 max-w-6xl mx-auto">
                      <div className="grid flex-col gap-4 rounded">
                        <strong className="text-lg font-medium uppercase font-sans">
                          Anime Staff Roles
                        </strong>

                        <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] md:grid-cols-[repeat(auto-fill,176px)] gap-y-8 gap-x-4 justify-between">
                          {sortStaffMediaRolesByStartDate(
                            groupStaffRolesByMedia(staff.staffMedia.edges)
                          ).map((edge, index) =>
                            edge.node.type == "ANIME" ? (
                              <Grow in timeout={500} key={index}>
                                <Link to={`/anime/${edge.node.id}`}>
                                  <div className="flex flex-col gap-2">
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
                                        className="shadow-black/20 shadow-md rounded"
                                      />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                      <span className="text-xs font-medium text-main line-clamp-2">
                                        {edge.node.title.romaji}
                                      </span>

                                      <div className="flex flex-col gap-1">
                                        {edge.staffRoles.map(
                                          (staffRole, index) => (
                                            <span
                                              key={index}
                                              className="text-xs font-medium line-clamp-1"
                                              title={staffRole}
                                            >
                                              {staffRole}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </Grow>
                            ) : (
                              <Grow in timeout={500} key={index}>
                                <div className="flex flex-col gap-2">
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
                                      className="shadow-black/20 shadow-md rounded"
                                    />
                                  </div>

                                  <div className="flex flex-col gap-1">
                                    <span className="text-xs font-medium text-main line-clamp-2">
                                      {edge.node.title.romaji}
                                    </span>

                                    <div className="flex flex-col gap-1">
                                      {edge.staffRoles.map(
                                        (staffRole, index) => (
                                          <span
                                            key={index}
                                            className="text-xs font-medium line-clamp-1"
                                            title={staffRole}
                                          >
                                            {staffRole}
                                          </span>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Grow>
                            )
                          )}

                          {isLoading && <StaffAnimeStaffRolesSkeleton />}
                        </div>
                      </div>
                    </div>

                    <MySpace pxHeight={32} />

                    {!isLoading && staff.staffMedia.pageInfo.hasNextPage && (
                      <IntersectionObserverComponent
                        doSomething={() => {
                          setIsLoading(true);

                          fetchMore({
                            query: GET_STAFF_MORE_STAFF_MEDIA,
                            variables: {
                              staffMediaPage:
                                staff.staffMedia.pageInfo.currentPage + 1,
                              id: staff.id,
                            },
                            updateQuery(pv, { fetchMoreResult }) {
                              if (!fetchMoreResult) return pv;

                              return {
                                Staff: {
                                  ...pv.Staff,
                                  staffMedia: {
                                    ...fetchMoreResult.Staff.staffMedia,
                                    edges: [
                                      ...pv.Staff.staffMedia.edges,
                                      ...fetchMoreResult.Staff.staffMedia.edges,
                                    ],
                                  },
                                },
                              };
                            },
                          });
                        }}
                        page={staff.staffMedia.pageInfo.currentPage}
                      />
                    )}
                  </div>
                )}
              <MyDivider />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
