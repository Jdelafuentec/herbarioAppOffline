import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { getPaisaje } from "@/constants/paisajes";
import { SPECIES_LIST } from "@/constants/species";

export default function PaisajeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const paisaje = getPaisaje(id);

  if (!paisaje) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text
          style={{ color: colors.foreground, textAlign: "center", marginTop: 100 }}
        >
          Paisaje no encontrado
        </Text>
      </View>
    );
  }

  const associatedSpecies = SPECIES_LIST.filter((s) =>
    s.landscapes?.includes(paisaje.id),
  );

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const openSpecies = (speciesId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(`/species/${speciesId}`);
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
          testID="paisaje-back-button"
        >
          <Ionicons name="arrow-back" size={20} color={colors.primary} />
        </Pressable>
        <View style={styles.topBarCenter}>
          <Text
            style={[styles.topBarTitle, { color: colors.mutedForeground }]}
            numberOfLines={1}
          >
            {paisaje.shortName}
          </Text>
        </View>
        <View
          style={[
            styles.topBarIcon,
            { backgroundColor: paisaje.color + "1A", borderRadius: 20 },
          ]}
        >
          <MaterialCommunityIcons
            name={paisaje.icon}
            size={18}
            color={paisaje.color}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding + 24 }}
      >
        <Image
          source={paisaje.images[0]}
          style={[styles.hero, { backgroundColor: colors.muted }]}
          resizeMode="cover"
        />

        <View style={styles.body}>
          <View
            style={[
              styles.titleTag,
              { backgroundColor: paisaje.color + "1A", borderRadius: 999 },
            ]}
          >
            <MaterialCommunityIcons
              name={paisaje.icon}
              size={16}
              color={paisaje.color}
            />
            <Text style={[styles.titleTagText, { color: paisaje.color }]}>
              {paisaje.shortName}
            </Text>
          </View>

          <Text style={[styles.title, { color: colors.foreground }]}>
            {paisaje.name}
          </Text>
          <Text style={[styles.tagline, { color: colors.mutedForeground }]}>
            {paisaje.tagline}
          </Text>

          {paisaje.description.map((para, idx) => (
            <Text
              key={idx}
              style={[styles.paragraph, { color: colors.foreground }]}
            >
              {para}
            </Text>
          ))}

          {paisaje.subtypes?.length ? (
            <View style={styles.subtypesSection}>
              <Text style={[styles.sectionTitle, { color: paisaje.color }]}>
                Tipos de bofedal
              </Text>
              {paisaje.subtypes.map((sub, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.subtypeCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      borderRadius: 12,
                    },
                  ]}
                >
                  <Text style={[styles.subtypeName, { color: colors.foreground }]}>
                    {sub.name}
                  </Text>
                  <Text
                    style={[styles.subtypeText, { color: colors.mutedForeground }]}
                  >
                    {sub.description}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          {paisaje.images.length > 1 ? (
            <View style={styles.gallerySection}>
              <Text style={[styles.sectionTitle, { color: paisaje.color }]}>
                Galería
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.galleryRow}
              >
                {paisaje.images.map((img, idx) => (
                  <Image
                    key={idx}
                    source={img}
                    style={[
                      styles.galleryImage,
                      { backgroundColor: colors.muted, borderColor: colors.border },
                    ]}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            </View>
          ) : null}

          {associatedSpecies.length > 0 ? (
            <View style={styles.speciesSection}>
              <Text style={[styles.sectionTitle, { color: paisaje.color }]}>
                Especies asociadas
              </Text>
              {associatedSpecies.map((s) => {
                const image = s.photos?.find((c) => c.key === "principal")
                  ?.images[0];
                return (
                  <Pressable
                    key={s.id}
                    onPress={() => openSpecies(s.id)}
                    style={({ pressed }) => [
                      styles.speciesRow,
                      {
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                        borderRadius: 12,
                        opacity: pressed ? 0.85 : 1,
                      },
                    ]}
                    testID={`paisaje-species-${s.id}`}
                  >
                    {image ? (
                      <Image
                        source={{ uri: image }}
                        style={[
                          styles.speciesThumb,
                          { backgroundColor: colors.muted },
                        ]}
                        resizeMode="cover"
                      />
                    ) : (
                      <View
                        style={[
                          styles.speciesThumb,
                          {
                            backgroundColor: colors.muted,
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        ]}
                      >
                        <Ionicons
                          name="leaf-outline"
                          size={18}
                          color={colors.mutedForeground}
                        />
                      </View>
                    )}
                    <View style={styles.speciesInfo}>
                      <Text
                        style={[styles.speciesName, { color: colors.foreground }]}
                      >
                        {s.scientificName}
                      </Text>
                      {s.commonName ? (
                        <Text
                          style={[
                            styles.speciesCommon,
                            { color: colors.mutedForeground },
                          ]}
                        >
                          {s.commonName}
                        </Text>
                      ) : (
                        <Text
                          style={[
                            styles.speciesCommon,
                            { color: colors.mutedForeground },
                          ]}
                        >
                          {s.family}
                        </Text>
                      )}
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color={colors.mutedForeground}
                    />
                  </Pressable>
                );
              })}
            </View>
          ) : null}
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
  topBarTitle: {
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
  hero: {
    width: "100%",
    height: 220,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  titleTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 12,
  },
  titleTagText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 21,
    marginBottom: 18,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    fontFamily: "Inter_400Regular",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    marginBottom: 12,
    marginTop: 4,
  },
  subtypesSection: {
    marginTop: 8,
  },
  subtypeCard: {
    padding: 14,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
  subtypeName: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 6,
  },
  subtypeText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  gallerySection: {
    marginTop: 8,
    marginHorizontal: -20,
  },
  galleryRow: {
    paddingHorizontal: 20,
    gap: 12,
  },
  galleryImage: {
    width: 240,
    height: 170,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  speciesSection: {
    marginTop: 24,
  },
  speciesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
  speciesThumb: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  speciesInfo: {
    flex: 1,
  },
  speciesName: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    fontStyle: "italic",
  },
  speciesCommon: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginTop: 1,
  },
});
