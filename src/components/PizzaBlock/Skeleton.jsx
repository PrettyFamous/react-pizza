import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="139" cy="136" r="125" />
    <rect x="0" y="274" rx="10" ry="10" width="280" height="30" />
    <rect x="-1" y="320" rx="15" ry="15" width="280" height="88" />
    <rect x="130" y="420" rx="20" ry="20" width="152" height="40" />
    <rect x="0" y="420" rx="20" ry="20" width="109" height="40" />
  </ContentLoader>
);

export default Skeleton;
