import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Module } from "../components/Module";
import { MessageCircle } from "lucide-react";
import { useAppSelector } from "../store";
import { SEOHead } from "../components/SEOHead";
import { useCurrentLesson } from "../hooks";
import { Button } from "../components/Button/Button";

export function Player() {
  const { currentLesson } = useCurrentLesson();
  const modules = useAppSelector((state) => {
    return state.player.course.modules;
  });

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center p-4">
      <SEOHead
        title={`Assistindo: ${currentLesson.title}`}
        description={currentLesson.title}
      />
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />
          <Button variant="contained">Enviar uma consulta</Button>
          <button className="flex items-center gap-2 rounded bg-violet-500 p-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="text-2xl w-4 h-4" />
            Deixar feedback
          </button>
        </div>
        <main className="flex flex-col relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow tablet:pr-80 tablet:flex-row">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800 tablet:absolute tablet:w-80">
            {modules.map(({ id, title, lessons }, index) => (
              <Module
                key={id}
                moduleIndex={index}
                title={title}
                lessonsCount={lessons.length}
              />
            ))}
          </aside>
        </main>
      </div>
    </div>
  );
}
