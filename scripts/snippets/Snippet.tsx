import React from "react";

type Props = {};

export const COMPONENT_NAME: React.FC<Props> = ({ ...props }) => {
  return (
    <div {...props} data-testid="component_name">
      COMPONENT_NAME
    </div>
  );
};
