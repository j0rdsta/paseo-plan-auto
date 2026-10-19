import type { PluginServerContext } from "@getpaseo/plugin/server";
import { restartTurn, setMode, showSwitch } from "./server/mode-switch";
import { undoRpc } from "./shared/mode-switch";

export default function contribute(server: PluginServerContext) {
  const plans = new Set<string>();

  server.on("agent.permission_requested", ({ agent, request }) => {
    if (agent.provider === "claude" && request.kind === "plan") {
      plans.add(request.id);
    }
  });

  server.on("agent.permission_resolved", async ({ agent, requestId, resolution }, { paseo }) => {
    if (!plans.delete(requestId)) return;
    if (resolution.behavior !== "allow" || resolution.selectedActionId === "implement_resume") return;
    await setMode(agent.id, "auto");
    await restartTurn(paseo, agent.id);
    console.log(`switched ${agent.id} to auto after plan approval`);
    await showSwitch(paseo, agent.id, requestId, "auto");
  });

  server.handle(undoRpc, async ({ agentId, requestId }, { paseo }) => {
    await setMode(agentId, "acceptEdits");
    await showSwitch(paseo, agentId, requestId, "reverted");
    return { ok: true };
  });

  return () => {};
}
