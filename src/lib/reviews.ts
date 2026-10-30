// REAL customer reviews only. Ask each customer for permission before adding
// their words, name or voice. While this list is empty, the Reviews section
// and the hero voice card are hidden automatically.

export type Review = {
  name: string;
  city?: string;
  plan?: string;
  text?: string;
  audio?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
};

export const REVIEWS: Review[] = [
  {
    name: "Sajida",
    city: "Faisalabad",
    plan: "Custom Plan",
    text: "Love my every day meals",
    audio: "/audio/sajida.mp3",
  },
];