import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import type { VocationalProfile } from "../../domain/entities/VocationalProfile";
import { BrandHeader } from "../components/BrandHeader";
import { TraitBar } from "../components/TraitBar";
import { colors } from "../theme/theme";

interface ResultsScreenProps {
  profile: VocationalProfile;
  onRestart: () => void;
}

export function ResultsScreen({ profile, onRestart }: ResultsScreenProps) {
  return (
    <View style={styles.screen}>
      <BrandHeader onPress={onRestart} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable onPress={onRestart} style={styles.back}>
          <Ionicons name="chevron-back" size={18} color={colors.muted} />
          <Text style={styles.backText}>Analizar otro perfil</Text>
        </Pressable>

        <View style={styles.eyebrow}>
          <Ionicons name="sparkles" size={12} color={colors.purple} />
          <Text style={styles.eyebrowText}>RESULTADO</Text>
        </View>
        <Text style={styles.title}>
          Perfil de <Text style={styles.highlight}>@{profile.handle}</Text>
        </Text>
        <Text style={styles.description}>
          Estimación basada en los temas, el lenguaje y el estilo de sus publicaciones recientes en TIKTOK.
        </Text>

        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile.handle.slice(0, 2).toUpperCase()}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileLabel}>Perfil analizado</Text>
            <Text style={styles.profileHandle}>@{profile.handle}</Text>
          </View>
          <View style={styles.check}>
            <Ionicons name="checkmark" size={14} color="#2A9B63" />
          </View>
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <View style={styles.sectionNumber}>
              <Text style={styles.sectionNumberText}>01</Text>
            </View>
            <View>
              <Text style={styles.panelTitle}>Personalidad</Text>
              <Text style={styles.panelSubtitle}>Modelo Big Five</Text>
            </View>
          </View>
          <View style={styles.traits}>
            {profile.traits.map((trait) => (
              <TraitBar key={trait.key} trait={trait} />
            ))}
          </View>
          <View style={styles.insight}>
            <Ionicons name="sparkles" size={19} color={colors.purple} />
            <Text style={styles.insightText}>
              <Text style={styles.insightStrong}>
                Rasgo dominante: {profile.dominantTrait.label}.{" "}
              </Text>
              {profile.dominantTrait.summary}
            </Text>
          </View>
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <View style={[styles.sectionNumber, styles.sectionNumberCoral]}>
              <Text style={[styles.sectionNumberText, styles.sectionNumberCoralText]}>02</Text>
            </View>
            <View>
              <Text style={styles.panelTitle}>Carreras relacionadas</Text>
              <Text style={styles.panelSubtitle}>Según los rasgos estimados</Text>
            </View>
          </View>
          <View style={styles.careers}>
            {profile.careers.map((career) => (
              <View key={career.id} style={styles.career}>
                <View style={[styles.careerIcon, { backgroundColor: career.backgroundColor }]}>
                  <Ionicons name={career.icon} size={23} color={career.color} />
                </View>
                <View style={styles.careerInfo}>
                  <Text style={styles.careerTitle}>{career.title}</Text>
                  <Text style={styles.careerArea}>{career.area}</Text>
                </View>
                <View style={styles.affinity}>
                  <Text style={styles.affinityValue}>{career.affinity}%</Text>
                  <Text style={styles.affinityLabel}>afinidad</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <Pressable onPress={onRestart} style={styles.restart}>
          <Ionicons name="refresh" size={17} color={colors.muted} />
          <Text style={styles.restartText}>Hacer otro análisis</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F6F5F0" },
  content: { paddingHorizontal: 14, paddingTop: 22, paddingBottom: 36 },
  back: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", gap: 4 },
  backText: { color: colors.muted, fontSize: 11 },
  eyebrow: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 25,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: colors.purpleSoft,
  },
  eyebrowText: { color: colors.purple, fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  title: {
    color: colors.ink,
    fontSize: 31,
    lineHeight: 36,
    fontWeight: "800",
    letterSpacing: -1.5,
    marginTop: 13,
  },
  highlight: { color: colors.purple },
  description: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 9 },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
  },
  avatar: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
    backgroundColor: colors.purple,
  },
  avatarText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  profileInfo: { flex: 1, marginLeft: 10 },
  profileLabel: { color: "#918E9B", fontSize: 9 },
  profileHandle: { color: colors.ink, fontSize: 12, fontWeight: "700", marginTop: 2 },
  check: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#DFF6E9",
  },
  panel: {
    marginTop: 14,
    padding: 19,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
  },
  panelHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 17,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  sectionNumber: {
    width: 39,
    height: 39,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
    backgroundColor: "#EEEAFF",
  },
  sectionNumberText: { color: colors.purple, fontSize: 11, fontWeight: "800" },
  sectionNumberCoral: { backgroundColor: "#FFF0E9" },
  sectionNumberCoralText: { color: "#DD7144" },
  panelTitle: { color: colors.ink, fontSize: 16, fontWeight: "800" },
  panelSubtitle: { color: "#94919E", fontSize: 10, marginTop: 2 },
  traits: { paddingTop: 19 },
  insight: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
    padding: 13,
    borderRadius: 12,
    backgroundColor: "#F2F0FF",
  },
  insightText: { flex: 1, color: "#66627B", fontSize: 10, lineHeight: 15 },
  insightStrong: { color: "#514A7B", fontWeight: "700" },
  careers: { paddingTop: 17, gap: 10 },
  career: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    padding: 11,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#EBE9EF",
  },
  careerIcon: {
    width: 43,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
  },
  careerInfo: { flex: 1 },
  careerTitle: { color: colors.ink, fontSize: 12, fontWeight: "700" },
  careerArea: { color: "#9996A2", fontSize: 9, marginTop: 4 },
  affinity: { alignItems: "flex-end" },
  affinityValue: { color: colors.purple, fontSize: 14, fontWeight: "800" },
  affinityLabel: { color: "#AAA7B3", fontSize: 8 },
  restart: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 14,
    marginTop: 8,
  },
  restartText: { color: colors.muted, fontSize: 11 },
});
