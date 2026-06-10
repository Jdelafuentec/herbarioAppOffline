import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { SPECIES_LIST } from "@/constants/species";

const TABS = ["Taxonomía", "Morfología", "Fenología", "Ecología"] as const;
type Tab = (typeof TABS)[number];

function PhotoPlaceholder({ label, colors }: { label: string; colors: ReturnType<typeof useColors> }) {
  return (
    <View
      style={[
        styles.photoPlaceholder,
        {
          backgroundColor: colors.secondary,
          borderColor: colors.border,
          borderRadius: 12,
        },
      ]}
    >
      <Ionicons name="image-outline" size={28} color={colors.mutedForeground} />
      <Text style={[styles.photoLabel, { color: colors.mutedForeground }]}>{label}</Text>
    </View>
  );
}

function TaxonomyRow({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: ReturnType<typeof useColors>;
}) {
  if (!value) return null;
  return (
    <View
      style={[styles.taxonomyRow, { borderBottomColor: colors.border }]}
    >
      <Text style={[styles.taxonomyLabel, { color: colors.mutedForeground }]}>
        {label}
      </Text>
      <Text style={[styles.taxonomyValue, { color: colors.foreground }]}>
        {value}
      </Text>
    </View>
  );
}

function BulletItem({ text, colors }: { text: string; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={styles.bulletRow}>
      <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
      <Text style={[styles.bulletText, { color: colors.foreground }]}>{text}</Text>
    </View>
  );
}

export default function SpeciesDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<Tab>("Taxonomía");

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const species = SPECIES_LIST.find((s) => s.id === id);

  if (!species) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.foreground, textAlign: "center", marginTop: 100 }}>
          Especie no encontrada
        </Text>
      </View>
    );
  }

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleTabPress = (tab: Tab) => {
    Haptics.selectionAsync();
    setActiveTab(tab);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.topBar,
          {
            paddingTop: topPadding + 8,
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [
            styles.backButton,
            {
              backgroundColor: colors.secondary,
              borderRadius: 20,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          testID="back-button"
        >
          <Ionicons name="arrow-back" size={20} color={colors.primary} />
        </Pressable>

        <View style={styles.topBarCenter}>
          <Text
            style={[styles.topBarGenus, { color: colors.mutedForeground }]}
            numberOfLines={1}
          >
            {species.taxonomy.familia || species.genus}
          </Text>
        </View>

        <View
          style={[
            styles.topBarIcon,
            { backgroundColor: colors.secondary, borderRadius: 20 },
          ]}
        >
          <Ionicons name="leaf" size={18} color={colors.primary} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding + 24 }}
      >
        <View
          style={[
            styles.heroSection,
            {
              backgroundColor: colors.card,
              borderBottomColor: colors.border,
            },
          ]}
        >
          {species.commonName ? (
            <View
              style={[
                styles.commonNameTag,
                { backgroundColor: colors.highlight, borderRadius: 6 },
              ]}
            >
              <Text style={[styles.commonNameTagText, { color: colors.highlightForeground }]}>
                {species.commonName}
              </Text>
            </View>
          ) : null}

          <Text style={[styles.heroName, { color: colors.foreground }]}>
            {species.scientificName}
          </Text>
          {species.authority ? (
            <Text style={[styles.heroAuthority, { color: colors.mutedForeground }]}>
              {species.authority}
            </Text>
          ) : null}

          <View style={styles.heroBadges}>
            {species.altitude ? (
              <View
                style={[
                  styles.heroBadge,
                  { backgroundColor: colors.secondary, borderRadius: 8 },
                ]}
              >
                <Ionicons name="trending-up-outline" size={14} color={colors.primary} />
                <Text style={[styles.heroBadgeText, { color: colors.foreground }]}>
                  {species.altitude}
                </Text>
              </View>
            ) : null}
          </View>

          {species.distribution.length > 0 && (
            <View style={styles.distributionWrap}>
              <Text style={[styles.distributionLabel, { color: colors.mutedForeground }]}>
                Distribución regional
              </Text>
              <View style={styles.distributionChips}>
                {species.distribution.map((r) => (
                  <View
                    key={r}
                    style={[
                      styles.regionChip,
                      {
                        backgroundColor: colors.muted,
                        borderRadius: 6,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Text style={[styles.regionChipText, { color: colors.foreground }]}>
                      {r}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={styles.photosSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photosRow}
          >
            {species.photoLabels.map((label) => (
              <PhotoPlaceholder key={label} label={label} colors={colors} />
            ))}
          </ScrollView>
        </View>

        <View
          style={[
            styles.tabBar,
            {
              backgroundColor: colors.muted,
              borderRadius: 12,
              marginHorizontal: 16,
            },
          ]}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <Pressable
                key={tab}
                onPress={() => handleTabPress(tab)}
                style={[
                  styles.tabItem,
                  {
                    backgroundColor: isActive ? colors.card : "transparent",
                    borderRadius: 10,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: isActive ? colors.primary : colors.mutedForeground,
                      fontFamily: isActive ? "Inter_600SemiBold" : "Inter_400Regular",
                    },
                  ]}
                >
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.tabContent}>
          {activeTab === "Taxonomía" && (
            <View
              style={[
                styles.sectionCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderRadius: 14,
                },
              ]}
            >
              <TaxonomyRow label="División" value={species.taxonomy.division} colors={colors} />
              <TaxonomyRow label="Clase" value={species.taxonomy.clase} colors={colors} />
              <TaxonomyRow label="Orden" value={species.taxonomy.orden} colors={colors} />
              <TaxonomyRow label="Familia" value={species.taxonomy.familia} colors={colors} />
              <TaxonomyRow label="Género" value={species.taxonomy.genero} colors={colors} />
              {species.commonName ? (
                <TaxonomyRow label="Nombre común" value={species.commonName} colors={colors} />
              ) : null}
            </View>
          )}

          {activeTab === "Morfología" && (
            <View
              style={[
                styles.sectionCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderRadius: 14,
                },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: colors.primary }]}>
                Descripción morfológica
              </Text>
              {species.morphology.map((item, idx) => (
                <BulletItem key={idx} text={item} colors={colors} />
              ))}
            </View>
          )}

          {activeTab === "Fenología" && (
            <View
              style={[
                styles.sectionCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderRadius: 14,
                },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: colors.primary }]}>
                Descripción fenomenológica / forma de vida
              </Text>
              {species.phenomenology.map((item, idx) => (
                <BulletItem key={idx} text={item} colors={colors} />
              ))}
            </View>
          )}

          {activeTab === "Ecología" && (
            <View
              style={[
                styles.sectionCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderRadius: 14,
                },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: colors.primary }]}>
                Descripción ecológica / distribución
              </Text>
              <Text style={[styles.ecologyText, { color: colors.foreground }]}>
                {species.ecology}
              </Text>
              {species.distribution.length > 0 && (
                <View style={styles.ecoDistribution}>
                  <Text style={[styles.ecoDistLabel, { color: colors.mutedForeground }]}>
                    Regiones
                  </Text>
                  <View style={styles.ecoChips}>
                    {species.distribution.map((r) => (
                      <View
                        key={r}
                        style={[
                          styles.ecoChip,
                          {
                            backgroundColor: colors.secondary,
                            borderRadius: 6,
                          },
                        ]}
                      >
                        <Text style={[styles.ecoChipText, { color: colors.primary }]}>
                          {r}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
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
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  backButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  topBarCenter: {
    flex: 1,
  },
  topBarGenus: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  topBarIcon: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  commonNameTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  commonNameTagText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.3,
  },
  heroName: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    fontStyle: "italic",
    lineHeight: 32,
    marginBottom: 4,
  },
  heroAuthority: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginBottom: 14,
  },
  heroBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  heroBadgeText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  distributionWrap: {
    gap: 6,
  },
  distributionLabel: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  distributionChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  regionChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: StyleSheet.hairlineWidth,
  },
  regionChipText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  photosSection: {
    marginVertical: 16,
  },
  photosRow: {
    paddingHorizontal: 16,
    gap: 12,
  },
  photoPlaceholder: {
    width: 140,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  photoLabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  tabBar: {
    flexDirection: "row",
    padding: 4,
    marginBottom: 14,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 12,
  },
  tabContent: {
    paddingHorizontal: 16,
  },
  sectionCard: {
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    marginBottom: 12,
  },
  taxonomyRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  taxonomyLabel: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    width: 110,
  },
  taxonomyValue: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    flex: 1,
    fontStyle: "italic",
  },
  bulletRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
    alignItems: "flex-start",
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    flexShrink: 0,
  },
  bulletText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
    flex: 1,
  },
  ecologyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
    marginBottom: 16,
  },
  ecoDistribution: {
    gap: 8,
    marginTop: 4,
  },
  ecoDistLabel: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  ecoChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  ecoChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  ecoChipText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
});
