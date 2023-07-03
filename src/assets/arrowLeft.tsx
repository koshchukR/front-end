import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ArrowLeft(props: any) {
  return (
    <Svg
      width={9}
      height={13}
      viewBox="0 0 9 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M8.25 11.273V1.727c0-.863-1.02-1.32-1.664-.748l-5.37 4.774a1 1 0 000 1.494l5.37 4.774c.645.573 1.664.115 1.664-.748z"
        fill="#A6A6A6"
      />
    </Svg>
  );
}

export default ArrowLeft;
