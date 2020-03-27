import React from 'react';
import Svg, { Circle, Path, Rect, G } from 'react-native-svg';

export const Website = props => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#555" {...props}>
    <Circle cx={12} cy={12} r={10} />
    <Path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </Svg>
);

export const Download = props => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#555" {...props}>
    <Path d="M8 17l4 4 4-4M12 12v9" />
    <Path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
  </Svg>
);

export const File = props => (
  <Svg width={16} height={16} viewBox="0 0 24 24" {...props}>
    <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" fill="none" stroke="#555" />
    <Path fill="none" stroke="#555" d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </Svg>
);

export const Star = props => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#555" {...props}>
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </Svg>
);

export const Calendar = props => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#555" {...props}>
    <Rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
    <Path d="M16 2v4M8 2v4M3 10h18" />
  </Svg>
);

export const Award = props => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#555" {...props}>
    <Circle cx={12} cy={8} r={7} />
    <Path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
  </Svg>
);

export const GoogleLogo = props => (
  <Svg width={18} height={18} viewBox="0 0 533.5 544.3" fill="none" stroke="555" {...props}>
    <G>
      <Path
        fill="#4285F4"
        d="M533.5,278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1,33.8-25.7,63.7-54.4,82.7v68h87.7
		C503.9,431.2,533.5,361.2,533.5,278.4z"
      />
      <Path
        fill="#34A853"
        d="M272.1,544.3c73.4,0,135.3-24.1,180.4-65.7l-87.7-68c-24.4,16.6-55.9,26-92.6,26c-71,0-131.2-47.9-152.8-112.3
		H28.9v70.1C75.1,486.3,169.2,544.3,272.1,544.3z"
      />
      <Path
        fill="#FBBC04"
        d="M119.3,324.3c-11.4-33.8-11.4-70.4,0-104.2V150H28.9c-38.6,76.9-38.6,167.5,0,244.4L119.3,324.3z"
      />
      <Path
        fill="#EA4335"
        d="M272.1,107.7c38.8-0.6,76.3,14,104.4,40.8l0,0l77.7-77.7C405,24.6,339.7-0.8,272.1,0C169.2,0,75.1,58,28.9,150
		l90.4,70.1C140.8,155.6,201.1,107.7,272.1,107.7z"
      />
    </G>
  </Svg>
);
