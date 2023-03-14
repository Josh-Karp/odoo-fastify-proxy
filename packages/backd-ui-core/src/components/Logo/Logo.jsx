import { IconButton as MuiIconButton, styled } from "@mui/material";
import * as React from "react";

const IconButton = styled(MuiIconButton, {
  shouldForwardProp: (prop) => prop !== "fill",
})(() => ({
  fill: "none",
  stroke: "currentColor",
}));

const Logo = ({ color, label, id, onClick, ...props }) => {
  return (
    <IconButton
      color={color}
      id={id}
      onClick={onClick}
      aria-label={clsx(label, "-logo")}
      size={size}
      {...props}
    >
      <LogoIcon fontSize={size} />
    </IconButton>
  );
};

Logo.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.oneOf(["small", "large"]),
  id: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
};

Logo.defaultProps = {
  color: "primary",
  size: "small",
  id: null,
  onClick: () => {},
  label: "Backd",
};

export default Logo;
