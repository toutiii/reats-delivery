import React, { ReactNode } from "react";
import Svg, { Defs, Ellipse, LinearGradient, Stop } from "react-native-svg";

interface CustomBackgroundProps {
  children?: ReactNode;
}

const CustomBackground: React.FC<CustomBackgroundProps> = ({ children }) => {
  return (
    <Svg
      width={"100%"}
      height={600}
      fill="none"
      viewBox="0 0 390 605"
      className="flex-1"
    >
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1={317.078}
          y1={-153.097}
          x2={59.926}
          y2={595.992}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.438" stopColor="tomato" />
          <Stop offset="0.753" stopColor="#FC848B" stopOpacity={0.58} />
          <Stop offset="1" stopColor="#FFE8D6" />
        </LinearGradient>
      </Defs>
      <Ellipse
        cx={59.926}
        cy={178.982}
        rx={508.258}
        ry={417.01}
        transform="rotate(16.313 59.926 178.982)"
        fill="url(#paint0_linear)"
        fillOpacity={0.66}
      />
      {children}
    </Svg>
  );
};

export default CustomBackground;
