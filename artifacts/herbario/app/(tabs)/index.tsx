import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { SPECIES_LIST, type Species } from "@/constants/species";

function SpeciesCard({ species, onPress }: { species: Species; onPress: () => void }) {
  const colors = useColors();

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
      testID={`species-card-${species.id}`}
    >
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.familyBadge,
            { backgroundColor: colors.secondary, borderRadius: 6 },
          ]}
        >
          <Text
            style={[styles.familyBadgeText, { color: colors.primary }]}
            numberOfLines={1}
          >
            {species.taxonomy.familia || "Sin clasificar"}
          </Text>
        </View>
        {species.commonName ? (
          <View
            style={[
              styles.commonNameBadge,
              { backgroundColor: colors.highlight, borderRadius: 6 },
            ]}
          >
            <Text style={[styles.commonNameText, { color: colors.highlightForeground }]}>
              {species.commonName}
            </Text>
          </View>
        ) : null}
      </View>

      <Text style={[styles.scientificName, { color: colors.foreground }]}>
        {species.scientificName}
      </Text>
      {species.authority ? (
        <Text style={[styles.authority, { color: colors.mutedForeground }]}>
          {species.authority}
        </Text>
      ) : null}

      <View style={styles.cardFooter}>
        {species.altitude ? (
          <View style={styles.infoRow}>
            <Ionicons name="trending-up-outline" size={13} color={colors.mutedForeground} />
            <Text style={[styles.infoText, { color: colors.mutedForeground }]}>
              {species.altitude}
            </Text>
          </View>
        ) : null}
        {species.distribution.length > 0 ? (
          <View style={styles.distributionRow}>
            {species.distribution.slice(0, 5).map((region) => (
              <View
                key={region}
                style={[
                  styles.regionChip,
                  { backgroundColor: colors.muted, borderRadius: 4 },
                ]}
              >
                <Text style={[styles.regionText, { color: colors.mutedForeground }]}>
                  {region}
                </Text>
              </View>
            ))}
            {species.distribution.length > 5 && (
              <Text style={[styles.moreText, { color: colors.mutedForeground }]}>
                +{species.distribution.length - 5}
              </Text>
            )}
          </View>
        ) : null}
      </View>

      <View
        style={[
          styles.chevronContainer,
          { backgroundColor: colors.secondary, borderRadius: 20 },
        ]}
      >
        <Ionicons name="chevron-forward" size={16} color={colors.primary} />
      </View>
    </Pressable>
  );
}

export default function CatalogScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const filtered = SPECIES_LIST.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.scientificName.toLowerCase().includes(q) ||
      s.commonName.toLowerCase().includes(q) ||
      s.family.toLowerCase().includes(q) ||
      s.genus.toLowerCase().includes(q)
    );
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View
        style={[
          styles.header,
          {
            paddingTop: topPadding + 12,
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View style={styles.headerTitle}>
          <Text style={[styles.title, { color: colors.primary }]}>Herbario</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Bofedales Altoandinos • {SPECIES_LIST.length} especies
          </Text>
        </View>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.secondary, borderRadius: 12 },
          ]}
        >
          <Ionicons name="leaf" size={22} color={colors.primary} />
        </View>
      </View>

      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: colors.muted,
              borderRadius: 12,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons name="search-outline" size={18} color={colors.mutedForeground} />
          <TextInput
            style={[styles.searchInput, { color: colors.foreground }]}
            placeholder="Buscar especie..."
            placeholderTextColor={colors.mutedForeground}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            testID="search-input"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={18} color={colors.mutedForeground} />
            </Pressable>
          )}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SpeciesCard
            species={item}
            onPress={() => router.push(`/species/${item.id}`)}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: bottomPadding + 20 },
        ]}
        scrollEnabled={!!filtered.length}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="leaf-outline" size={48} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              Sin resultados
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.mutedForeground }]}>
              Intenta con otro nombre o familia
            </Text>
          </View>
        }
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
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  headerTitle: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    padding: 0,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
  },
  card: {
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    position: "relative",
  },
  cardHeader: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  familyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    maxWidth: 200,
  },
  familyBadgeText: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.3,
  },
  commonNameBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  commonNameText: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
  },
  scientificName: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    fontStyle: "italic",
    marginBottom: 2,
    paddingRight: 32,
  },
  authority: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginBottom: 10,
  },
  cardFooter: {
    gap: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  distributionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    alignItems: "center",
  },
  regionChip: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  regionText: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
  },
  moreText: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
  chevronContainer: {
    position: "absolute",
    right: 14,
    top: "50%",
    marginTop: -14,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
});
