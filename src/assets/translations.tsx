import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function TranslationIcon(props: any) {
  return (
    <Svg
      width={15}
      height={14}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5.5.75H2a1 1 0 00-1 1v3M1 8.75v3.5a1 1 0 001 1h3M9.5.75H13a1 1 0 011 1v3M14 8.75v3.5a1 1 0 01-1 1h-3"
        stroke="#8A8A8A"
      />
    </Svg>
  );
}

export default TranslationIcon;
