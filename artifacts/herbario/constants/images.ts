import { ImageSourcePropType } from "react-native";

/**
 * Resolves the source for an Image component.
 * If the source is a string (remote URL), it wraps it in an object: { uri: source }.
 * If it is a required local asset (number/object), it returns it as is.
 */
export function resolveImageSource(source: any): ImageSourcePropType | undefined {
  if (!source) return undefined;
  if (typeof source === "string") {
    return { uri: source };
  }
  return source;
}
