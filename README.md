# code-harness

基于 **pnpm workspace** 的 TypeScript monorepo 脚手架。

## 技术栈

- **pnpm** — workspace / monorepo 包管理
- **TypeScript** — 全仓库类型检查
- **Vite + React 19** — `apps/web` 前端应用
- **Ink + React 19** — `apps/tui` 终端 TUI 应用
- **Oxlint** — 代码检查（`oxlint`）
- **oxfmt** — 代码格式化（oxc 生态的 formatter）

## 目录结构

```
code-harness/
├── apps/
│   ├── web/            # React + Vite 前端 (@code-harness/web)
│   └── tui/            # Ink 终端应用 (@code-harness/tui)
├── packages/
│   ├── agent/          # Agent 抽象：createAgent / Agent 接口 (@code-harness/agent)
│   ├── demo-1/         # 示例包：纯工具函数 (@code-harness/demo-1)
│   └── demo-2/         # 示例包：依赖 demo-1，演示包间依赖 (@code-harness/demo-2)
├── .oxlintrc.json      # Oxlint 配置
├── .oxfmtrc.json       # oxfmt 配置
├── pnpm-workspace.yaml # workspace 定义
└── tsconfig.base.json  # 共享 TS 配置
```

> demo 包直接以 `src/index.ts` 作为入口（`exports` 指向源码），
> 无需预先构建即可被 `tsx` 和 Vite 消费，适合作为开发期 demo。

## 快速开始

```bash
pnpm install
pnpm dev:web   # 启动 Vite dev server → http://localhost:5173
pnpm dev:tui   # 启动终端 TUI（需要真实终端，↑/↓ 调整，Esc 退出）
```

## 脚本

| 命令                                | 说明                                            |
| ----------------------------------- | ----------------------------------------------- |
| `pnpm dev`                          | 并行启动所有 app 的 dev 脚本                    |
| `pnpm dev:web` / `pnpm dev:tui`     | 启动单个 app                                    |
| `pnpm build`                        | 构建所有 app                                    |
| `pnpm typecheck`                    | 全仓库 TypeScript 类型检查                      |
| `pnpm lint` / `pnpm lint:fix`       | Oxlint 检查 / 自动修复                          |
| `pnpm format` / `pnpm format:check` | oxfmt 格式化 / 检查                             |
| `pnpm clean`                        | 清理构建产物与依赖目录                          |
| `pnpm ci`                           | 安装 + lint + format + typecheck + build 全流程 |

## 添加新包

```bash
mkdir packages/my-package
pnpm --filter my-package init
pnpm --filter @code-harness/my-package add some-dependency
```

在 `packages/*/src/index.ts` 导出 API，并通过 `exports` 字段暴露源码入口；
其他包用 `workspace:*` 引用即可：

```bash
pnpm --filter @code-harness/web add @code-harness/my-package@workspace:*
```

## 工具链说明

- **Oxlint**：配置文件 `.oxlintrc.json`，启用 `correctness`（error）与 `suspicious`（warn）两个分类，
  web 应用额外启用 `react` / `jsx-a11y` 插件。
- **oxfmt**：配置文件 `.oxfmtrc.json`（printWidth 100 / 双引号 / 分号），
  与 Oxlint 同属 oxc 生态，速度远快于 Prettier。
- VSCode 推荐安装 [oxc.oxc-vscode](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) 扩展
  获得 lint / format 编辑器集成（见 `.vscode/extensions.json`）。
