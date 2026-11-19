import type { VocationalProfile } from "../entities/VocationalProfile";

export interface ProfileAnalyzerRepository {
  analyze(handle: string): Promise<VocationalProfile>;
}
