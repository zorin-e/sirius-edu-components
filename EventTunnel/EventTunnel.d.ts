import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface EventTunnelProps {}

export interface EventTunnelSlots {}

export type EventTunnelEmits = {};

declare class EventTunnel extends ClassComponent<
  EventTunnelProps,
  EventTunnelSlots,
  EventTunnelEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    EventTunnel: GlobalComponentConstructor<EventTunnel>;
  }
}

export default EventTunnel;
