import type { VocationalProfile } from "../../domain/entities/VocationalProfile";
import type { ProfileAnalyzerRepository } from "../../domain/repositories/ProfileAnalyzerRepository";

export class AnalyzeTikTokProfile {
  constructor(private readonly repository: ProfileAnalyzerRepository) {}

  async execute(rawHandle: string): Promise<VocationalProfile> {
    const handle = rawHandle.trim().replace(/^@/, "");

    if (handle.length < 2) {
      throw new Error("El usuario de TikTok no es válido.");
    }

    return this.repository.analyze(handle);
  }
}
