import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import Anthropic from "@anthropic-ai/sdk";


export function square(n: number): number {
  return n * n;
}

const client = new Anthropic();

const messages: Anthropic.MessageParam[] = [];

export async function chat(input: string): Promise<string> {
  messages.push({ role: "user", content: input });

  const stream = client.messages.stream({
    model: "deepseek-v4-flash",
    max_tokens: 1024,
    messages,
  });

  let reply = "";
  for await (const event of stream) {
    console.log(event)
    switch (event.type) {
      case "content_block_start":
        console.log(`\n[${event.content_block.type}]`);
        break;
      case "content_block_delta":
        switch (event.delta.type) {
          case "thinking_delta":
            process.stdout.write(event.delta.thinking);
            break;
          case "text_delta":
            process.stdout.write(event.delta.text);
            reply += event.delta.text;
            break;
          case "input_json_delta":
            process.stdout.write(event.delta.partial_json);
            break;
        }
        break;
    }
  }
  console.log();

  const final = await stream.finalMessage();
  console.log(`(tokens: in ${final.usage.input_tokens}, out ${final.usage.output_tokens})`);

  messages.push({ role: "assistant", content: reply });
  return reply;
}

export async function main(): Promise<void> {
  const rl = createInterface({ input, output });

  console.log("多轮对话，输入 exit 退出");

  while (true) {
    let query = "";
    try {
      query = await rl.question("> ");
    } catch {
      break; // stdin 已关闭（如管道 EOF / Ctrl+D）
    }
    if (query.trim().toLowerCase() === "exit") break;

    const reply = await chat(query);
    console.log(reply);
  }

  rl.close();
}

main();