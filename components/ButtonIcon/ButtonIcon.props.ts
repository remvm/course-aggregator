import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import up from './up.svg';
import close from './close.svg';
import menu from './menu.svg';

export const icons = {
    up,
    menu,
    close
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon: IconName,
    appearance: 'primary' | 'white'
}