#!/usr/bin/env node
import React, { useState } from "react";
import { Box, Text, render, useApp, useInput } from "ink";
import { greet } from "@code-harness/demo-1";
import { formatDuration } from "@code-harness/demo-2";

function Dashboard() {
  const { exit } = useApp();
  const [count, setCount] = useState(0);

  useInput((input, key) => {
    if (key.escape || (key.ctrl && input === "c")) {
      exit();
      return;
    }
    if (key.upArrow) {
      setCount((value) => value + 1);
    }
    if (key.downArrow) {
      setCount((value) => value - 1);
    }
    if (key.leftArrow) {
      setCount(0);
    }
  });

  const uptime = formatDuration(process.uptime() * 1000);

  return (
    <Box flexDirection="column" padding={1} borderStyle="round" borderColor="cyan">
      <Text bold color="cyan">
        @code-harness/tui
      </Text>
      <Text dimColor>{greet("code-harness")}</Text>
      <Box marginTop={1}>
        <Text>Counter: </Text>
        <Text bold color="green">
          {count}
        </Text>
      </Box>
      <Text dimColor>Uptime: {uptime}</Text>
      <Text dimColor>↑/↓ adjust · ← reset · Esc/Ctrl+C quit</Text>
    </Box>
  );
}

render(<Dashboard />);
