---
name: react-native-svg Path onPress triggers false crash reports on web
description: Why "crashed with a runtime error" reports recur for Expo web artifacts using SVG Path onPress, and how to fix.
---

# SVG Path onPress → console.error spam → false crash detection (Expo web)

Passing `onPress` to a `react-native-svg` `<Path>` (or other SVG primitives) makes
**react-native-web** emit `console.error` on every render for touch-responder props
it cannot map to the DOM: `onStartShouldSetResponder`, `onResponderGrant`,
`onResponderMove`, `onResponderRelease`, `onResponderTerminate`,
`onResponderTerminationRequest`.

**Why it matters:** Replit's artifact crash detector treats browser `console.error`
output as a runtime crash. So a perfectly working screen produced repeated
"The Herbario Digital artifact crashed with a runtime error" reports even though
typecheck passed, the bundle was clean, and the UI rendered fine. The taps still
"worked" enough on web, so the symptom was *only* the console.error noise.

**How to apply:** Gate SVG touch handlers behind `Platform.OS !== "web"` — build a
`pressProps` object that is `{ onPress: ... }` on native and `{}` on web, then
spread it onto the Path. Provide an alternative web affordance (e.g. a tappable
legend list) so web users can still select. The real target here is native mobile,
so dropping Path onPress on web costs nothing.

**General rule:** For Expo artifacts previewed on web, any recurring "crashed with a
runtime error" with a clean workflow bundle + passing typecheck is almost always
`console.error` noise, not a real crash. Check the browser console logs first; find
what emits `console.error` and silence it (often web-incompatible RN props).
