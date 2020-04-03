import * as React from 'react';
import { Dimensions, LayoutChangeEvent, View } from 'react-native';

export enum ResponsiveSize {
  ExtraSmall = 0,
  Small = 320,
  Medium = 640,
  Large = 960,
  ExtraLarge = 1280,
}

const getResponsiveSize = (value: number): ResponsiveSize => {
  if (value < ResponsiveSize.Small) {
    return ResponsiveSize.ExtraSmall;
  }
  if (value < ResponsiveSize.Medium) {
    return ResponsiveSize.Small;
  }
  if (value < ResponsiveSize.Large) {
    return ResponsiveSize.Medium;
  }
  if (value < ResponsiveSize.ExtraLarge) {
    return ResponsiveSize.Large;
  }

  return ResponsiveSize.ExtraLarge;
};

export interface ResponsiveWidthRenderProps {
  responsiveWidth?: ResponsiveSize;
}

export function withResponsiveWidth<T extends ResponsiveWidthRenderProps>(
  WrappedComponent: React.ComponentType<T>
) {
  return (props: T): React.ClassicElement<Omit<T, 'responsiveWidth'>> => {
    const [responsiveWidth, setResponsiveWidth] = React.useState<ResponsiveSize | undefined>(
      undefined
    );
    const [screenWidth, setScreenWidth] = React.useState<number | undefined>(undefined);

    const onLayout = (event: LayoutChangeEvent) => {
      const newScreenWidth = Dimensions.get('window').width;
      const newResponsiveWidth = getResponsiveSize(event.nativeEvent.layout.width);

      if (newScreenWidth !== screenWidth) {
        setScreenWidth(newScreenWidth);
      }

      if (newScreenWidth !== screenWidth && newResponsiveWidth !== responsiveWidth) {
        setResponsiveWidth(newResponsiveWidth);
      }
    };

    return (
      <View onLayout={onLayout} style={{ flex: 1 }}>
        <WrappedComponent {...(props as T)} responsiveWidth={responsiveWidth} />
      </View>
    );
  };
}
