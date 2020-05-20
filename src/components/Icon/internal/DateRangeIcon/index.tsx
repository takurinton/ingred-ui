import * as React from "react";
import { IconProps } from "../../Icon";

const DateRangeIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <path d="M0 0h18v18H0z" fill="none" />
      <path
        fill={fill}
        d="M13.25,2.5h3a.75.75,0,0,1,.75.75v12a.75.75,0,0,1-.75.75H2.75A.75.75,0,0,1,2,15.25v-12a.75.75,0,0,1,.75-.75h3V1h1.5V2.5h4.5V1h1.5Zm2.25,6H3.5v6h12ZM11.75,4H7.25V5.5H5.75V4H3.5V7h12V4H13.25V5.5h-1.5ZM5,10H6.5v1.5H5Zm3.75,0h1.5v1.5H8.75Zm3.75,0H14v1.5H12.5Z"
        transform="translate(-0.5 -0.25)"
      />
    </svg>
  );
};

export { DateRangeIcon };
