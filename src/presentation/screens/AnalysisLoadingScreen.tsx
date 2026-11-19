import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { BrandHeader } from "../components/BrandHeader";
import { colors } from "../theme/theme";

export function AnalysisLoadingScreen({ handle }: { handle: string }) {
  const progress = useRef(new Animated.Value(0.04)).current;
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1750,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: -8,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [float, progress]);

  return (
    <View style={styles.screen}>
      <BrandHeader />
      <View style={styles.content}>
        <Animated.View
          style={[styles.orb, { transform: [{ translateY: float }, { rotate: "6deg" }] }]}
        >
          <Ionicons name="sparkles" size={37} color="#FFFFFF" />
        </Animated.View>
        <View style={styles.status}>
          <View style={styles.dot} />
          <Text style={styles.statusText}>ANALIZANDO LAS PUBLICACIONES</Text>
        </View>
        <Text style={styles.title}>
          Analizando a <Text style={styles.highlight}>@{handle}</Text>
        </Text>
        <Text style={styles.description}>
          Revisando temas, lenguaje y estilo de comunicación del perfil.
        </Text>
        <View style={styles.track}>
          <Animated.View
            style={[
              styles.fill,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["4%", "100%"],
                }),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 28 },
  orb: {
    width: 92,
    height: 92,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.purple,
    shadowColor: colors.purple,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 8,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 34,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.purpleSoft,
  },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.purple },
  statusText: { color: colors.purple, fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  title: {
    color: colors.ink,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    letterSpacing: -1.5,
    textAlign: "center",
    marginTop: 20,
  },
  highlight: { color: colors.purple },
  description: {
    maxWidth: 330,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 11,
  },
  track: {
    width: "90%",
    height: 6,
    overflow: "hidden",
    borderRadius: 3,
    backgroundColor: "#E6E3ED",
    marginTop: 31,
  },
  fill: { height: "100%", borderRadius: 3, backgroundColor: colors.purple },
});
