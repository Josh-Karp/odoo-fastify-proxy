import { LoadingButton } from '@mui/lab';
import { Button as MUIButton, css, styled } from '@mui/material';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { ReactComponent as PrimaryLoadingIcon } from '../../assets/svg/backd-loader-primary.svg';
import { ReactComponent as SecondaryLoadingIcon } from '../../assets/svg/backd-loader-secondary.svg';

function Button({
  loading,
  className,
  variant,
  label,
  size,
  color,
  width,
  height,
  autoWidth,
  fullWidth,
  active,
  ...props
}) {
  const getLoadingProps = () => {
    if (loading) {
      return {
        loading,
        loadingIndicator:
          variant === 'outlined' ? (
            <PrimaryLoadingIcon />
          ) : (
            <SecondaryLoadingIcon />
          ),
      };
    }
    return null;
  };

  const Component = loading ? Loading : Wrapper;

  return (
    <Component
      {...props}
      variant={variant}
      size={size}
      color={color}
      disabled={variant === 'disabled' || variant === 'muted'}
      fullWidth={fullWidth}
      autoWidth={autoWidth}
      className={clsx(className, { active })}
      height={height}
      width={width}
      {...getLoadingProps()}
    >
      {label}
    </Component>
  );
}

const Base = ({
  theme, autoWidth, width, height,
}) => `
  ${width ? `width: ${width}px;` : ''}
  ${height ? `height: ${height}px;` : ''}

  ${
  autoWidth
    ? ` 
    @media (max-width: ${theme.breakpoints.values.sm}px) {
        min-width: unset;
        width: 100%;
    }
  `
    : ''
}
`;

const Wrapper = styled(MUIButton, {
  shouldForwardProp: (prop) => prop !== 'autoWidth',
})(
  (props) => css`
    ${Base({ ...props })}
  `,
);

const Loading = styled(LoadingButton, {
  shouldForwardProp: (prop) => prop !== 'autoWidth',
})(
  (props) => css`
    ${Base({ ...props })}

    @keyframes loading {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .MuiLoadingButton-loadingIndicator {
      animation: loading 1.4s linear infinite;
    }

    .MuiLoadingButton-loadingIndicator {
      left: unset;
      svg {
        font-size: 1.5rem;
      }
    }
  `,
);

Button.propTypes = {
  loading: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'contained',
    'outlined',
    'text',
    'muted',
    'disabled',
    'selection',
  ]),
  size: PropTypes.oneOf(['small', 'meduim', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary']),
  autoWidth: PropTypes.bool,
  fullWidth: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  active: PropTypes.bool,
  label: PropTypes.string,
};

Button.defaultProps = {
  loading: false,
  className: '',
  size: 'large',
  variant: 'contained',
  color: 'primary',
  autoWidth: false,
  fullWidth: false,
  active: false,
  label: 'Button',
  width: null,
  height: null,
};

export default Button;
