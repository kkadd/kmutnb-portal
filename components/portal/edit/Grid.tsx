import React, { FC } from "react";

type GridProps = {
  columns: number;
  children?: React.ReactNode;
};

const Grid: FC<GridProps> = ({ children, columns }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: 16,
        justifyItems: "center",
        alignItems: "center",
        margin: "100px auto",
      }}
      className="w-fit"
    >
      {children}
    </div>
  );
};

export default Grid;
