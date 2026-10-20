Switches Claude agents to Auto mode when you approve their plan. Paseo normally puts the agent in Accept File Edits after approval. Plans approved with "Implement with Bypass" and rejected plans are left alone.

## How it works

When a Claude plan approval resolves, the plugin sets the agent's mode to Auto by running the `paseo` CLI. The plugin API has no call for changing an agent's mode, so it uses the CLI from the `PASEO_CLI` variable the desktop app passes to its daemon, or `paseo` from the daemon's `PATH`.

Claude Code keeps the approval-time mode until the current turn ends, so a mode change alone would not apply to the first steps of the plan. The plugin stops the turn and sends "Continue with the approved plan." to the agent on your behalf. That message shows in the timeline and goes to Claude like any other prompt. Nothing else is sent anywhere.

After each switch, a row in the agent timeline reads "Switched to Auto mode" with an Undo button. Undo sets the agent back to Accept File Edits and the row changes to "Reverted to Accept Edits". The row is kept in the daemon's memory, so it is gone after a daemon restart.

## Limits

- Claude agents only.
- Auto mode lets Claude Code's classifier approve tool calls, so the agent will run more without asking than it does in Accept File Edits.
- Needs Paseo 0.11.4 or later. Tested on macOS with the desktop app on Paseo 0.11.4 and 0.12.0.
- Linux is untested. A daemon not started by the desktop app needs `paseo` on its `PATH`.
- Not expected to work on Windows, where the CLI is a `.cmd` script that the plugin does not start through a shell.
- It depends on Paseo internals that may change: the order of permission events, the action ID of the Bypass button, and Paseo forcing Accept File Edits after approval. A later Paseo release could break the plugin or make it unnecessary.
