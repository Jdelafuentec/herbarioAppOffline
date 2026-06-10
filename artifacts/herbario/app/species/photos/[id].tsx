import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SPECIES_LIST } from "@/constants/species";
import { useColors } from "@/hooks/useColors";

const TOP_BAR_HEIGHT = 60;

export default function PhotoCarouselScreen() {
  const { id, category } = useLocalSearchParams<{ id: string; category?: string }>();
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const species = SPECIES_LIST.find((s) => s.id === id);
  const cat =
    species?.photos?.find((c) => c.key === category) ?? species?.photos?.[0];

  const [index, setIndex] = useState(0);

  const topPad = insets.top;

  if (!species || !cat || cat.images.length === 0) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background, paddingTop: topPad },
        ]}
      >
        <View style={[styles.topBar, { borderBottomColor: colors.border }]}>
          <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={8}>
            <Ionicons name="chevron-down" size={26} color={colors.primary} />
          </Pressable>
          <View style={styles.topBarCenter} />
          <View style={styles.backButton} />
        </View>
        <Text style={{ color: colors.foreground, padding: 20 }}>
          Fotos no encontradas.
        </Text>
      </View>
    );
  }

  const total = cat.images.length;
  const safeIndex = Math.min(index, total - 1);
  const slideHeight = Math.max(240, height - topPad - TOP_BAR_HEIGHT);

  const goTo = (next: number) => {
    if (next < 0 || next > total - 1) return;
    if (Platform.OS !== "web") {
      Haptics.selectionAsync();
    }
    setIndex(next);
  };

  const hasPrev = safeIndex > 0;
  const hasNext = safeIndex < total - 1;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: topPad },
      ]}
    >
      <View style={[styles.topBar, { borderBottomColor: colors.border }]}>
        <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-down" size={26} color={colors.primary} />
        </Pressable>
        <View style={styles.topBarCenter}>
          <Text style={[styles.topBarTitle, { color: colors.foreground }]}>
            {cat.label}
          </Text>
          <Text
            style={[styles.topBarSubtitle, { color: colors.mutedForeground }]}
            numberOfLines={1}
          >
            {species.scientificName}
          </Text>
        </View>
        <View style={styles.backButton} />
      </View>

      <View style={[styles.stage, { height: slideHeight }]}>
        <Image
          source={{ uri: cat.images[safeIndex] }}
          style={{ width, height: slideHeight }}
          resizeMode="contain"
        />

        {total > 1 ? (
          <View style={styles.arrowRow}>
            {hasPrev ? (
              <Pressable
                onPress={() => goTo(safeIndex - 1)}
                hitSlop={8}
                style={({ pressed }) => [
                  styles.arrowButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
              </Pressable>
            ) : (
              <View style={styles.arrowButtonPlaceholder} />
            )}

            {hasNext ? (
              <Pressable
                onPress={() => goTo(safeIndex + 1)}
                hitSlop={8}
                style={({ pressed }) => [
                  styles.arrowButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <Ionicons name="chevron-forward" size={28} color="#FFFFFF" />
              </Pressable>
            ) : (
              <View style={styles.arrowButtonPlaceholder} />
            )}
          </View>
        ) : null}
      </View>

      {total > 1 ? (
        <View style={[styles.counter, { bottom: insets.bottom + 20 }]}>
          <View style={[styles.counterPill, { backgroundColor: colors.foreground }]}>
            <Text style={[styles.counterText, { color: colors.background }]}>
              {safeIndex + 1} / {total}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  topBarCenter: {
    flex: 1,
    alignItems: "center",
  },
  topBarTitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  topBarSubtitle: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    fontStyle: "italic",
  },
  stage: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowRow: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    pointerEvents: "box-none",
  },
  arrowButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(52,59,77,0.55)",
  },
  arrowButtonPlaceholder: {
    width: 48,
    height: 48,
  },
  counter: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  counterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  counterText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
});
