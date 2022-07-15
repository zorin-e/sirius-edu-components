import { Slot } from "vue";

export function clamp(value: number, min: number, max: number): number;

export function dasherize(value: string): string;

export function getClipboardDataText(
  event: ClipboardEvent,
  format?: string
): string;

export function hasSlotContent(slot: Slot | undefined): boolean;

export function isMobile(): boolean;

export function getPhoneNumber(dirtyPhoneNumber: string): string;

export type MaskOptions = {
  mask: Array<any> | ((val: any) => any) | boolean | {};
  guide: boolean;
  pipe: (val: any) => any;
  showMask: boolean;
};

export type Stringify<T> = (item: T) => string;
