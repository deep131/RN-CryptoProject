import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const COLORS = {
  primary: '#1E1E1E',
  secondary: '#3B3B3B',
  white: '#fff',
  lightgreen: '#4BEE70',
  black: '#000000',
  transparentWhite: 'rgba(255,255,255,0.2)',
  transparentBlack: 'rgba(0,0,0,0.8)',
  transparentBlack1: 'rgba(0,0,0,0.4)',
  gray: '#212125',
  lightGray3:'#757575',
  red:'#880808'
};

export const SIZES = {
  //global size

  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  //font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  width,
  height,
};

const appTheme={COLORS,SIZES}
export default appTheme;
