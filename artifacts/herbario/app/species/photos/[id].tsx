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
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SPECIES_LIST } from "@/constants/species";
import { useColors } from "@/hooks/useColors";

export default function PhotoCarouselScreen() {
  const { id, category } = useLocalSearchParams<{ id: string; category?: string }>();
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();

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
  const hasPrev = safeIndex > 0;
  const hasNext = safeIndex < total - 1;

  const goTo = (next: number) => {
    if (next < 0 || next > total - 1) return;
    if (Platform.OS !== "web") {
      Haptics.selectionAsync();
    }
    setIndex(next);
  };

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

      <View style={styles.imageWrap}>
        <Image
          source={{ uri: cat.images[safeIndex] }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {total > 1 ? (
        <View
          style={[
            styles.controlBar,
            {
              borderTopColor: colors.border,
              paddingBottom: insets.bottom + 16,
            },
          ]}
        >
          <Pressable
            onPress={() => goTo(safeIndex - 1)}
            disabled={!hasPrev}
            hitSlop={8}
            style={({ pressed }) => [
              styles.ctrlButton,
              {
                backgroundColor: colors.muted,
                opacity: !hasPrev ? 0.4 : pressed ? 0.7 : 1,
              },
            ]}
          >
            <Ionicons name="chevron-back" size={24} color={colors.foreground} />
          </Pressable>

          <Text style={[styles.ctrlCounter, { color: colors.mutedForeground }]}>
            {safeIndex + 1} / {total}
          </Text>

          <Pressable
            onPress={() => goTo(safeIndex + 1)}
            disabled={!hasNext}
            hitSlop={8}
            style={({ pressed }) => [
              styles.ctrlButton,
              {
                backgroundColor: colors.muted,
                opacity: !hasNext ? 0.4 : pressed ? 0.7 : 1,
              },
            ]}
          >
            <Ionicons name="chevron-forward" size={24} color={colors.foreground} />
          </Pressable>
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
  imageWrap: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
  },
  controlBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
    paddingTop: 14,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  ctrlButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  ctrlCounter: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    minWidth: 56,
    textAlign: "center",
  },
});
