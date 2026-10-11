# ChatPassport 0.1.5 Chrome 商店更新

可直接上传的完整扩展包：`release/chatpassport-0.1.5-chrome.zip`。不要再压缩，也不要上传仓库根目录。

## 本次修复

1. 历史抓取到达页面边界后，会等待持续 12 秒无变化才结束。期间若有较慢加载的旧消息，继续抓取并重新计时。仍以两分钟作为总时间上限；页面从未加载的隐藏历史无法保证包含。
2. 目标页的转移卡片在“Preparing…”期间被关闭后，不再因迟到的异步回复写入草稿。写入前还会复核临时转移是否仍有效；开始写入后，Dismiss 会暂时禁用，避免误以为可撤销已开始的写入。

与 0.1.4 相比没有新增权限。扩展不会自动点击目标网站的发送按钮。

## 上传步骤

1. 登录 [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)，打开现有 ChatPassport 项目，核对扩展 ID：`anmmhpfpbaafkgdhalbllhmaejeappmb`。不要新建项目。
2. 在 Package 页上传 `chatpassport-0.1.5-chrome.zip`，确认后台读取到版本 **0.1.5**。若后台已有 0.1.5 或更高版本，先处理版本冲突。
3. 需要更新文字时，参考 `store-assets/STORE_LISTING.md`。如线上版本仍早于 0.1.2，还要核对 `alarms` 权限说明和隐私政策。
4. 保留或自行核对现有商店截图；工作区里三张截图的本地改动未包含在扩展 ZIP 中。
5. 保存并提交审核，按需要选择审核通过后自动发布或手动发布。生成 ZIP 不等于已经发布。

可复制的审核备注：

```text
ChatPassport 0.1.5
- Wait for a stable history boundary so slower-loading messages can be captured.
- Cancel pending draft insertion when the transfer card is dismissed.
- Recheck that a transfer is still active before inserting a destination draft.
- No new permissions. Messages are never sent automatically.
```

建议在登录状态下实际验证四个平台的长对话抓取、准备中关闭卡片以及目标草稿。自动测试不能代替真实网站验证。重新生成包可运行 `pnpm release:chrome`。
