import type {
  CareerRecommendation,
  PersonalityTrait,
  VocationalProfile,
} from "../../domain/entities/VocationalProfile";
import type { ProfileAnalyzerRepository } from "../../domain/repositories/ProfileAnalyzerRepository";

const API_BASE_URL = (process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000").replace(
  /\/+$/,
  "",
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPersonalityTrait(value: unknown): value is PersonalityTrait {
  if (!isRecord(value)) {
    return false;
  }

  return (
    ["openness", "conscientiousness", "extraversion", "agreeableness", "stability"].includes(
      String(value.key),
    ) &&
    typeof value.label === "string" &&
    typeof value.score === "number" &&
    Number.isFinite(value.score) &&
    value.score >= 0 &&
    value.score <= 100 &&
    typeof value.description === "string" &&
    typeof value.color === "string"
  );
}

function isCareerRecommendation(value: unknown): value is CareerRecommendation {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.area === "string" &&
    typeof value.affinity === "number" &&
    Number.isFinite(value.affinity) &&
    value.affinity >= 0 &&
    value.affinity <= 100 &&
    ["color-palette-outline", "code-slash", "book-outline"].includes(String(value.icon)) &&
    typeof value.color === "string" &&
    typeof value.backgroundColor === "string"
  );
}

function isVocationalProfile(value: unknown): value is VocationalProfile {
  if (!isRecord(value) || !isRecord(value.dominantTrait)) {
    return false;
  }

  return (
    typeof value.handle === "string" &&
    Array.isArray(value.traits) &&
    value.traits.every(isPersonalityTrait) &&
    Array.isArray(value.careers) &&
    value.careers.every(isCareerRecommendation) &&
    typeof value.dominantTrait.label === "string" &&
    typeof value.dominantTrait.summary === "string"
  );
}

function getErrorMessage(payload: unknown, status: number): string {
  if (isRecord(payload) && isRecord(payload.error) && typeof payload.error.message === "string") {
    return payload.error.message;
  }

  return `El servidor respondió con el estado ${status}.`;
}

export class ApiProfileAnalyzerRepository implements ProfileAnalyzerRepository {
  async analyze(rawHandle: string): Promise<VocationalProfile> {
    const handle = rawHandle.trim().replace(/^@/, "");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}/api/profiles/analyze`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ handle }),
        signal: controller.signal,
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("La solicitud tardó demasiado. Comprueba la conexión e inténtalo de nuevo.");
      }

      throw new Error(
        "No se pudo conectar con la API. Comprueba que el backend esté activo y que la URL configurada sea accesible desde este dispositivo.",
      );
    } finally {
      clearTimeout(timeoutId);
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new Error("La API devolvió una respuesta que no contiene JSON válido.");
    }

    if (!response.ok) {
      throw new Error(getErrorMessage(payload, response.status));
    }

    if (!isVocationalProfile(payload) || payload.handle !== handle) {
      throw new Error("La API devolvió un perfil con un formato inesperado.");
    }

    return payload;
  }
}
