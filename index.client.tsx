import type { PluginClientContext } from "@getpaseo/plugin/client";
import { ModeSwitchRow } from "./client/mode-switch";
import { modeSwitchSchema } from "./shared/mode-switch";

export default function contribute(client: PluginClientContext) {
  client.addTimelineRenderer({
    kind: "mode-switch",
    version: 1,
    schema: modeSwitchSchema,
    Component: ModeSwitchRow,
  });
  return () => {};
}
