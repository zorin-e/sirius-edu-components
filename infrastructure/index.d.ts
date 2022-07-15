/// <reference types="lodash" />
import { ValidationArgs } from "@vuelidate/core";
import { ComputedRef, Ref } from "vue";

export type ControlType<T> = {
  error: ComputedRef<string | Record<string, string> | null>;
  errors: ComputedRef<Record<string, string>>;
  value: T;
  setValue: (value: T extends Ref<infer U> ? U : never) => void;
  invalid: ComputedRef<boolean>;
  valid: ComputedRef<boolean>;
  reset: () => void;
  disable: () => void;
  enable: () => void;
  disabled: Ref<boolean>;
  markAsTouch: () => void;
  setErrors: (errors: Record<string, string>) => void;
  removeErrors: (errorsKeys: ReadonlyArray<string>) => void;
};
export function createForm<
  T extends {
    [K: string]: [any, ValidationArgs] | [any];
  }
>(
  form: T
): {
  invalid: ComputedRef<boolean>;
  valid: ComputedRef<boolean>;
  markAsTouch: () => void;
  errors: ComputedRef<{}>;
  validate: () => void;
  value: { [K in keyof T]: Ref<T[K][0]> };
  getCurrentValue: () => { [K_1 in keyof T]: T[K_1][0] };
} & { [K_2 in keyof T]: ControlType<Ref<T[K_2][0]>> };

export const required: import("@vuelidate/core").ValidationRuleWithParams<
  {},
  any
>;
export const requiredTrue: import("@vuelidate/core").ValidationRuleWithParams<
  {},
  any
>;
export const email: import("@vuelidate/core").ValidationRuleWithParams<{}, any>;
export const minValue: (
  value: number
) => import("@vuelidate/core").ValidationRuleWithParams<{}, any>;
export const maxValue: (
  value: number
) => import("@vuelidate/core").ValidationRuleWithParams<{}, any>;
export const minLength: (
  length: number
) => import("@vuelidate/core").ValidationRuleWithParams<{}, any>;
export const maxLength: (
  length: number
) => import("@vuelidate/core").ValidationRuleWithParams<{}, any>;
export const phone: import("@vuelidate/core").ValidationRuleWithParams<{}, any>;
export const not: <T>(
  obj: T
) => import("@vuelidate/core").ValidationRuleWithParams<{}, any>;
export const pattern: (
  reg: string | RegExp
) => import("@vuelidate/core").ValidationRuleWithParams<{}, any>;

export function throttle(
  func: (a: any) => void,
  waitms: number
): import("lodash").DebouncedFunc<(a: any) => void>;
