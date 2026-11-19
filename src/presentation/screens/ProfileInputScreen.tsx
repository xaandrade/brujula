import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { BrandHeader } from "../components/BrandHeader";
import { colors, radius } from "../theme/theme";

interface ProfileInputScreenProps {
  onAnalyze: (handle: string) => void;
}

export function ProfileInputScreen({ onAnalyze }: ProfileInputScreenProps) {
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    const cleanHandle = handle.trim().replace(/^@/, "");
    if (cleanHandle.length < 2) {
      setError("Escribe un usuario válido.");
      return;
    }
    setError("");
    onAnalyze(cleanHandle);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <BrandHeader />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.eyebrow}>
          <Ionicons name="sparkles" size={13} color={colors.purple} />
          <Text style={styles.eyebrowText}>PERFIL VOCACIONAL</Text>
        </View>

        <Text style={styles.title}>
          Analiza un perfil de <Text style={styles.highlight}>TikTok.</Text>
        </Text>
        <Text style={styles.subtitle}>
          Revisamos sus publicaciones recientes para estimar sus rasgos de personalidad y sugerir
          carreras relacionadas en  base al analisis hecho.
        </Text>

        <View style={styles.steps}>
          {["Big Five", "Contenido", "Carreras"].map((step, index) => (
            <View key={step} style={styles.step}>
              <Text style={styles.stepNumber}>0{index + 1}</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.tiktok}>
              <Ionicons name="logo-tiktok" size={23} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.cardTitle}>Perfil público</Text>
              <Text style={styles.cardSubtitle}>Ingresa un usuario de TikTok</Text>
            </View>
          </View>

          <Text style={styles.label}>Usuario de TikTok</Text>
          <View style={[styles.inputWrap, error ? styles.inputError : null]}>
            <Text style={styles.at}>@</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setHandle}
              onSubmitEditing={submit}
              placeholder="tu_usuario"
              placeholderTextColor="#AAA7B5"
              returnKeyType="go"
              style={styles.input}
              value={handle}
            />
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            accessibilityRole="button"
            onPress={submit}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>Analizar perfil</Text>
            <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
          </Pressable>

          <View style={styles.privacy}>
            <Ionicons name="shield-checkmark-outline" size={18} color="#5C5970" />
            <Text style={styles.privacyText}>
              No guardamos la información del perfil ni publicamos nada.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 18, paddingTop: 34, paddingBottom: 30 },
  eyebrow: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.purpleSoft,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },
  eyebrowText: { color: colors.purple, fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  title: {
    color: colors.ink,
    fontSize: 39,
    lineHeight: 43,
    fontWeight: "800",
    letterSpacing: -2,
    marginTop: 18,
  },
  highlight: { color: colors.purple },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 22, marginTop: 14 },
  steps: { flexDirection: "row", justifyContent: "space-between", marginTop: 25 },
  step: { gap: 3 },
  stepNumber: { color: colors.purple, fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  stepText: { color: colors.ink, fontSize: 11, fontWeight: "600" },
  card: {
    marginTop: 30,
    padding: 22,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#F0EEF3",
    shadowColor: "#312A5C",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.11,
    shadowRadius: 24,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    paddingBottom: 19,
    marginBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  tiktok: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.ink,
  },
  cardTitle: { color: colors.ink, fontSize: 18, fontWeight: "800" },
  cardSubtitle: { color: colors.muted, fontSize: 11, marginTop: 3 },
  label: { color: colors.ink, fontSize: 12, fontWeight: "700", marginBottom: 9 },
  inputWrap: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#DEDBE7",
    borderRadius: 12,
    backgroundColor: "#FBFAFC",
  },
  inputError: { borderColor: colors.error },
  at: { color: colors.purple, fontSize: 17, fontWeight: "700", marginLeft: 16 },
  input: { flex: 1, height: "100%", color: colors.ink, paddingHorizontal: 5, fontSize: 15 },
  error: { color: colors.error, fontSize: 11, marginTop: 6 },
  button: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 14,
    borderRadius: 12,
    backgroundColor: colors.purple,
  },
  buttonPressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
  buttonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  privacy: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
    marginTop: 18,
    padding: 13,
    borderRadius: 11,
    backgroundColor: "#F5F4F0",
  },
  privacyText: { flex: 1, color: "#757280", fontSize: 10, lineHeight: 15 },
});
