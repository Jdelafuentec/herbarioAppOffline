import React from "react";
import { Platform, View } from "react-native";
import Svg, { ClipPath, Defs, Path, Rect } from "react-native-svg";

import { CHILE_REGIONS, CHILE_VIEWBOX } from "@/constants/chileRegions";

/**
 * Opacity of the soft "present in region" fill used when the cordillera
 * strip is enabled. Exported so legends can render a matching swatch.
 */
export const ACTIVE_SOFT_OPACITY = 0.32;

/** Fraction of each region's width (eastern side) covered by the cordillera strip. */
const STRIP_FRACTION = 0.38;

interface BBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

const bboxCache = new Map<number, BBox>();

/** Bounding box of a region path (absolute M/L coordinate pairs). */
function regionBBox(cod: number, d: string): BBox {
  const cached = bboxCache.get(cod);
  if (cached) return cached;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const nums = d.match(/-?\d+(?:\.\d+)?/g) ?? [];
  for (let i = 0; i + 1 < nums.length; i += 2) {
    const x = Number(nums[i]);
    const y = Number(nums[i + 1]);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const box = { minX, minY, maxX, maxY };
  bboxCache.set(cod, box);
  return box;
}

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
  /**
   * When set, active regions get a soft tint and their eastern (Andean) band
   * is filled solid with this color as a referential "franja cordillerana".
   */
  cordilleraStripColor?: string;
}

/**
 * Stylized map of Chile's 16 regions rendered as SVG paths.
 * Regions in `activeCods` are filled with `activeColor`; the rest use
 * `inactiveColor`. An optional `selectedCod` is highlighted on top.
 * With `cordilleraStripColor`, active regions are softly tinted and a solid
 * strip along their eastern edge marks the cordillera in a referential way.
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
  cordilleraStripColor,
}: ChileMapProps) {
  const width = (CHILE_VIEWBOX.width / CHILE_VIEWBOX.height) * height;
  const stripRegions = cordilleraStripColor
    ? CHILE_REGIONS.filter((r) => activeCods.has(r.cod))
    : [];

  return (
    <View style={{ width, height }}>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${CHILE_VIEWBOX.width} ${CHILE_VIEWBOX.height}`}
      >
        {stripRegions.length > 0 ? (
          <Defs>
            {stripRegions.map((region) => {
              const b = regionBBox(region.cod, region.path);
              const stripWidth = (b.maxX - b.minX) * STRIP_FRACTION;
              return (
                <ClipPath key={region.cod} id={`strip-${region.cod}`}>
                  <Rect
                    x={b.maxX - stripWidth}
                    y={b.minY - 1}
                    width={stripWidth + 1}
                    height={b.maxY - b.minY + 2}
                  />
                </ClipPath>
              );
            })}
          </Defs>
        ) : null}

        {CHILE_REGIONS.map((region) => {
          const isActive = activeCods.has(region.cod);
          const isSelected = selectedCod === region.cod;
          const fill =
            isSelected && selectedColor
              ? selectedColor
              : isActive
                ? activeColor
                : inactiveColor;
          const softenFill =
            Boolean(cordilleraStripColor) && isActive && !isSelected;
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
              fillOpacity={softenFill ? ACTIVE_SOFT_OPACITY : 1}
              stroke={borderColor}
              strokeWidth={0.7}
              strokeLinejoin="round"
              {...pressProps}
            />
          );
        })}

        {stripRegions.map((region) => (
          <Path
            key={`strip-${region.cod}`}
            d={region.path}
            fill={cordilleraStripColor}
            clipPath={`url(#strip-${region.cod})`}
            style={{ pointerEvents: "none" }}
          />
        ))}
      </Svg>
    </View>
  );
}
