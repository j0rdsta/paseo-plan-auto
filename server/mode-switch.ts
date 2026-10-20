import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { PluginHandlerContext } from "@getpaseo/plugin/server";

type PaseoApi = PluginHandlerContext["paseo"];

const run = promisify(execFile);
const PASEO = process.env.PASEO_CLI || "paseo";

export async function setMode(agentId: string, mode: string) {
  await run(PASEO, ["agent", "mode", agentId, mode]);
}

// Claude Code keeps the post-ExitPlanMode mode for the rest of the turn, so restart it
export async function restartTurn(paseo: PaseoApi, agentId: string) {
  await paseo.agents.ref(agentId).send("Continue with the approved plan.");
}

export async function showSwitch(
  paseo: PaseoApi,
  agentId: string,
  requestId: string,
  status: "auto" | "reverted",
) {
  await paseo.agents.ref(agentId).timeline.append({
    type: "plugin",
    id: "plan-auto-" + requestId,
    kind: "mode-switch",
    version: 1,
    data: { requestId, status },
  });
}
