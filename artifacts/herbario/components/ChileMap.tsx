import React from "react";
import { Platform, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { CHILE_REGIONS, CHILE_VIEWBOX } from "@/constants/chileRegions";

interface ChileMapProps {
  /** Region numbers (codregion) that should be painted as part of the distribution. */
  activeCods: Set<number>;
  /** Rendered height in px. Width is derived from the map's aspect ratio. */
  height?: number;
  activeColor: string;
  inactiveColor: string;
  borderColor: string;
  /** Optional currently-selected region, drawn with `selectedColor`. */
  selectedCod?: number | null;
  selectedColor?: string;
  onPressRegion?: (cod: number) => void;
}

/**
 * Stylized map of Chile's 16 regions rendered as SVG paths.
 * Regions in `activeCods` are filled with `activeColor`; the rest use
 * `inactiveColor`. An optional `selectedCod` is highlighted on top.
 */
export function ChileMap({
  activeCods,
  height = 600,
  activeColor,
  inactiveColor,
  borderColor,
  selectedCod,
  selectedColor,
  onPressRegion,
}: ChileMapProps) {
  const width = (CHILE_VIEWBOX.width / CHILE_VIEWBOX.height) * height;

  return (
    <View style={{ width, height }}>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${CHILE_VIEWBOX.width} ${CHILE_VIEWBOX.height}`}
      >
        {CHILE_REGIONS.map((region) => {
          const isActive = activeCods.has(region.cod);
          const isSelected = selectedCod === region.cod;
          const fill =
            isSelected && selectedColor
              ? selectedColor
              : isActive
                ? activeColor
                : inactiveColor;
          // On web, attaching onPress to an SVG Path makes react-native-web
          // emit console.error spam for the touch-responder props (which it
          // can't map to DOM). Native handles it fine; on web the legend
          // provides tap-to-select instead.
          const pressProps =
            Platform.OS !== "web" && onPressRegion
              ? { onPress: () => onPressRegion(region.cod) }
              : {};
          return (
            <Path
              key={region.cod}
              d={region.path}
              fill={fill}
              stroke={borderColor}
              strokeWidth={0.7}
              strokeLinejoin="round"
              {...pressProps}
            />
          );
        })}
      </Svg>
    </View>
  );
}
