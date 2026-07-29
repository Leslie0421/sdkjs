# 项目变更记录

用于记录需要跨对话继续维护的关键改动。后续更新时按日期追加，重点写清文件、原因和依赖关系，无需记录完整实现细节。

## 2026-07-29：完成中西文字体分槽设置第一阶段

- `common/apiCommon.js`、`word/apiCommon.js`
  - 新增公开的 `asc_CTextFontFamilies`，分别暴露 `ascii`、`hAnsi`、`eastAsia`、`cs` 和 `hint`；段落/文字计算属性可返回各字体槽位及混合值。
- `word/Editor/Styles.js`、`word/api.js`、`word/apiBuilder.js`
  - 新增 `SetFontFamilies` / `put_TextPrFontFamilies`，只更新调用方明确提供的槽位；更新中文字体不会覆盖西文字体或复杂文字字体，反之亦然。
  - 更新直接字体时仅清除对应 theme 字体，保留其他 theme 槽、`w:hint` 和语言信息。
  - `paraApply` 可把字体槽位与高级段落设置放入同一次历史操作；字体文件后台加载完成后只触发重排，不延迟修改选区，避免用户移动光标后误改新位置。
  - 修复生产压缩构建中把普通 `RFonts` 对象跨编译单元传递后字段被 Closure 重命名、最终未写入选区的问题；现在通过 `CTextPr.put_FontFamilyBySlot` 写入真实字体槽。
  - 保留用户请求的 OOXML 字体名称，字体查找结果只用于加载对应字体资源，不再用回退字体名称覆盖文档属性。
  - 公开 API 同时兼容稳定的 `get_*` 方法和普通对象字段，避免 API 实例与插件普通对象在生产构建下出现不同结果。
- `tests/word/js-api/api-run.js`
  - 增加 11 项断言，覆盖中西文字体互不覆盖、目标 theme 槽清除、非目标 theme 槽和 hint 保留。
- `tests/word/api/api.js`
  - 增加真实段落选区回归用例，验证 `paraApply` 分别写入 `eastAsia`、`ascii/hAnsi`，并保留未提交的 `cs` 槽。

### 验证状态

- `node --check`、`git diff --check` 通过。
- `build/node_modules/.bin/grunt compile-word` Closure 全量编译通过。
- 浏览器 QUnit 新增用例 11/11 断言通过；全套页面另有 2 个既有 `DrawingDocument.Set_RulerState_Columns` 测试桩失败，与本次字体改动无关。
- 已在生产部署环境验证高级段落设置可分别修改中文与西文字体；临时诊断日志已清除。
- Microsoft Word/WPS DOCX 往返样本仍属于后续兼容验收，不在本次代码验证中冒充完成。

### 跨项目依赖

- 对应原生设置界面位于 `../web-apps`；`core` 已具备四个 `w:rFonts` 槽位的读写能力，本阶段未修改 `core`。

## 2026-07-29：建立东亚精细排版实施计划

- 新增 `docs/EAST_ASIAN_TYPOGRAPHY_IMPLEMENTATION_PLAN.md`。
- 将实现拆分为测试基线、中西文字体、段落属性模型、行首行尾禁则、中西文/数字自动间距、溢出标点和文档网格七个阶段。
- 明确 core 负责 OOXML/二进制传输、sdkjs 负责属性与排版、web-apps 负责原生设置界面；暂不扩展业务项目 API。

## 2026-07-29：增加全文非全词搜索兜底并统一匹配索引口径

- `word/api_plugins.js`
  - `pluginMethod_XytSearch` 的顺序调整为：常规全词搜索、去编号全词搜索、全文非全词搜索、可见文本安全归一化、标点/空白宽松归一化；坐标定位仍由调用方在文本定位失败后单独调用。
  - 只有调用方请求 `wholeWords=true` 且严格搜索失败时才执行全文非全词重试；命中返回 `code=206、matchMode=whole-word-relaxed、wholeWordsRelaxed=true`。
  - 全文非全词重试完全忽略 OCR `page` 的过滤作用，`count` 和 `selectIndex` 始终按正文全文匹配列表计算。
  - 归一化阶段仍可先用 `page` 发现更可能的候选和匹配模式，但真正选择结果前会重新取得该候选的全文有序匹配列表；返回 `selectIndexScope=document`，避免把算法提供的全文索引误当成页内索引。
  - 进入归一化阶段代表严格全词和原生非全词均已失败，归一化匹配继续使用非全词边界，避免归一化成功后再次被全词边界拦截。

### 跨项目依赖

- `../office-plugin/src/officeApi/documentAPI/onSearch.ts` 已暴露新的匹配模式和全文索引范围字段。

## 2026-07-29：表格行定位改为对象参数并支持正文全局模式

- `word/api_plugins.js`
  - `pluginMethod_SelectTable` 入参由数组改为 `{ pageNumber?, tableNumber, rowNumber }`，字段名称直接表达页码、表格序号和行号，不再兼容数组协议。
  - 传入 `pageNumber` 时维持 OCR 页内定位：表格按页内视觉顺序计数，行按本页可见行计数，继续支持跨页续行和重复标题行。
  - 省略 `pageNumber` 时改为正文全局定位：从正文开头按文档顺序统计顶层表格，`rowNumber` 按整张表格的逻辑行计数，不依赖分页完成状态。
  - 两种模式均保留表格/行越界兜底，实际完成选区时返回 `code=206、data=true`；`detail.locationMode` 标识 `page | document`，并返回请求位置、实际位置和正文表格总数。

### 跨项目依赖

- 类型化对象协议位于 `../office-plugin/src/officeApi/documentAPI/selectTable.ts`。
- 可编辑的两种模式测试入口位于 `../custom_office/src/pages/home/components/SearchTestWorkspace.tsx`。

## 2026-07-28：修复 Word SDK 加载阶段 `AscWord` 未定义

- `word/api_plugins.js`
  - 可见文本读取器不再在 `sdk-all.js` 模块求值阶段继承 `AscWord.DocumentVisitor`。
  - 仅当原生搜索和去编号搜索均失败、确实进入可见文本归一化流程时，才从 `window.AscWord` 动态创建 `DocumentVisitor`。
  - 修复 `ReferenceError: AscWord is not defined` 导致整个 Word SDK 中断的问题；后续 `Asc.asc_CAdjustPrint is not a constructor` 属于 SDK 未完整加载产生的连锁错误，无需单独修改打印模块。

### 验证状态

- `node --check word/api_plugins.js`、`git diff --check` 通过。
- `build/grunt compile-word` Closure 全量编译通过。

## 2026-07-28：OCR 文本分层定位与坐标兜底

- `word/api_plugins.js`
  - 重构 `pluginMethod_XytSearch` 为只建立选区的分层定位 API，依次执行原生精确搜索、去标题/列表编号搜索、可见文本安全归一化和标点/空白宽松定位。
  - 归一化阶段支持 OCR `page`（从 1 开始）：先解析该页涉及的正文段落，页内无匹配才扩大到正文全文；原生精确搜索仍保持 OnlyOffice 的全文行为。
  - 可见文本按 Run 字符建立“归一化字符到真实段落位置”的映射，忽略零宽字符，兼容全半角、普通文本与超链接显示文本的边界，并支持连续段落内的 `^p` 选区。
  - 标题编号支持 `一、`、`（一）`、`(1)`、`1.`、`1.2.3`、`第一条/章` 等常见形式；先搜索原文，失败后才去编号，避免截断普通数字内容。
  - 搜索返回 `code/data/count/matchMode/page` 等结构化结果；匹配序号越界时选中最后一项并返回 `206`。
  - 修复 `pluginMethod_XytSearchAndReplace` 未命中仍向当前光标写入内容的问题。单项替换现在严格执行“定位成功且选区可编辑后再替换”；批量替换仅允许原生精确的单段文本，跨段或宽松匹配交由调用方逐项处理。
  - 重构 `pluginMethod_SearchByPos`：接收 PaddleOCR 多边形、PDF 页面像素宽高和 `paragraph | cursor` 模式，按页面比例换算 Word 毫米坐标，不再依赖固定 144 DPI 或仅使用 Y 坐标。
  - 坐标定位失败时至少移动到请求页并返回 `code=206、level=page、mode=page-only`；页码越界时定位到最后一页并明确报告请求页与实际页。

### 接口约定

- 归一化全文指正文文档树（包含正文表格），不跨表格单元格拼接多段文本，也不把页眉页脚或文本框与正文串联。
- `visible-normalized` 执行 NFKC、大小写配置、零宽字符清理和空白折叠；`visible-loose` 进一步统一引号、横线、省略号并忽略空白，因此只作为精确/安全归一化失败后的低优先级定位。
- 坐标定位是最终粗粒度兜底，`paragraph` 默认选择邻近整段，调用方在执行破坏性修改前应检查 `coarse=true` 和返回级别。

### 验证状态

- `node --check word/api_plugins.js`、`git diff --check` 通过。
- `build/grunt compile-word` Closure 全量编译通过。

## 2026-07-28：按 OCR 页内位置定位 Word 表格行

- `word/api_plugins.js`
  - 重构 `pluginMethod_SelectTable`，新参数固定为 `[页码, 本页表格序号, 本页可见行号]`，全部从 1 开始，不再兼容旧的表格/行/列/单元格索引协议。
  - 只统计正文文档树中的顶层表格，排除嵌套表格和文本框内表格；同页表格按页面上的 `Top`、`Left` 排序，以贴近 OCR 的视觉顺序。
  - 使用 OnlyOffice 已计算的表格分页信息解析本页行，支持跨页续行和重复标题行。
  - 使用 `SelectRows` 直接建立完整逻辑行选区；页面坐标只负责滚动到 OCR 指定页的行片段，不再通过坐标反查单元格。
  - 返回 `detail` 描述逻辑行号、页面表格/行数量以及跨页、重复标题状态，便于调用方核对 OCR 映射。
  - 增加越界兜底：表格序号越界时选择当前页最后一个表格；当前页无表格时向后查找首个表格；行号越界时选择实际表格的最后一个可见行。
  - 兜底定位成功返回 `code=206、data=true`，通过 `message`、请求/实际位置和 `fallbackReasons` 将偏差信息交给调用方。

### 接口约定

- 同一个跨页表格会在它出现的每一页参与该页表格排序。
- 跨页拆分行在续页仍按一条本页可见行计数；选中的是完整 Word 逻辑行，视图停留在请求页。
- 重复标题行按该页实际绘制的标题行计数，且排在普通行之前。
- 仅向请求页之后查找兜底表格；若直到文档末尾仍无表格，则不改变选区并返回 `data=false`。
- 该功能是独立的表格定位能力，与公文套红链路没有依赖关系。

### 验证状态

- 已由调用方完成实际文档功能验证：正常定位、跨页表格以及表格/行越界兜底均可正常使用。
- `grunt compile-word` 全量编译通过。

## 2026-07-27：实现公文套红的原生 DOCX 合并

- `word/api_plugins.js`
  - 新增插件方法 `XytInsertDocumentAtBookmark`：校验参数、编辑状态、书签位置和锁，选中模板正文书签后异步插入 DOCX。
  - 书签归属通过书签标记所在文档树判断，正文或正文表格内可用，页眉、页脚、脚注、文本框等非主文档区域拒绝。
  - 模板书签范围若自带分节符则拒绝，避免模板分节与源正文分节发生歧义。
- `word/Editor/InsertDocumentFile.js`、`word/api.js`
  - 原生插入管理器支持选项、结构化完成回调和明确失败码；转换结果加载失败时保证结束异步链路。
  - 转换上下文清理完成后再开始粘贴，防止图片映射和插入策略被提前清空。
  - 粘贴或收尾失败时取消并回滚 OnlyOffice 动作，避免留下部分分节或正文内容；结束操作和临时文件清理均保证最终回调。
- `word/Editor/Serialize2.js`
  - 仅在 `stylePolicy=keepSource` 时处理同名样式冲突并重映射 BasedOn/Next/Link，普通复制粘贴仍沿用目标样式优先逻辑。
  - 仅在 `sectionPolicy=preserveSource` 时读取源 DOCX 最后一节属性。
- `common/wordcopypaste.js`
  - 保留正文中的显式分节符；将源最后一节版式合并到模板目标节，同时把模板首页页眉/页脚（包括红线）固定到正文第一节，避免它移动到正文结束页。
- 已删除本次排查加入的请求编号、阶段耗时、看门狗和临时控制台日志。

### 回归隔离与部署

- 新的样式和分节处理都由上述两个精确策略值控制；未传策略的普通粘贴、文件插入、比较与合并流程不启用套红专用行为。
- 修改后需在 `sdkjs/build` 执行 `grunt compile-word`，并同步部署生成的 `deploy/sdkjs/word/sdk-all.js` 与 `sdk-all-min.js`，否则浏览器仍会运行旧代码。
