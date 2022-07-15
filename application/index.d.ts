export function useInteractive(): {
  native: import("vue").Ref<
    | HTMLElement
    | {
        $refs: {
          native: HTMLElement;
        };
      }
  >;
  focused: import("vue").Ref<boolean>;
  id: string;
  focus: () => void;
  blur: () => void;
};

export function useModelModifiers(activeModifiers: Record<string, boolean>): {
  modify: (value: any) => any;
};
