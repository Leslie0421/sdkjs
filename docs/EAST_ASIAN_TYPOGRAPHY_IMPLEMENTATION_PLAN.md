# 东亚精细排版实施计划（sdkjs）

## 目标

在 Word 编辑器属性模型、样式系统、排版引擎和公共 API 中实现以下独立能力，并使用标准 DOCX 语义与 Microsoft Word/WPS 互操作：

1. 中文字体与西文字体分别设置。
2. 按中西文习惯控制行首行尾字符。
3. 自动调整中文与西文的间距。
4. 自动调整中文与数字的间距。
5. 允许标点溢出文本边界。
6. 按节设置每页行数、每行字符数的文档网格。

功能必须逐项完成和验收，不采用一次性重写排版引擎的方式交付。

## 总体原则

- 文件兼容使用 `w:rFonts`、`w:kinsoku`、`w:overflowPunct`、`w:autoSpaceDE`、`w:autoSpaceDN`、`w:docGrid`、`w:snapToGrid`，不增加私有 DOCX 字段。
- 每个属性都要经过：反序列化 → 属性模型 → 样式继承 → 历史/协同 → 排版 → API → 序列化。
- 自动间距属于视觉排版宽度，不能向正文插入真实空格。
- 文档网格属于节属性；不同分节可以具有不同设置。
- 属性缺省值必须遵循 OOXML，尤其 `autoSpaceDE/autoSpaceDN` 在样式层级从未声明时按 `true` 处理。
- 优先保证属性无损和语义一致，再针对 Word/WPS 做分页逼近；不承诺不同字体环境下像素级分页完全一致。

## 功能拆分和交付顺序

### S0：测试基线与观测工具

- 接入 core 提供的 Word/WPS 最小 DOCX 样本。
- 建立属性解析结果、计算后属性和节属性的单元测试入口。
- 建立页面截图、行数、分页数和关键字符坐标的回归基线。
- 测试矩阵覆盖直接格式、样式继承、复制粘贴、撤销重做、协同编辑和打开保存。

验收：任意后续阶段都能独立判断属性是否丢失、排版是否发生非预期变化。

### S1：中文/西文字体分别设置

实现状态：代码完成（2026-07-29），待 Microsoft Word/WPS DOCX 往返样本验收。

- 保留现有 `CRFonts.Ascii/HAnsi/EastAsia/CS` 模型和 Unicode 字体槽位分类。
- 新增按槽位设置字体的内部方法与公共 API；“西文字体”同时设置 `ascii` 和 `hAnsi`，但不覆盖 `eastAsia` 和 `cs`。
- 正确处理 theme 字体与直接字体的互斥关系，并保留 `hint` 和语言信息。
- 验证选区包含多个字体时的混合值返回行为。

建议 API：

```javascript
SetFontFamilies({
    eastAsia: "宋体",
    ascii: "Times New Roman",
    hAnsi: "Times New Roman",
    cs: "Arial"
});
```

验收：同一 Run 内中文和英文使用不同字体，DOCX 往返后 Word/WPS 仍识别相同字体槽位。

### S2：四个东亚段落属性进入完整模型

实现状态：代码完成（2026-07-29），待 Microsoft Word/WPS DOCX 样本往返验收。

- 在 `CParaPr`、计算后段落属性和样式合并中增加：
  - `Kinsoku`
  - `OverflowPunct`
  - `AutoSpaceDE`
  - `AutoSpaceDN`
- 补充复制、比较、合并、清除、JSON、二进制读取写入、历史记录和协同变更。
- 增加读取和设置 API，但本阶段只保证属性链路，不提前混入复杂排版算法。

验收：四个属性可以独立设置、撤销、重做、协同同步并无损保存。

### S3：按中西文习惯控制行首行尾字符

实现状态：代码完成（2026-07-29），待浏览器 QUnit、官方 core build-tools 和 Microsoft Word/WPS 样本验收。

- 将现有全局标点行首/行尾限制接入 `Kinsoku` 计算后属性。
- 按 Run 的东亚语言区分简中、繁中、日文、韩文适用范围。
- 属性关闭时不得继续强制使用东亚禁则；属性开启时保持当前成熟换行路径。
- 预留与 `OverflowPunct` 的冲突优先级：发生冲突时由溢出标点规则覆盖禁则。

验收：开关前后在行边界产生可重复的差异，选择、光标和搜索字符索引不变化。

### S4：中文/西文与中文/数字自动间距

实现状态：代码完成（2026-07-29），待浏览器 QUnit、打印/PDF 实体输出和 Microsoft Word/WPS 样本验收。

- 在文字测量后、换行决策前识别东亚文字、拉丁文字和数字边界。
- 以虚拟排版宽度表示间距，不修改文档字符流。
- 分别受 `AutoSpaceDE` 和 `AutoSpaceDN` 控制，并遵循样式继承与缺省值。
- 同步处理行宽、两端对齐、光标位置、选择高亮、点击命中、绘制和 PDF/打印。
- 明确标点、空格、超链接边界、字段和不同 Run 之间是否形成自动间距。

验收：复制与搜索文本不含新增空格，视觉间距和 Word/WPS 基准文档一致。

### S5：允许标点溢出边界

实现状态：代码完成（2026-07-29），待浏览器 QUnit 和 Microsoft Word/WPS 边界样本验收。

- 根据语言维护可溢出标点集合。
- 在行尾宽度判断中允许目标标点悬挂到文本边界之外，但不改变正文边距和字符索引。
- 同步光标、选择、命中测试、两端对齐、打印和导出坐标。
- 实现与 `Kinsoku` 的冲突优先级。

验收：标点只在允许的语言、字符和段落中溢出，关闭后恢复普通换行。

### S6：每页行数、每行字符数文档网格

实现状态：代码完成（2026-07-29）；core C2/C3 已完成静态协议审查，待官方 core build-tools、多节 DOCX 和 Microsoft Word/WPS 样本验收。

- 在 `SectPr` 中增加 `DocGrid`，包含类型、行网格间距和字符网格间距。
- 补充节属性历史、复制、比较、协同和二进制读写；与 core 的 `secPr.docGrid = 14` 对齐。
- 实现段落和 Run 的 `SnapToGrid` 属性及样式继承。
- 排版时按当前节的正文区域和网格计算行基线、东亚全角字符网格位置。
- 拉丁文字按实际宽度跨越足够的网格单元，不机械按字符数切分。
- 处理分节、分栏、固定行距、段前段后、表格兼容设置、页眉页脚和脚注边界。
- API 既支持底层 pitch，也提供“每页行数/每行字符数”的换算入口。

验收：多节文档可分别设置网格；普通中文段落达到目标行数和字符数；混排和表格不会破坏文档结构。

## 重点代码区域

- `word/Editor/Styles.js`：文字和段落属性模型、样式合并。
- `word/Editor/Serialize2.js`：Editor.bin 双向协议。
- `word/Editor/sections/sect-pr.js`：节属性和文档网格。
- `word/Editor/Paragraph/Run/FontClassification.js`、`FontCalculator.js`：字体槽位。
- `word/Editor/Paragraph/RunContent/Text.js`、`word/Editor/Run.js`：标点、测量和换行。
- `word/Editor/Paragraph_Recalculate.js` 及页面布局相关模块：行网格和分页。
- `word/api.js`、`word/apiBuilder.js`：内部与插件公共 API。

## 每阶段验证门槛

- `node --check` 和 `git diff --check`。
- 相关 QUnit/单元测试通过。
- `compile-word` Closure 编译通过。
- Word/WPS 样本完成 XML 往返验证。
- 页面截图、分页数和关键坐标回归无非目标变化。
- 对普通西文文档、表格、页眉页脚、脚注、批注、修订进行对抗性回归。

## 提交和依赖策略

- S0 至 S6 分别提交；S3、S4、S5 不合并成一个“中文排版”大提交。
- S2 必须在 S3/S4/S5 之前完成。
- S6 的序列化部分依赖 core 的 C2，界面依赖 `web-apps` 的 W3。
- 每阶段完成后更新 `docs/CHANGELOG.md`，注明 core/web-apps 的对应提交。

## 暂不纳入

- `office-plugin` 的业务封装和 `custom_office` 测试面板。本次先完成 OnlyOffice 原生编辑能力；若业务系统需要直接调用，再另建独立计划。
- 非 DOCX 私有格式扩展。
- 在字体环境不同的情况下承诺与 Word/WPS 像素级完全相同。
