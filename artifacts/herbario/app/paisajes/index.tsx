import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import {
  PAISAJES_LIST,
  PAISAJE_GLOBAL_IMAGES,
  type Paisaje,
} from "@/constants/paisajes";
import { SPECIES_LIST } from "@/constants/species";

function PaisajeCard({
  paisaje,
  onPress,
}: {
  paisaje: Paisaje;
  onPress: () => void;
}) {
  const colors = useColors();

  const speciesCount = SPECIES_LIST.filter((s) =>
    s.landscapes?.includes(paisaje.id),
  ).length;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: 14,
          opacity: pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
      ]}
      testID={`paisaje-card-${paisaje.id}`}
    >
      <Image
        source={{ uri: paisaje.images[0] }}
        style={[styles.cardImage, { backgroundColor: colors.muted }]}
        resizeMode="cover"
      />
      <View style={styles.cardBody}>
        <View
          style={[
            styles.cardIcon,
            { backgroundColor: paisaje.color + "1A", borderRadius: 12 },
          ]}
        >
          <MaterialCommunityIcons
            name={paisaje.icon}
            size={22}
            color={paisaje.color}
          />
        </View>
        <View style={styles.cardText}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>
            {paisaje.name}
          </Text>
          <Text
            style={[styles.cardTagline, { color: colors.mutedForeground }]}
            numberOfLines={2}
          >
            {paisaje.tagline}
          </Text>
          {speciesCount > 0 ? (
            <View style={styles.cardMetaRow}>
              <Ionicons name="leaf-outline" size={13} color={paisaje.color} />
              <Text style={[styles.cardMetaText, { color: colors.mutedForeground }]}>
                {speciesCount}{" "}
                {speciesCount === 1 ? "especie asociada" : "especies asociadas"}
              </Text>
            </View>
          ) : null}
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
      </View>
    </Pressable>
  );
}

export default function PaisajesListScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View
        style={[
          styles.header,
          {
            paddingTop: topPadding + 8,
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            {
              backgroundColor: colors.secondary,
              borderRadius: 20,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          testID="paisajes-back-button"
        >
          <Ionicons name="arrow-back" size={20} color={colors.primary} />
        </Pressable>
        <View style={styles.headerTitleWrap}>
          <Text style={[styles.title, { color: colors.primary }]}>Paisajes</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Humedales altoandinos
          </Text>
        </View>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.secondary, borderRadius: 12 },
          ]}
        >
          <Ionicons name="earth" size={20} color={colors.primary} />
        </View>
      </View>

      <FlatList
        data={PAISAJES_LIST}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PaisajeCard
            paisaje={item}
            onPress={() => router.push(`/paisajes/${item.id}`)}
          />
        )}
        ListHeaderComponent={
          <View style={styles.introWrap}>
            <Image
              source={{ uri: PAISAJE_GLOBAL_IMAGES[0] }}
              style={[styles.introImage, { backgroundColor: colors.muted }]}
              resizeMode="cover"
            />
            <Text style={[styles.introText, { color: colors.mutedForeground }]}>
              Los humedales altoandinos se ordenan a lo largo de un gradiente
              hídrico-salino. Explora los tres tipos de paisaje y las especies
              que los habitan.
            </Text>
          </View>
        }
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: bottomPadding + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleWrap: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginTop: 1,
  },
  iconContainer: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    gap: 12,
  },
  introWrap: {
    marginBottom: 4,
  },
  introImage: {
    width: "100%",
    height: 150,
    borderRadius: 14,
    marginBottom: 12,
  },
  introText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: "Inter_400Regular",
    marginBottom: 4,
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
  },
  cardIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
  },
  cardTagline: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
    lineHeight: 18,
  },
  cardMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
  },
  cardMetaText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
});
