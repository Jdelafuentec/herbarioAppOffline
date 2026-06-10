import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const PANORAMA =
  "https://oasisudd.github.io/observatorio/img/transecto6_Panorama_part1.jpg";
const PANORAMA_RATIO = 1876 / 14999;

export default function IntroScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [imageLoading, setImageLoading] = useState(true);

  const topPad = Platform.OS === "web" ? 24 : insets.top;
  const bottomPad = Platform.OS === "web" ? 24 : insets.bottom;

  const handleEnter = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push("/catalogo");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPad + 28 }}
      >
        <View style={[styles.header, { paddingTop: topPad + 28 }]}>
          <Image
            source={require("../assets/images/oasis-logo.png")}
            style={styles.oasisLogo}
            resizeMode="contain"
            accessibilityLabel="Observatorio de Salares Andinos (OASIS)"
          />
          <Text style={[styles.title, { color: colors.primary }]}>
            Herbario Digital
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Bofedales Altoandinos
          </Text>

          <View
            style={[
              styles.scrollHint,
              { backgroundColor: colors.secondary, borderRadius: 999 },
            ]}
          >
            <Ionicons name="arrow-down" size={14} color={colors.primary} />
            <Text style={[styles.scrollHintText, { color: colors.primary }]}>
              Desliza para recorrer el transecto
            </Text>
          </View>
        </View>

        <View style={[styles.panoWrap, { backgroundColor: colors.muted }]}>
          {imageLoading ? (
            <View style={styles.panoLoader}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : null}
          <Image
            source={{ uri: PANORAMA }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            onLoadEnd={() => setImageLoading(false)}
            accessibilityLabel="Vista aérea del transecto del ecosistema de bofedales altoandinos"
          />
        </View>

        <View style={styles.body}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            El ecosistema
          </Text>
          <Text style={[styles.paragraph, { color: colors.mutedForeground }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>

          <Pressable
            onPress={handleEnter}
            style={({ pressed }) => [
              styles.enterButton,
              {
                backgroundColor: colors.primary,
                borderRadius: 14,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.99 : 1 }],
              },
            ]}
            testID="enter-button"
          >
            <Text style={[styles.enterText, { color: colors.primaryForeground }]}>
              Entrar
            </Text>
            <Ionicons name="arrow-forward" size={20} color={colors.primaryForeground} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    alignItems: "center",
  },
  oasisLogo: {
    height: 24,
    width: 240,
    marginBottom: 18,
  },
  title: {
    fontSize: 34,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
    textAlign: "center",
  },
  scrollHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginTop: 18,
  },
  scrollHintText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  panoWrap: {
    width: "100%",
    aspectRatio: PANORAMA_RATIO,
    position: "relative",
  },
  panoLoader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    paddingTop: 80,
  },
  body: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 23,
    fontFamily: "Inter_400Regular",
    marginBottom: 28,
  },
  enterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
  },
  enterText: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
});
