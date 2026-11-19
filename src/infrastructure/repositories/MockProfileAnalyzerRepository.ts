import type { VocationalProfile } from "../../domain/entities/VocationalProfile";
import type { ProfileAnalyzerRepository } from "../../domain/repositories/ProfileAnalyzerRepository";

const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

export class MockProfileAnalyzerRepository implements ProfileAnalyzerRepository {
  async analyze(handle: string): Promise<VocationalProfile> {
    await delay(1800);

    return {
      handle,
      traits: [
        {
          key: "openness",
          label: "Apertura",
          score: 88,
          description: "Creativo y curioso",
          color: "#6C5CE7",
        },
        {
          key: "conscientiousness",
          label: "Responsabilidad",
          score: 76,
          description: "Organizado y constante",
          color: "#1F9D7A",
        },
        {
          key: "extraversion",
          label: "Extraversión",
          score: 64,
          description: "Sociable y expresivo",
          color: "#F28B50",
        },
        {
          key: "agreeableness",
          label: "Amabilidad",
          score: 82,
          description: "Empático y colaborador",
          color: "#E8B43C",
        },
        {
          key: "stability",
          label: "Estabilidad",
          score: 71,
          description: "Flexible ante los cambios",
          color: "#4E8FD8",
        },
      ],
      careers: [
        {
          id: "ux",
          title: "Diseño de experiencia",
          area: "Creatividad · Tecnología",
          affinity: 94,
          icon: "color-palette-outline",
          color: "#6855D6",
          backgroundColor: "#EEEAFF",
        },
        {
          id: "software",
          title: "Ingeniería de software",
          area: "Lógica · Innovación",
          affinity: 89,
          icon: "code-slash",
          color: "#328562",
          backgroundColor: "#E8F7EE",
        },
        {
          id: "communication",
          title: "Comunicación digital",
          area: "Personas · Contenido",
          affinity: 85,
          icon: "book-outline",
          color: "#D76F44",
          backgroundColor: "#FFF0E8",
        },
      ],
      dominantTrait: {
        label: "Apertura",
        summary:
          "Disfrutas explorar ideas, expresarte de forma original y aprender mediante la práctica.",
      },
    };
  }
}
