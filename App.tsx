import { useMemo, useState } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AnalyzeTikTokProfile } from "./src/application/use-cases/AnalyzeTikTokProfile";
import type { VocationalProfile } from "./src/domain/entities/VocationalProfile";
import { ApiProfileAnalyzerRepository } from "./src/infrastructure/repositories/ApiProfileAnalyzerRepository";
import { AnalysisLoadingScreen } from "./src/presentation/screens/AnalysisLoadingScreen";
import { ProfileInputScreen } from "./src/presentation/screens/ProfileInputScreen";
import { ResultsScreen } from "./src/presentation/screens/ResultsScreen";

type Screen = "input" | "loading" | "results";

export default function App() {
  const [screen, setScreen] = useState<Screen>("input");
  const [handle, setHandle] = useState("");
  const [profile, setProfile] = useState<VocationalProfile | null>(null);

  const analyzeProfile = useMemo(
    () => new AnalyzeTikTokProfile(new ApiProfileAnalyzerRepository()),
    [],
  );

  const handleAnalyze = async (rawHandle: string) => {
    setHandle(rawHandle);
    setScreen("loading");

    try {
      const result = await analyzeProfile.execute(rawHandle);
      setProfile(result);
      setScreen("results");
    } catch (error) {
      setScreen("input");
      Alert.alert(
        "No se pudo analizar el perfil",
        error instanceof Error ? error.message : "Ocurrió un error inesperado.",
      );
    }
  };

  const restart = () => {
    setHandle("");
    setProfile(null);
    setScreen("input");
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {screen === "input" && <ProfileInputScreen onAnalyze={handleAnalyze} />}
      {screen === "loading" && <AnalysisLoadingScreen handle={handle} />}
      {screen === "results" && profile && <ResultsScreen profile={profile} onRestart={restart} />}
    </SafeAreaProvider>
  );
}
