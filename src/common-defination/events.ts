import React from 'react';

export type TInputOnChange = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;
export type TInputOnBlur = React.FocusEvent<HTMLInputElement>;

export type TOnClick = React.MouseEvent<HTMLElement, MouseEvent>;

export type TSelectOnBlur = React.FocusEvent<HTMLInputElement>;
