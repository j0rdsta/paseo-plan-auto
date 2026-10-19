import { defineRpc } from "@getpaseo/plugin";
import { z } from "zod";

export const modeSwitchSchema = z.object({
  requestId: z.string(),
  status: z.enum(["auto", "reverted"]),
});

export const undoRpc = defineRpc({
  name: "mode-switch.undo",
  input: z.object({ agentId: z.string(), requestId: z.string() }),
  output: z.object({ ok: z.boolean() }),
});
