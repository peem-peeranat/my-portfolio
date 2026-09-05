import nextVitals from "eslint-config-next/core-web-vitals";

// Next 16 exposes its flat config directly. Keeping it as a flat config avoids
// the legacy FlatCompat bridge (and its incompatibility with ESLint 10).
const eslintConfig = [
  { ignores: [".next/**"] },
  ...nextVitals,
  {
    // These effects hydrate persisted client preferences and reset transient
    // modal state when it opens; both are intentional synchronization points.
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
