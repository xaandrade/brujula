import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../theme/theme";

interface BrandHeaderProps {
  onPress?: () => void;
}

export function BrandHeader({ onPress }: BrandHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Ir al inicio"
        disabled={!onPress}
        onPress={onPress}
        style={styles.brand}
      >
        <View style={styles.mark}>
          <Ionicons name="navigate" size={20} color="#FFFFFF" />
          <View style={styles.dot} />
        </View>
        <Text style={styles.name}>Brújula</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 78,
    marginHorizontal: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(35,34,58,0.14)",
    justifyContent: "center",
  },
  brand: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  mark: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    left: 7,
    top: 7,
    backgroundColor: colors.lime,
  },
  name: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.7,
  },
});
