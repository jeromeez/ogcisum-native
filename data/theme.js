// Colors

export const colors = {
  purpleColorLighter: '#A42DE8',
  blueColorLighter: '#318AFF',
  blueColorDarker: '#2D3DE8',
  blackColorTranslucentLess: 'rgba(0,0,0,0.35)',
  blackColorTranslucentMore: 'rgba(0,0,0,0.7)',
  light: {
    bgColor: '#ffffff',
    fgColor: '#800080',
    fgColorLighter: 'rgba(128,0,128,0.5)',
    headerTextColor: '#ffffff',
  },
  dark: {
    bgColor: '#422142',
    fgColor: '#f0c4f0',
    fgColorLighter: 'rgba(210,169,210,0.5)',
    headerTextColor: '#f0c4f0',
  },
};

// Sizes

export const sizes = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  headerHeight: 300,

  // Font sizes
  heading: 30,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
};

// Fonts
export const fonts = {
  heading: {
    paddingBottom: sizes.padding / 5,
    color: colors.purpleColorLighter,
    fontFamily: 'System',
    fontSize: sizes.heading,
    lineHeight: 36,
    fontWeight: 'bold',
  },
  body1: {
    color: colors.black,
    fontFamily: 'System',
    fontSize: sizes.body1,
    lineHeight: 36,
    paddingBottom: sizes.padding / 2,
  },
  body2: {
    color: colors.black,
    fontFamily: 'System',
    fontSize: sizes.body2,
    lineHeight: 24,
    paddingBottom: sizes.padding / 10,
    fontWeight: 'bold',
  },
  body3: {
    color: colors.black,
    fontFamily: 'System',
    fontSize: sizes.body3,
    lineHeight: 30,
    paddingBottom: sizes.padding,
  },
  body4: {
    color: colors.black,
    fontFamily: 'System',
    fontSize: sizes.body4,
    lineHeight: 22,
  },
  body5: {
    color: colors.black,
    fontFamily: 'System',
    fontSize: sizes.body5,
    lineHeight: 22,
  },
};

const appTheme = {colors, sizes, fonts};
export default appTheme;
