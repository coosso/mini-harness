import { useState } from "react";
import { capitalize, greet } from "@code-harness/demo-1";
import { formatTimestamp, shout } from "@code-harness/demo-2";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="app">
      <h1>{greet(capitalize("code-harness"))}</h1>
      <p className="subtitle">pnpm monorepo · TypeScript · Vite · Oxc toolchain</p>

      <section className="card">
        <h2>Workspace packages</h2>
        <ul>
          <li>
            <code>@code-harness/demo-1</code> → {shout("demo-1 says hi")}
          </li>
          <li>
            <code>@code-harness/demo-2</code> → {formatTimestamp(Date.now())}
          </li>
        </ul>
      </section>

      <section className="card">
        <h2>Interactive counter</h2>
        <p>Count: {count}</p>
        <button type="button" onClick={() => setCount((value) => value + 1)}>
          +1
        </button>
        <button type="button" onClick={() => setCount(0)}>
          reset
        </button>
      </section>
    </main>
  );
}
