import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { PaseoApi } from "@getpaseo/client";

const run = promisify(execFile);
const PASEO = "/Applications/Paseo.app/Contents/Resources/bin/paseo";

export async function setMode(agentId: string, mode: string) {
  await run(PASEO, ["agent", "mode", agentId, mode]);
}

// Claude Code keeps the post-ExitPlanMode mode for the rest of the turn, so restart it
export async function restartTurn(paseo: PaseoApi, agentId: string) {
  await run(PASEO, ["agent", "stop", agentId]);
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
