import React from 'react';
import { css } from '@emotion/react';
import { NexusIcon } from './Icons';

const buttonCss = css`
  &:hover {
    color: black;
    fill: black;
  }

  & {
    fill: white;
  }
`;

type ButtonProps = {
  onClick: () => void;
  text?: string;
  icon?: string;
  testId?: string;
};
/**
 * Small Nexus button component that can have a custom click handler and a text.
 * @param {ButtonProps} root0 Props of the component.
 * @param {() => void} root0.onClick The event handler for the click event.
 * @param {string} root0.text The text the button should display.
 * @returns {JSX.Element} The button component.
 */
export function SmallButton({ onClick, text, testId, icon }: ButtonProps) {
  return (
    <button
      css={buttonCss}
      onClick={onClick}
      className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSizeSmall MuiButton-sizeSmall"
      data-testid={testId}
    >
      <span className="MuiButton-label">{icon === undefined ? text : <NexusIcon icon={icon} />}</span>
      <span className="MuiTouchRipple-root" />
    </button>
  );
}
/**
 * Large Nexus button component that can have a custom click handler and a text.
 * @param {ButtonProps} root0 Props of the component.
 * @param {() => void} root0.onClick The event handler for the click event.
 * @param {string} root0.text The text the button should display.
 * @returns {JSX.Element} The button component.
 */
export function LargeButton({ onClick, text }: ButtonProps) {
  return (
    <button
      css={buttonCss}
      onClick={onClick}
      className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSizeLarge MuiButton-sizeLarge"
    >
      <span className="MuiButton-label">{text}</span>
      <span className="MuiTouchRipple-root" />
    </button>
  );
}
