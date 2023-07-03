import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ArrowRight(props: any) {
  return (
    <Svg
      width={8}
      height={13}
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M.25 1.727v9.546c0 .863 1.02 1.32 1.664.748l5.37-4.774a1 1 0 000-1.494L1.914.979C1.27.406.25.864.25 1.727z"
        fill="#A6A6A6"
      />
    </Svg>
  );
}

export default ArrowRight;
