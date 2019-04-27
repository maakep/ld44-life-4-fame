export type Player = {
  name: string,
  ip: string,
};

export type PlayerScore = {
  player: Player,
  highestScore: number,
};

export type ArchiveEntry = {
  name: string,
  scores: PlayerScore[],
};

export type ScoreArchive = ArchiveEntry[];

export type Payload = {
  archive?: ScoreArchive,
  activeScore: PlayerScore[],
};