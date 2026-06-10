import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type ViewToken,
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
  const onViewRef = useRef(
    (info: { viewableItems: ViewToken[] }) => {
      const first = info.viewableItems[0];
      if (first && first.index != null) {
        setIndex(first.index);
      }
    },
  );
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

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

  const slideHeight = Math.max(240, height - topPad - TOP_BAR_HEIGHT);

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

      <FlatList
        data={cat.images}
        keyExtractor={(uri) => uri}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width, height: slideHeight }]}>
            <Image
              source={{ uri: item }}
              style={{ width, height: slideHeight }}
              resizeMode="contain"
            />
          </View>
        )}
      />

      {cat.images.length > 1 ? (
        <View style={[styles.counter, { bottom: insets.bottom + 20 }]}>
          <View style={[styles.counterPill, { backgroundColor: colors.foreground }]}>
            <Text style={[styles.counterText, { color: colors.background }]}>
              {index + 1} / {cat.images.length}
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
  slide: {
    alignItems: "center",
    justifyContent: "center",
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
