import { createMockSong } from "@/test/factories/song.factory";
import { SongForm } from "./SongForm";

export const Basic = () => <SongForm song={createMockSong()} />;
