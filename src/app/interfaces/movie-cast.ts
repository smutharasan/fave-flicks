export interface MovieCast {
  id: number;
  cast: Array<{
    name: string;
    character: string;
    knownFor: string;
    profilePath: string;
  }>;

  crew: Array<{
    name: string;
    job: string;
    knownFor: string;
    profilePath: string;
  }>;
}
