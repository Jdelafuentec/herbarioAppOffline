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

import { PAISAJE_GLOBAL_IMAGES } from "@/constants/paisajes";
import { useColors } from "@/hooks/useColors";

const HERO_IMAGE = PAISAJE_GLOBAL_IMAGES[0];

export default function IntroScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [imageLoading, setImageLoading] = useState(true);

  const topPad = Platform.OS === "web" ? 24 : insets.top;
  const bottomPad = Platform.OS === "web" ? 24 : insets.bottom;

  const navigateTo = (path: "/catalogo" | "/paisajes") => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push(path);
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
        </View>

        <View style={[styles.panoWrap, { backgroundColor: colors.muted }]}>
          {imageLoading ? (
            <View style={styles.panoLoader}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : null}
          <Image
            source={{ uri: HERO_IMAGE }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            onLoadEnd={() => setImageLoading(false)}
            accessibilityLabel="Paisaje de humedales altoandinos"
          />
        </View>

        <View style={styles.body}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            El ecosistema
          </Text>
          <Text style={[styles.paragraph, { color: colors.mutedForeground }]}>
            Los humedales altoandinos son un mosaico de ambientes hídricos
            azonales donde la disponibilidad de agua, más que el clima regional,
            determina la vegetación y la estructura ecológica. A lo largo de un
            gradiente hídrico-salino conviven bofedales, vegas y pajonales, cada
            uno con su propia dinámica de agua y su flora característica.
          </Text>
          <Text style={[styles.paragraph, { color: colors.mutedForeground }]}>
            Este herbario reúne las especies documentadas en las campañas del
            Parque Nacional Nevado Tres Cruces y el sitio RAMSAR Complejo
            Lacustre Laguna del Negro Francisco y Laguna Santa Rosa, en la alta
            cordillera de la Región de Atacama.
          </Text>

          <Pressable
            onPress={() => navigateTo("/catalogo")}
            style={({ pressed }) => [
              styles.navButton,
              {
                backgroundColor: colors.primary,
                borderRadius: 14,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.99 : 1 }],
              },
            ]}
            testID="especies-button"
          >
            <Ionicons name="leaf" size={20} color={colors.primaryForeground} />
            <View style={styles.navButtonTextWrap}>
              <Text style={[styles.navButtonTitle, { color: colors.primaryForeground }]}>
                Especies
              </Text>
              <Text
                style={[styles.navButtonSubtitle, { color: colors.primaryForeground }]}
              >
                Catálogo de flora altoandina
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color={colors.primaryForeground} />
          </Pressable>

          <Pressable
            onPress={() => navigateTo("/paisajes")}
            style={({ pressed }) => [
              styles.navButton,
              styles.navButtonSecondary,
              {
                backgroundColor: colors.secondary,
                borderColor: colors.border,
                borderRadius: 14,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.99 : 1 }],
              },
            ]}
            testID="paisajes-button"
          >
            <Ionicons name="earth" size={20} color={colors.primary} />
            <View style={styles.navButtonTextWrap}>
              <Text style={[styles.navButtonTitle, { color: colors.foreground }]}>
                Paisajes
              </Text>
              <Text
                style={[styles.navButtonSubtitle, { color: colors.mutedForeground }]}
              >
                Bofedales, vegas y pajonales
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color={colors.primary} />
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
  panoWrap: {
    width: "100%",
    aspectRatio: 3 / 2,
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
    marginBottom: 16,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginTop: 12,
  },
  navButtonSecondary: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  navButtonTextWrap: {
    flex: 1,
  },
  navButtonTitle: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
  navButtonSubtitle: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginTop: 1,
  },
});
