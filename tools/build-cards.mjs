import { mkdir, writeFile } from "node:fs/promises";

// 卡片只展示已公开项目；不依赖第三方统计接口或浏览器脚本。
const projects = [
  {
    name: "vue3-number-scroll",
    description: "让数字变化更自然。",
    category: "Vue 3 / 数字动效",
  },
  {
    name: "markview-vue",
    description: "在 Vue 中展示 Markdown。",
    category: "Vue / 内容展示",
  },
  {
    name: "fe-link",
    description: "让本地 npm 包联调更顺手。",
    category: "前端工程 / 本地调试",
  },
  {
    name: "mind-map-components",
    description: "把想法组织成思维导图。",
    category: "Vue + React / 可视化",
  },
];
const themes = {
  light: {
    background: "#f6f8fa",
    border: "#d1d9e0",
    title: "#1f2328",
    text: "#454d56",
    accent: "#096774",
  },
  dark: {
    background: "#151b23",
    border: "#3d444d",
    title: "#f0f6fc",
    text: "#b1bac4",
    accent: "#79c5d1",
  },
};
const escape = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const directory = new URL("../assets/cards/", import.meta.url);
await mkdir(directory, { recursive: true });
for (const project of projects) {
  for (const [theme, colors] of Object.entries(themes)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="460" height="202" viewBox="0 0 460 202" role="img" aria-labelledby="title description">
  <title id="title">${escape(project.name)}</title>
  <desc id="description">${escape(project.description)} ${escape(project.category)}</desc>
  <rect x=".5" y=".5" width="459" height="190" rx="12" fill="${colors.background}" stroke="${colors.border}" />
  <g font-family="-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Microsoft YaHei,sans-serif">
    <text x="28" y="55" fill="${colors.title}" font-size="28" font-weight="650">${escape(project.name)}</text>
    <text x="28" y="99" fill="${colors.text}" font-size="23">${escape(project.description)}</text>
    <text x="28" y="153" fill="${colors.accent}" font-size="20" font-weight="500">${escape(project.category)}</text>
  </g>
</svg>
`;
    await writeFile(new URL(`${project.name}-${theme}.svg`, directory), svg);
  }
}
process.stdout.write("已生成 4 个项目的深浅两套卡片。\n");
