# ChatPassport 0.1.6 更新与发布

上传包：`release/chatpassport-0.1.6-chrome.zip`。

## 本次改动

1. 目标助手选择前置，使用 Prepare for / Continue in 引导主流程，导入、导出和上下文范围放到 More options。
2. 新增 Quick：只读取当前已加载消息，不滚动、不等待历史加载，并明确标记为部分抓取。默认仍为 Load history，保留 12 秒稳定边界等待、两分钟上限和停止后使用已抓取结果。
3. 在源侧预估 48,000 字符草稿预算内可容纳的消息数；目标侧按实际下一问重新计算。需要省略旧消息时，先显示准确数量并确认，再写入编辑器。
4. 目标页明确显示等待、准备、审核发送和失败状态。编辑器拒绝草稿时提供原问题展示及复制恢复。仍不自动发送，等待确认期间过期、取消或编辑变化不会造成旧草稿覆盖。
5. 更新扩展名称、简介、README、隐私文案、商店文案和三张 1280×800 PNG。截图使用实际组件与演示数据，目标网站编辑器为演示环境。
6. Quick 导出的 JSON 使用 capture.method = loaded。新版可导入旧 JSON；旧版扩展需要升级后才能导入 loaded 文件。
7. 修复 ChatGPT 新版页面消息节点无法识别的问题；支持反向滚动的历史容器。无消息时立即报错，页面未提供可滚动历史时标记为部分抓取，抓取提示移到操作按钮附近。

本次没有新增权限，没有引入服务端或遥测。尚未实现 AI 摘要或关键消息固定保留。

## 验证

- `pnpm check`：类型检查、113 项自动测试和生产构建通过。
- 新增测试覆盖快速抓取无滚动/无定时等待、导航与取消、上下文容量提示、超长确认/返回/关闭、确认期间过期和失败后的原问题恢复。
- 本地 Chrome 的真实 ChatGPT 会话中，Quick 已能读取消息；历史模式已能结束并显示结果。ChatGPT 可能仅渲染部分历史，仍需在不同长度的真实会话中核对完整性。
- 三张 PNG 已逐张检查，尺寸一致且内容不同。预览仅使用演示数据与模拟浏览器 API，不代表四个平台登录后的真实网站兼容性已经验证。
- 仍需使用最终 ZIP 在已登录的 ChatGPT、Claude、Gemini、DeepSeek 上完成真实抓取和迁移验证，尤其是富文本编辑器和长对话。

## 更新商店

1. 打开原有项目 `anmmhpfpbaafkgdhalbllhmaejeappmb`，不要新建项目。
2. 上传 ZIP，确认版本为 0.1.6。
3. 使用 `store-assets/STORE_LISTING.md` 更新商店名称、简介、描述和审核步骤；上传三张截图。扩展包上传不会自动同步所有商店文字和图片。
4. 同步发布 `docs/privacy.html`，使公开隐私页的按钮名和两种抓取方式与新版一致。
5. 核对 Privacy 中所有权限用途，特别是 alarms，点击 Save draft。
6. 点击 Submit for review 并确认；需要自动上线时选择审核通过后自动发布。
7. 发布后核对 Published 版本为 0.1.6。生成 ZIP、提交 Git 或上传草稿都不等于商店已发布。

## 审核备注

```text
ChatPassport 0.1.6
- Add an explicit quick capture mode for currently rendered messages; history capture remains available.
- Simplify destination selection and place import/export/range controls in More options.
- Estimate draft capacity and require approval before omitting older messages at insertion.
- Improve draft status and original-question recovery after editor failures.
- Recognize current ChatGPT message markup and reverse scrolling; report partial capture when history cannot be scrolled.
- Update listing materials and privacy wording. No additional permissions or telemetry.
- The user still reviews and sends the message manually.
```

重新打包：`pnpm release:chrome`。本地截图预览：`node scripts/preview-store.mjs`。
