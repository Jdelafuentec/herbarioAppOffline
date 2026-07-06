import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Linking,
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

  const photoCategories = species.photos ?? [];
  const principalPhotos = photoCategories.find((c) => c.key === "principal");
  const secondaryPhotos = photoCategories.filter((c) => c.key !== "principal");

  const openCarousel = (categoryKey: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(`/species/photos/${species.id}?category=${categoryKey}`);
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

          {principalPhotos && principalPhotos.images.length > 0 ? (
            <Pressable
              onPress={() => openCarousel("principal")}
              style={({ pressed }) => [
                styles.heroPhotoWrap,
                { borderColor: colors.border, opacity: pressed ? 0.92 : 1 },
              ]}
            >
              <Image
                source={{ uri: principalPhotos.images[0] }}
                style={styles.heroPhoto}
                resizeMode="cover"
              />
              {principalPhotos.images.length > 1 ? (
                <View style={[styles.photoCountBadge, { backgroundColor: colors.primary }]}>
                  <Ionicons name="images-outline" size={13} color={colors.primaryForeground} />
                  <Text style={[styles.photoCountText, { color: colors.primaryForeground }]}>
                    {principalPhotos.images.length}
                  </Text>
                </View>
              ) : null}
            </Pressable>
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
            <Pressable
              style={({ pressed }) => [
                styles.distributionWrap,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={() => {
                if (Platform.OS !== "web") {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                router.push(`/species/map/${species.id}`);
              }}
            >
              <View style={styles.distributionLabelRow}>
                <Text style={[styles.distributionLabel, { color: colors.mutedForeground }]}>
                  Distribución regional
                </Text>
                <View style={styles.distributionLink}>
                  <Ionicons name="map-outline" size={13} color={colors.primary} />
                  <Text style={[styles.distributionLinkText, { color: colors.primary }]}>
                    Ver mapa
                  </Text>
                </View>
              </View>
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
            </Pressable>
          )}

          {species.sourceUrl ? (
            <Pressable
              onPress={() => {
                if (Platform.OS !== "web") {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                Linking.openURL(species.sourceUrl!);
              }}
              style={({ pressed }) => [
                styles.fichaLink,
                {
                  backgroundColor: colors.secondary,
                  borderColor: colors.border,
                  borderRadius: 10,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Ionicons name="open-outline" size={16} color={colors.primary} />
              <Text style={[styles.fichaLinkText, { color: colors.primary }]}>
                Ver ficha en Herbario Digital
              </Text>
              <Ionicons name="chevron-forward" size={15} color={colors.mutedForeground} />
            </Pressable>
          ) : null}
        </View>

        <View style={styles.photosSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photosRow}
          >
            {secondaryPhotos.length > 0
              ? secondaryPhotos.map((cat) => (
                  <Pressable
                    key={cat.key}
                    onPress={() => openCarousel(cat.key)}
                    style={({ pressed }) => [
                      styles.photoCard,
                      {
                        borderColor: colors.border,
                        borderRadius: 12,
                        opacity: pressed ? 0.92 : 1,
                      },
                    ]}
                  >
                    <Image
                      source={{ uri: cat.images[0] }}
                      style={styles.photoCardImage}
                      resizeMode="cover"
                    />
                    <View style={styles.photoCardFooter}>
                      <Text style={[styles.photoCardLabel, { color: colors.foreground }]}>
                        {cat.label}
                      </Text>
                      {cat.images.length > 1 ? (
                        <View style={styles.photoCardCount}>
                          <Ionicons
                            name="images-outline"
                            size={12}
                            color={colors.mutedForeground}
                          />
                          <Text
                            style={[styles.photoCardCountText, { color: colors.mutedForeground }]}
                          >
                            {cat.images.length}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </Pressable>
                ))
              : species.photoLabels.map((label) => (
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
                <Pressable
                  style={({ pressed }) => [
                    styles.mapButton,
                    {
                      backgroundColor: colors.secondary,
                      borderColor: colors.border,
                      borderRadius: 12,
                      opacity: pressed ? 0.85 : 1,
                    },
                  ]}
                  onPress={() => {
                    if (Platform.OS !== "web") {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                    router.push(`/species/map/${species.id}`);
                  }}
                >
                  <View style={styles.mapButtonHeader}>
                    <View style={styles.mapButtonTitleRow}>
                      <Ionicons name="map-outline" size={18} color={colors.primary} />
                      <Text style={[styles.mapButtonTitle, { color: colors.primary }]}>
                        Ver mapa de distribución
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={colors.primary} />
                  </View>
                  <View style={styles.ecoChips}>
                    {species.distribution.map((r) => (
                      <View
                        key={r}
                        style={[
                          styles.ecoChip,
                          {
                            backgroundColor: colors.card,
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
                </Pressable>
              )}

              {species.references?.length ? (
                <View style={[styles.referencesBlock, { borderTopColor: colors.border }]}>
                  <Text style={[styles.referencesTitle, { color: colors.mutedForeground }]}>
                    Referencias
                  </Text>
                  {species.references.map((ref, idx) => (
                    <View key={idx} style={styles.referenceRow}>
                      <Text style={[styles.referenceBullet, { color: colors.mutedForeground }]}>
                        •
                      </Text>
                      <Text style={[styles.referenceText, { color: colors.mutedForeground }]}>
                        {ref}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : null}
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
  distributionLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  distributionLabel: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  distributionLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  distributionLinkText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
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
  heroPhotoWrap: {
    position: "relative",
    marginBottom: 14,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
  },
  heroPhoto: {
    width: "100%",
    aspectRatio: 4 / 3,
    backgroundColor: "#0000000d",
  },
  photoCountBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  photoCountText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  photoCard: {
    width: 170,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
  },
  photoCardImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#0000000d",
  },
  photoCardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  photoCardLabel: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  photoCardCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  photoCardCountText: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
  },
  tabBar: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 4,
    marginBottom: 14,
  },
  tabItem: {
    width: "50%",
    alignItems: "center",
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 13,
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
  mapButton: {
    marginTop: 6,
    padding: 14,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  mapButtonHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mapButtonTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mapButtonTitle: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
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
  referencesBlock: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  referencesTitle: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  referenceRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 8,
    alignItems: "flex-start",
  },
  referenceBullet: {
    fontSize: 12,
    lineHeight: 17,
  },
  referenceText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 17,
    flex: 1,
  },
  fichaLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
  },
  fichaLinkText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
});
