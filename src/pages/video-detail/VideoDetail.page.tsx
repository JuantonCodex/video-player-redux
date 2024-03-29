import { Header } from "./components/Header";
import { MessageCircle } from "lucide-react";
import { useAppSelector } from "../../store";
import { SEOHead } from "../../shared/components/SEOHead";
import { useVideoPlayer } from "../../features/videoPlayer/hooks";
import { Button } from "../../shared/components/Button";
import { VideoList } from "../../features/videoPlayer/components/VideoList";
import { useDispatch } from "react-redux";
import { next } from "../../features/videoPlayer/store/slices/player.slice";
import ReactPlayer from "react-player";
import { useParams } from "@tanstack/react-router";
import { usePlaylistDetailsQuery } from "@/modules/youtube/hooks/queries";

interface IRouteParams {
  id: string;
}

export function VideoDetailPage() {
  const dispatch = useDispatch();
  const { id }: IRouteParams = useParams({ strict: false });
  const { data } = usePlaylistDetailsQuery({
    isEnabled: true,
    playlistId: id,
  });

  console.log("data", data);
  const { currentElement } = useVideoPlayer();
  const pageTitle = currentElement?.title ?? "";

  const videoLists = useAppSelector((state) => {
    return state.player.collection?.groups;
  });

  const handleOnNextVideo = () => {
    dispatch(next());
  };

  return (
    <div className="flex h-auto max-h-screen items-start justify-center bg-zinc-950 p-4 text-zinc-50">
      <SEOHead title={`${pageTitle}`} description={pageTitle} />
      <div className="flex w-[1200px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />
          <Button
            variant="contained"
            startIcon={<MessageCircle className="h-4 w-4 text-2xl" />}
          >
            Reportar incoveniente
          </Button>
        </div>
        <main className="tablet:flex-row tablet:pr-80 relative flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow">
          <div className="flex-1">
            {currentElement && (
              <div className="aspect-video w-full bg-zinc-950">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  controls
                  playing
                  onEnded={handleOnNextVideo}
                  url={`https://www.youtube.com/watch?v=${currentElement.id}`}
                />
              </div>
            )}
          </div>
          <aside className="tablet:absolute tablet:w-80 bottom-0 right-0 top-0 divide-y-2 divide-zinc-900 overflow-y-scroll border-l border-zinc-800 bg-zinc-900 scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {videoLists?.map(({ id, title, elements }, index) => (
              <VideoList
                key={id}
                videoListIndex={index}
                title={title}
                videoListsCount={elements.length}
              />
            ))}
          </aside>
        </main>
      </div>
    </div>
  );
}
