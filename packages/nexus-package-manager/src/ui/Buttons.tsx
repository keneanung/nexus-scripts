import React from 'react';

type ButtonProps = {
  onClick: () => void;
  text: string;
};
/**
 * Small Nexus button component that can have a custom click handler and a text.
 *
 * @param {ButtonProps} root0 Props of the component.
 * @param {() => void} root0.onClick The event handler for the click event.
 * @param {string} root0.text The text the button should display.
 * @returns {JSX.Element} The button component.
 */
export function SmallButton({ onClick, text }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSizeSmall MuiButton-sizeSmall"
    >
      <span className="MuiButton-label">{text}</span>
      <span className="MuiTouchRipple-root" />
    </button>
  );
}
/**
 * Large Nexus button component that can have a custom click handler and a text.
 *
 * @param {ButtonProps} root0 Props of the component.
 * @param {() => void} root0.onClick The event handler for the click event.
 * @param {string} root0.text The text the button should display.
 * @returns {JSX.Element} The button component.
 */
export function LargeButton({ onClick, text }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSizeLarge MuiButton-sizeLarge"
    >
      <span className="MuiButton-label">{text}</span>
      <span className="MuiTouchRipple-root" />
    </button>
  );
}
