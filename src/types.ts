export interface Question {
  id: number;
  question: string;
  type: "frame" | "dialogue" | "quote" | "soundtrack" | "forca" | "general";
  points?: number;
  forca?: string;
  genres?: string[];
  answer: string;
  quote?: string;
  duration: number;
  image?: string;
  video?: string;
  audio?: string;
}