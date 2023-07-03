import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function TickDownIcon(props: any) {
  return (
    <Svg
      width={11}
      height={6}
      viewBox="0 0 11 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path d="M1 1l4.5 4L10 1" stroke="#2C2C2C" />
    </Svg>
  );
}

export default TickDownIcon;
