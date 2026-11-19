import { StyleSheet, Text, View } from "react-native";

import type { PersonalityTrait } from "../../domain/entities/VocationalProfile";
import { colors } from "../theme/theme";

export function TraitBar({ trait }: { trait: PersonalityTrait }) {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.labels}>
          <Text style={styles.label}>{trait.label}</Text>
          <Text style={styles.description}>{trait.description}</Text>
        </View>
        <Text style={[styles.score, { color: trait.color }]}>{trait.score}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${trait.score}%`, backgroundColor: trait.color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  labels: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  label: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "700",
  },
  description: {
    color: "#9996A2",
    fontSize: 9,
  },
  score: {
    fontSize: 12,
    fontWeight: "800",
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: "#ECEAF0",
  },
  fill: {
    height: "100%",
    borderRadius: 3,
  },
});
