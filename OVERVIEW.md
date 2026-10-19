Switches Claude agents to Auto mode when you approve a plan, instead of Paseo's default of Accept File Edits. "Implement with Bypass" is left alone.

After each switch a short row appears in the agent timeline with an Undo button that puts the agent back in Accept File Edits.

It works by changing the mode right after Paseo resolves the plan approval, through the bundled `paseo` CLI at `/Applications/Paseo.app`, so it needs Paseo on macOS. Tested against Paseo 0.11.4.
