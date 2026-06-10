import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChileMap } from "@/components/ChileMap";
import { activeRegionCods, CHILE_REGIONS } from "@/constants/chileRegions";
import { SPECIES_LIST } from "@/constants/species";
import { useColors } from "@/hooks/useColors";

export default function DistributionMapScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const species = SPECIES_LIST.find((s) => s.id === id);

  const activeCods = useMemo(
    () => (species ? activeRegionCods(species.distribution) : new Set<number>()),
    [species],
  );

  const activeRegions = useMemo(
    () => CHILE_REGIONS.filter((r) => activeCods.has(r.cod)),
    [activeCods],
  );

  const [selectedCod, setSelectedCod] = useState<number | null>(null);

  if (!species) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.foreground }}>Especie no encontrada.</Text>
      </View>
    );
  }

  const selectedRegion = CHILE_REGIONS.find((r) => r.cod === selectedCod) ?? null;
  const selectedIsActive = selectedCod != null && activeCods.has(selectedCod);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: insets.top },
      ]}
    >
      <View style={[styles.topBar, { borderBottomColor: colors.border }]}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={8}
        >
          <Ionicons name="chevron-down" size={26} color={colors.primary} />
        </Pressable>
        <View style={styles.topBarCenter}>
          <Text style={[styles.topBarTitle, { color: colors.foreground }]}>
            Distribución en Chile
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

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        {/* Tap hint / selected region banner */}
        <View
          style={[
            styles.banner,
            {
              backgroundColor: selectedRegion ? colors.secondary : colors.muted,
              borderColor: colors.border,
              borderRadius: 12,
            },
          ]}
        >
          {selectedRegion ? (
            <>
              <View
                style={[
                  styles.bannerDot,
                  {
                    backgroundColor: selectedIsActive
                      ? colors.primary
                      : colors.mutedForeground,
                  },
                ]}
              />
              <Text style={[styles.bannerText, { color: colors.foreground }]}>
                {selectedRegion.name}
                {selectedIsActive ? " · presente" : " · sin registro"}
              </Text>
            </>
          ) : (
            <>
              <Ionicons
                name="hand-left-outline"
                size={16}
                color={colors.mutedForeground}
              />
              <Text style={[styles.bannerText, { color: colors.mutedForeground }]}>
                Toca una región del mapa para ver su nombre
              </Text>
            </>
          )}
        </View>

        <View style={styles.mapRow}>
          <View style={styles.mapColumn}>
            <ChileMap
              activeCods={activeCods}
              height={560}
              activeColor={colors.primary}
              inactiveColor={colors.secondary}
              borderColor={colors.background}
              selectedCod={selectedCod}
              selectedColor={colors.highlight}
              onPressRegion={(cod) =>
                setSelectedCod((prev) => (prev === cod ? null : cod))
              }
            />
          </View>

          <View style={styles.legendColumn}>
            <Text style={[styles.legendTitle, { color: colors.primary }]}>
              Regiones
            </Text>
            {activeRegions.length > 0 ? (
              activeRegions.map((r) => {
                const isSel = r.cod === selectedCod;
                return (
                  <Pressable
                    key={r.cod}
                    style={[
                      styles.legendItem,
                      isSel && {
                        backgroundColor: colors.secondary,
                        borderRadius: 8,
                      },
                    ]}
                    onPress={() =>
                      setSelectedCod((prev) => (prev === r.cod ? null : r.cod))
                    }
                  >
                    <View
                      style={[
                        styles.legendDot,
                        {
                          backgroundColor: isSel
                            ? colors.highlight
                            : colors.primary,
                        },
                      ]}
                    />
                    <Text
                      style={[styles.legendText, { color: colors.foreground }]}
                    >
                      {r.name}
                    </Text>
                  </Pressable>
                );
              })
            ) : (
              <Text
                style={[styles.legendEmpty, { color: colors.mutedForeground }]}
              >
                Sin datos de distribución regional para esta especie.
              </Text>
            )}

            <View
              style={[styles.legendKey, { borderTopColor: colors.border }]}
            >
              <View style={styles.legendKeyRow}>
                <View
                  style={[styles.legendDot, { backgroundColor: colors.primary }]}
                />
                <Text
                  style={[
                    styles.legendKeyText,
                    { color: colors.mutedForeground },
                  ]}
                >
                  Presente
                </Text>
              </View>
              <View style={styles.legendKeyRow}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: colors.secondary },
                  ]}
                />
                <Text
                  style={[
                    styles.legendKeyText,
                    { color: colors.mutedForeground },
                  ]}
                >
                  Sin registro
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  backButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  topBarCenter: {
    flex: 1,
    alignItems: "center",
  },
  topBarTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  topBarSubtitle: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    fontStyle: "italic",
  },
  scrollContent: {
    padding: 16,
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 16,
  },
  bannerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  bannerText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    flexShrink: 1,
  },
  mapRow: {
    flexDirection: "row",
    gap: 16,
  },
  mapColumn: {
    alignItems: "center",
  },
  legendColumn: {
    flex: 1,
    paddingTop: 4,
  },
  legendTitle: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    flexShrink: 1,
  },
  legendEmpty: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 19,
  },
  legendKey: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  legendKeyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendKeyText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
});
