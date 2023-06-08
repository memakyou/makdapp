// xtypes.ts
export interface SongListSong {
  id: string;
  trackArt: string;
  trackName: string;
  trackDuration: string;
  url: string;
  artist: string;
  trackReleaseDate?: string | undefined;
  musicSongWriters: string[]; // Updated to match the definition in MusicPlayer.tsx
  lyricSongWriters?: string[] | undefined;
  vocalProducer?: string | undefined;
  recordProducer?: string | undefined;
  engineers?: string[] | undefined;
  mixing?: string | undefined;
  mastering?: string | undefined;
  label?: string | undefined;
}

export interface Song {
  id: string;
  trackArt: string;
  trackName: string;
  trackDuration: string;
  url: string;
  artist: string;
  trackReleaseDate?: string | undefined;
  musicSongWriters: string[]; // Update the type to string[]
  lyricSongWriters?: string[] | undefined; // Update the type to string[] | undefined
  vocalProducer?: string | undefined;
  recordProducer?: string | undefined;
  engineers?: string[] | undefined;
  mixing?: string | undefined;
  mastering?: string | undefined;
  label?: string | undefined;
}
