import { colors } from './colors';
import { typography, fonts } from './typography';
import { spacing, radii, shadows } from './spacing';

export const getTheme = (mode = 'light') => {
  const currentColors = colors[mode] || colors.light;

  return {
    mode,
    colors: currentColors,
    typography,
    fonts,
    spacing,
    radii,
    shadows,
  };
};

export { colors, typography, fonts, spacing, radii, shadows };
