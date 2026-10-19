import type { PluginTimelineItemProps } from "@getpaseo/plugin/client";
import { useRpc } from "@getpaseo/plugin/client";
import { useMutation } from "@tanstack/react-query";
import { Pressable, Text, View } from "react-native";
import type { z } from "zod";
import { modeSwitchSchema, undoRpc } from "../shared/mode-switch";

type Props = PluginTimelineItemProps<z.infer<typeof modeSwitchSchema>>;

export function ModeSwitchRow({ agentId, item, theme }: Props) {
  const undo = useMutation({ mutationFn: useRpc(undoRpc) });
  const { requestId, status } = item.data;

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 4 }}>
      <Text style={{ color: theme.colors.foregroundMuted }}>
        {status === "auto" ? "Switched to Auto mode" : "Reverted to Accept Edits"}
      </Text>
      {status === "auto" && (
        <Pressable
          accessibilityRole="button"
          disabled={undo.isPending}
          onPress={() => undo.mutate({ agentId, requestId })}
          style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, backgroundColor: theme.colors.surface2 }}
        >
          <Text style={{ color: theme.colors.foreground }}>Undo</Text>
        </Pressable>
      )}
    </View>
  );
}
