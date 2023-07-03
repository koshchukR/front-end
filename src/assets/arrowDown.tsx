import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

function ArrowDownIcon(props: any) {
  return (
    <Svg
      width={16}
      height={19}
      viewBox="0 0 16 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M4.427 6.748A.5.5 0 014.862 6h6.276a.5.5 0 01.434.748L8.434 12.24a.5.5 0 01-.868 0L4.427 6.748z"
        fill="#BFBFBF"
      />
      <Rect x={0.5} y={0.5} width={15} height={18} rx={2.5} stroke="#BFBFBF" />
    </Svg>
  );
}

export default ArrowDownIcon;
