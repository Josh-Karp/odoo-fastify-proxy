import { Button as MuiTextField, styled } from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #dddddd",
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff",
    },
    "&$focused": {
      backgroundColor: "#fff",
      boxShadow: `0 2px 4px 0 rgba(176, 73, 149, 0.21)`,
      borderColor: "#b04995",
    },
    "&.Mui-error": {
      borderColor: "#b04995",
    },
  },
  focused: {},
}));

const useStylesTextField = makeStyles((theme) => ({
  root: {
    "& .MuiFormLabel-root": {
      color: "#8f8f8f",
      fontSize: 12,
      transform: "none",
      top: 17,
      left: 13,
    },
    "& .MuiFormLabel-root.Mui-error": {
      color: "#b04995",
    },
    "& input": {
      color: "black",
      fontSize: 14,
      fontWeight: 600,
      padding: "26px 12px 0",
      transition: "padding 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    },
    "& .MuiFormLabel-filled + .MuiInputBase-root input": {
      padding: "35px 12px 14px",
    },
    "& .Mui-focused input": {
      padding: "35px 12px 14px",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#b04995",
      fontFamily: "Muli",
      fontSize: 12,
    },
  },
}));

function TextField({
  label,
  variant,
  fullWidth,
  value,
  onChange,
  helperText,
  error,
  className,
  meta: { touched, invalid, error },
  ...props
}) {
  const classes = useStyles();
  const classesTextField = useStylesTextField();

  return (
    <Wrapper
      variant={variant}
      fullWidth={fullwidth}
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      InputProps={{ classes, disableUnderline: true }}
      className={className}
      classes={classesTextField}
      {...props}
    />
  );
}

const Wrapper = styled(MuiTextField)`
  .MuiInputBase-root {
    background-color: red;
  }
`;

TextField.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf(["filled"]),
  fullWidth: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  helperText: PropTypes.string,
  error: PropTypes.string,
};

TextField.defaultProps = {
  label: "Input Field",
  variant: "filled",
  fullWidth: false,
  value: "Value",
  onChange: () => {},
  helperText: "Helper Text",
  error: "Error Text",
};

export default TextField;
