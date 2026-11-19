export type TraitKey =
  | "openness"
  | "conscientiousness"
  | "extraversion"
  | "agreeableness"
  | "stability";

export interface PersonalityTrait {
  key: TraitKey;
  label: string;
  score: number;
  description: string;
  color: string;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  area: string;
  affinity: number;
  icon: "color-palette-outline" | "code-slash" | "book-outline";
  color: string;
  backgroundColor: string;
}

export interface VocationalProfile {
  handle: string;
  traits: PersonalityTrait[];
  careers: CareerRecommendation[];
  dominantTrait: {
    label: string;
    summary: string;
  };
}
