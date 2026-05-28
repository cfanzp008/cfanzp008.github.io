// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="index.html">《Vim实用技巧（第2版）》学习笔记</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_1.html"><strong aria-hidden="true">1.</strong> 第1章-Vim解决问题的方式</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c1_skill_1.html"><strong aria-hidden="true">1.1.</strong> 技巧1-认识.命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c1_skill_2.html"><strong aria-hidden="true">1.2.</strong> 技巧2-不要自我重复</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c1_skill_3.html"><strong aria-hidden="true">1.3.</strong> 技巧3-以退为进</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c1_skill_4.html"><strong aria-hidden="true">1.4.</strong> 技巧4-执行、重复、回退</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c1_skill_5.html"><strong aria-hidden="true">1.5.</strong> 技巧5-查找并手动替换</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c1_skill_6.html"><strong aria-hidden="true">1.6.</strong> 技巧6-认识范式</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_2.html"><strong aria-hidden="true">2.</strong> 第2章-普通模式</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c2_skill_7.html"><strong aria-hidden="true">2.1.</strong> 技巧7-停顿时请移开画笔</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c2_skill_8.html"><strong aria-hidden="true">2.2.</strong> 技巧8-把撤销单元切成块</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c2_skill_9.html"><strong aria-hidden="true">2.3.</strong> 技巧9-构造可重复的修改</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c2_skill_10.html"><strong aria-hidden="true">2.4.</strong> 技巧10-用次数做简单的算术运算</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c2_skill_11.html"><strong aria-hidden="true">2.5.</strong> 技巧11-能够重复,就别用次数</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c2_skill_12.html"><strong aria-hidden="true">2.6.</strong> 技巧12-双剑合璧，天下无敌</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3.html"><strong aria-hidden="true">3.</strong> 第3章-插入模式</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c3_skill_13.html"><strong aria-hidden="true">3.1.</strong> 技巧13-在插入模式中可即时更正错误</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c3_skill_14.html"><strong aria-hidden="true">3.2.</strong> 技巧14-返回普通模式</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c3_skill_15.html"><strong aria-hidden="true">3.3.</strong> 技巧15-不离开插入模式，粘贴寄存器中的文本</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c3_skill_16.html"><strong aria-hidden="true">3.4.</strong> 技巧16-随时随地地做运算</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c3_skill_17.html"><strong aria-hidden="true">3.5.</strong> 技巧17-用字符编码插入非常用字符</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c3_skill_18.html"><strong aria-hidden="true">3.6.</strong> 技巧18-用二合字母插入非常用字符</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c3_skill_19.html"><strong aria-hidden="true">3.7.</strong> 技巧19-用替换模式替换已有文本</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4.html"><strong aria-hidden="true">4.</strong> 第4章-可视模式</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c4_skill_20.html"><strong aria-hidden="true">4.1.</strong> 技巧20-深入理解可视模式</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c4_skill_21.html"><strong aria-hidden="true">4.2.</strong> 技巧21-选择高亮选区</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c4_skill_22.html"><strong aria-hidden="true">4.3.</strong> 技巧22-重复执行面向行的可视命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c4_skill_23.html"><strong aria-hidden="true">4.4.</strong> 技巧23-只要可能，最好用操作符命令，而不是可视命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c4_skill_24.html"><strong aria-hidden="true">4.5.</strong> 技巧24-面向列面向列块的可视模式编辑表格数据</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c4_skill_25.html"><strong aria-hidden="true">4.6.</strong> 技巧25-修改列文本</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c4_skill_26.html"><strong aria-hidden="true">4.7.</strong> 技巧26-在长短不一的高亮块后添加文本</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5.html"><strong aria-hidden="true">5.</strong> 第5章-命令行模式</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c5_skill_27.html"><strong aria-hidden="true">5.1.</strong> 技巧27-认识Vim的命令行模式</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c5_skill_28.html"><strong aria-hidden="true">5.2.</strong> 技巧28-在一行或多个连续行上执行命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c5_skill_29.html"><strong aria-hidden="true">5.3.</strong> 技巧29-‘:t’和‘:m’复制和移动行</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c5_skill_33.html"><strong aria-hidden="true">5.4.</strong> 技巧33-把当前单词插入命令行</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c5_skill_34.html"><strong aria-hidden="true">5.5.</strong> 技巧34-回溯历史命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c5_skill_35.html"><strong aria-hidden="true">5.6.</strong> 技巧35-运行Shell命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c5_skill_36.html"><strong aria-hidden="true">5.7.</strong> 技巧36-批处理运行Ex命令</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_6.html"><strong aria-hidden="true">6.</strong> 第6章-管理多个文件</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c6_skill_37.html"><strong aria-hidden="true">6.1.</strong> 技巧37-批处理运行Ex命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c6_skill_38.html"><strong aria-hidden="true">6.2.</strong> 技巧38-用参数列表将缓冲区分组</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c6_skill_39.html"><strong aria-hidden="true">6.3.</strong> 技巧39-管理隐藏缓冲区</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c6_skill_40.html"><strong aria-hidden="true">6.4.</strong> 技巧40-将工作区切分成窗口</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c6_skill_41.html"><strong aria-hidden="true">6.5.</strong> 技巧41-用标签页将窗口分组</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7.html"><strong aria-hidden="true">7.</strong> 第7章 打开及保存文件</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c7_skill_42.html"><strong aria-hidden="true">7.1.</strong> 技巧42-用:edit命令打开及保存文件</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c7_skill_43.html"><strong aria-hidden="true">7.2.</strong> 技巧43-使用:find打开文件</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c7_skill_44.html"><strong aria-hidden="true">7.3.</strong> 技巧44-使用netrw管理文件系统</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c7_skill_45.html"><strong aria-hidden="true">7.4.</strong> 技巧45-把文件保存到不存在的目录中</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c7_skill_46.html"><strong aria-hidden="true">7.5.</strong> 技巧46-以超级用户权限保存文件</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">8.</strong> 第8章  用动作命令在文档中移动</span></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c8_skill_47.html"><strong aria-hidden="true">8.1.</strong> 技巧47-让手指保持在本位行上</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c8_skill_48.html"><strong aria-hidden="true">8.2.</strong> 技巧48-区分实际行与屏幕行</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c8_skill_49.html"><strong aria-hidden="true">8.3.</strong> 技巧49-基于单词移动</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c8_skill_50.html"><strong aria-hidden="true">8.4.</strong> 技巧50-对字符进行查找</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c8_skill_51.html"><strong aria-hidden="true">8.5.</strong> 技巧51-通过查找进行移动</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c8_skill_52.html"><strong aria-hidden="true">8.6.</strong> 技巧52-用精确的文本对象选择区域</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c8_skill_53.html"><strong aria-hidden="true">8.7.</strong> 技巧53-删除周边，修改内部</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c8_skill_54.html"><strong aria-hidden="true">8.8.</strong> 技巧54-设置位置标记，以便快速跳回</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c8_skill_55.html"><strong aria-hidden="true">8.9.</strong> 技巧55-在匹配括号间跳转</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">9.</strong> 第9章 在文件间跳转</span></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c9_skill_56.html"><strong aria-hidden="true">9.1.</strong> 技巧56-遍历跳转列表</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c9_skill_57.html"><strong aria-hidden="true">9.2.</strong> 技巧57-遍历改变列表</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c9_skill_58.html"><strong aria-hidden="true">9.3.</strong> 技巧58-跳转到光标下的文件</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c9_skill_59.html"><strong aria-hidden="true">9.4.</strong> 技巧59-用全局位置标记在文件间快速</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">10.</strong> 第10章 复制与粘贴</span></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c10_skill_60.html"><strong aria-hidden="true">10.1.</strong> 技巧60-用无名寄存器实现删除、复制与粘贴操作</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c10_skill_61.html"><strong aria-hidden="true">10.2.</strong> 技巧61-深入理解Vim寄存器</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c10_skill_62.html"><strong aria-hidden="true">10.3.</strong> 技巧62-用寄存器中的内容替换高亮选区的内容</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c10_skill_63.html"><strong aria-hidden="true">10.4.</strong> 技巧63-把寄存器的内容粘贴出来</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c10_skill_64.html"><strong aria-hidden="true">10.5.</strong> 技巧64-与系统剪贴板进行交换</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">11.</strong> 第11章 宏</span></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c11_skill_65.html"><strong aria-hidden="true">11.1.</strong> 技巧65-宏的读取与执行</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c11_skill_66.html"><strong aria-hidden="true">11.2.</strong> 技巧66-规范光标位置、直达目标以及中止宏</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c11_skill_67.html"><strong aria-hidden="true">11.3.</strong> 技巧67-加次数回放宏</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c11_skill_68.html"><strong aria-hidden="true">11.4.</strong> 技巧68-在连续的文本行上重复修改</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c11_skill_69.html"><strong aria-hidden="true">11.5.</strong> 技巧69-给宏追加命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c11_skill_70.html"><strong aria-hidden="true">11.6.</strong> 技巧70-在一组文件中执行宏</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c11_skill_71.html"><strong aria-hidden="true">11.7.</strong> 技巧71-用迭代求值的方式给列表编号</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c11_skill_72.html"><strong aria-hidden="true">11.8.</strong> 技巧72-编辑宏的内容</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">12.</strong> 第12章 按模式匹配以及按原义匹配</span></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c12_skill_73.html"><strong aria-hidden="true">12.1.</strong> 技巧73-调整查找模式的大小写敏感性</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c12_skill_74.html"><strong aria-hidden="true">12.2.</strong> 技巧74-按正则表达式查找时，使用&#92;v模式开关</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c12_skill_75.html"><strong aria-hidden="true">12.3.</strong> 技巧75-按原义查找文本时，使用&#92;V原义开关</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c12_skill_76.html"><strong aria-hidden="true">12.4.</strong> 技巧76-使用圆括号捕获子匹配</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c12_skill_77.html"><strong aria-hidden="true">12.5.</strong> 技巧77-界定单词的边界</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c12_skill_78.html"><strong aria-hidden="true">12.6.</strong> 技巧78-界定匹配的边界</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c12_skill_79.html"><strong aria-hidden="true">12.7.</strong> 技巧79-转义问题字符</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">13.</strong> 第13章 查找</span></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c13_skill_80.html"><strong aria-hidden="true">13.1.</strong> 技巧80-结识查找命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c13_skill_81.html"><strong aria-hidden="true">13.2.</strong> 技巧81-高亮查找匹配</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c13_skill_82.html"><strong aria-hidden="true">13.3.</strong> 技巧82-在执行前查找当前预览第一处匹配</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c13_skill_83.html"><strong aria-hidden="true">13.4.</strong> 技巧83-将光标偏移到查找匹配的结尾</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c13_skill_84.html"><strong aria-hidden="true">13.5.</strong> 技巧84-对完整的查找匹配进行操作</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c13_skill_85.html"><strong aria-hidden="true">13.6.</strong> 技巧85-利用查找历史，迭代完成复杂的模式</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c13_skill_86.html"><strong aria-hidden="true">13.7.</strong> 技巧86-统计当前模式的匹配个数</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c13_skill_87.html"><strong aria-hidden="true">13.8.</strong> 技巧87-查找当前高亮选区中的文本</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">14.</strong> 第14章 替换</span></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c14_skill_88.html"><strong aria-hidden="true">14.1.</strong> 技巧88-认识substitute命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c14_skill_89.html"><strong aria-hidden="true">14.2.</strong> 技巧89-在文件范围内查找并替换每一处匹配</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c14_skill_90.html"><strong aria-hidden="true">14.3.</strong> 技巧90-手动控制每一次替换操作</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c14_skill_91.html"><strong aria-hidden="true">14.4.</strong> 技巧91-重用上次的查找模式</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c14_skill_92.html"><strong aria-hidden="true">14.5.</strong> 技巧92-用寄存器的内容替换</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c14_skill_93.html"><strong aria-hidden="true">14.6.</strong> 技巧93-重复上一次substitute命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c14_skill_94.html"><strong aria-hidden="true">14.7.</strong> 技巧94-使用子匹配重排CSV文件的字段</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c14_skill_95.html"><strong aria-hidden="true">14.8.</strong> 技巧95-在替换过程中执行算术运算</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c14_skill_96.html"><strong aria-hidden="true">14.9.</strong> 技巧96-交换两个或更多的单词</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c14_skill_97.html"><strong aria-hidden="true">14.10.</strong> 技巧97-在多个文件中执行查找与替换</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">15.</strong> 第15章 global命令</span></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c15_skill_98.html"><strong aria-hidden="true">15.1.</strong> 技巧98-认识global命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c15_skill_99.html"><strong aria-hidden="true">15.2.</strong> 技巧99-删除所有包含模式的文本行</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c15_skill_100.html"><strong aria-hidden="true">15.3.</strong> 技巧100-将TODO项收集至寄存器</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c15_skill_101.html"><strong aria-hidden="true">15.4.</strong> 技巧101 将CSS文件中所有规则的属性按字母排序</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">16.</strong> 第16章 通过ctags建立索引，并用其浏览源代码</span></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c16_skill_102.html"><strong aria-hidden="true">16.1.</strong> 技巧102-认识ctags</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c16_skill_103.html"><strong aria-hidden="true">16.2.</strong> 技巧103-配置Vim使用ctags</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c16_skill_104.html"><strong aria-hidden="true">16.3.</strong> 技巧104-使用Vim的标签跳转命令，浏览关键字的定义</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">17.</strong> 第17章 编译代码，并通过Quickfix列表浏览错误信息</span></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c17_skill_105.html"><strong aria-hidden="true">17.1.</strong> 技巧105-不用离开Vim也能编译代码</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c17_skill_106.html"><strong aria-hidden="true">17.2.</strong> 技巧106-浏览Quickfix列表</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c17_skill_107.html"><strong aria-hidden="true">17.3.</strong> 技巧107-回溯以前的Quickfix列表</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c17_skill_108.html"><strong aria-hidden="true">17.4.</strong> 技巧108-定制外部编译器</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">18.</strong> 第18章 通过grep、vimgrep以及其他工具对整个工程进行查找</span></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c18_skill_109.html"><strong aria-hidden="true">18.1.</strong> 技巧109-不必离开Vim也能调用grep</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c18_skill_110.html"><strong aria-hidden="true">18.2.</strong> 技巧110-定制grep程序</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c18_skill_111.html"><strong aria-hidden="true">18.3.</strong> 技巧111-使用Vim内置的正则表达式引擎的Grep</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">19.</strong> 第19章 自动补全</span></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c19_skill_112.html"><strong aria-hidden="true">19.1.</strong> 技巧112-认识Vim的关键字自动补全</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c19_skill_113.html"><strong aria-hidden="true">19.2.</strong> 技巧113-与自动补全的弹出式菜单进行交互</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c19_skill_114.html"><strong aria-hidden="true">19.3.</strong> 技巧114-掌握关键字的来龙去脉</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c19_skill_115.html"><strong aria-hidden="true">19.4.</strong> 技巧115-使用字典中的单词进行自动补全</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c19_skill_116.html"><strong aria-hidden="true">19.5.</strong> 技巧116-自动补全整行文本</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c19_skill_117.html"><strong aria-hidden="true">19.6.</strong> 技巧117-自动补全单词序列</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c19_skill_118.html"><strong aria-hidden="true">19.7.</strong> 技巧118-自动补全文件名</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c19_skill_119.html"><strong aria-hidden="true">19.8.</strong> 技巧119-根据上下文自动补全</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">20.</strong> 第20章 利用Vim的拼写检查器，查找并更正拼写错误</span></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c20_skill_120.html"><strong aria-hidden="true">20.1.</strong> 技巧120-对你的工作进行拼写检查</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c20_skill_121.html"><strong aria-hidden="true">20.2.</strong> 技巧121-使用其他拼写字典</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c20_skill_122.html"><strong aria-hidden="true">20.3.</strong> 技巧122-将单词添加到拼写文件中</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="practical_vim/c20_skill_123.html"><strong aria-hidden="true">20.4.</strong> 技巧123-在插入模式下更正拼写错误</a></span></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            if (link.href === current_page
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                const clientRect = e.target.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                sessionStorage.setItem('sidebar-scroll-offset', clientRect.top - sidebarRect.top);
            }
        }, { passive: true });
        const sidebarScrollOffset = sessionStorage.getItem('sidebar-scroll-offset');
        sessionStorage.removeItem('sidebar-scroll-offset');
        if (sidebarScrollOffset !== null) {
            // preserve sidebar scroll position when navigating via links within sidebar
            const activeSection = this.querySelector('.active');
            if (activeSection) {
                const clientRect = activeSection.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                const currentOffset = clientRect.top - sidebarRect.top;
                this.scrollTop += currentOffset - parseFloat(sidebarScrollOffset);
            }
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);


// ---------------------------------------------------------------------------
// Support for dynamically adding headers to the sidebar.

(function() {
    // This is used to detect which direction the page has scrolled since the
    // last scroll event.
    let lastKnownScrollPosition = 0;
    // This is the threshold in px from the top of the screen where it will
    // consider a header the "current" header when scrolling down.
    const defaultDownThreshold = 150;
    // Same as defaultDownThreshold, except when scrolling up.
    const defaultUpThreshold = 300;
    // The threshold is a virtual horizontal line on the screen where it
    // considers the "current" header to be above the line. The threshold is
    // modified dynamically to handle headers that are near the bottom of the
    // screen, and to slightly offset the behavior when scrolling up vs down.
    let threshold = defaultDownThreshold;
    // This is used to disable updates while scrolling. This is needed when
    // clicking the header in the sidebar, which triggers a scroll event. It
    // is somewhat finicky to detect when the scroll has finished, so this
    // uses a relatively dumb system of disabling scroll updates for a short
    // time after the click.
    let disableScroll = false;
    // Array of header elements on the page.
    let headers;
    // Array of li elements that are initially collapsed headers in the sidebar.
    // I'm not sure why eslint seems to have a false positive here.
    // eslint-disable-next-line prefer-const
    let headerToggles = [];
    // This is a debugging tool for the threshold which you can enable in the console.
    let thresholdDebug = false;

    // Updates the threshold based on the scroll position.
    function updateThreshold() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // The number of pixels below the viewport, at most documentHeight.
        // This is used to push the threshold down to the bottom of the page
        // as the user scrolls towards the bottom.
        const pixelsBelow = Math.max(0, documentHeight - (scrollTop + windowHeight));
        // The number of pixels above the viewport, at least defaultDownThreshold.
        // Similar to pixelsBelow, this is used to push the threshold back towards
        // the top when reaching the top of the page.
        const pixelsAbove = Math.max(0, defaultDownThreshold - scrollTop);
        // How much the threshold should be offset once it gets close to the
        // bottom of the page.
        const bottomAdd = Math.max(0, windowHeight - pixelsBelow - defaultDownThreshold);
        let adjustedBottomAdd = bottomAdd;

        // Adjusts bottomAdd for a small document. The calculation above
        // assumes the document is at least twice the windowheight in size. If
        // it is less than that, then bottomAdd needs to be shrunk
        // proportional to the difference in size.
        if (documentHeight < windowHeight * 2) {
            const maxPixelsBelow = documentHeight - windowHeight;
            const t = 1 - pixelsBelow / Math.max(1, maxPixelsBelow);
            const clamp = Math.max(0, Math.min(1, t));
            adjustedBottomAdd *= clamp;
        }

        let scrollingDown = true;
        if (scrollTop < lastKnownScrollPosition) {
            scrollingDown = false;
        }

        if (scrollingDown) {
            // When scrolling down, move the threshold up towards the default
            // downwards threshold position. If near the bottom of the page,
            // adjustedBottomAdd will offset the threshold towards the bottom
            // of the page.
            const amountScrolledDown = scrollTop - lastKnownScrollPosition;
            const adjustedDefault = defaultDownThreshold + adjustedBottomAdd;
            threshold = Math.max(adjustedDefault, threshold - amountScrolledDown);
        } else {
            // When scrolling up, move the threshold down towards the default
            // upwards threshold position. If near the bottom of the page,
            // quickly transition the threshold back up where it normally
            // belongs.
            const amountScrolledUp = lastKnownScrollPosition - scrollTop;
            const adjustedDefault = defaultUpThreshold - pixelsAbove
                + Math.max(0, adjustedBottomAdd - defaultDownThreshold);
            threshold = Math.min(adjustedDefault, threshold + amountScrolledUp);
        }

        if (documentHeight <= windowHeight) {
            threshold = 0;
        }

        if (thresholdDebug) {
            const id = 'mdbook-threshold-debug-data';
            let data = document.getElementById(id);
            if (data === null) {
                data = document.createElement('div');
                data.id = id;
                data.style.cssText = `
                    position: fixed;
                    top: 50px;
                    right: 10px;
                    background-color: 0xeeeeee;
                    z-index: 9999;
                    pointer-events: none;
                `;
                document.body.appendChild(data);
            }
            data.innerHTML = `
                <table>
                  <tr><td>documentHeight</td><td>${documentHeight.toFixed(1)}</td></tr>
                  <tr><td>windowHeight</td><td>${windowHeight.toFixed(1)}</td></tr>
                  <tr><td>scrollTop</td><td>${scrollTop.toFixed(1)}</td></tr>
                  <tr><td>pixelsAbove</td><td>${pixelsAbove.toFixed(1)}</td></tr>
                  <tr><td>pixelsBelow</td><td>${pixelsBelow.toFixed(1)}</td></tr>
                  <tr><td>bottomAdd</td><td>${bottomAdd.toFixed(1)}</td></tr>
                  <tr><td>adjustedBottomAdd</td><td>${adjustedBottomAdd.toFixed(1)}</td></tr>
                  <tr><td>scrollingDown</td><td>${scrollingDown}</td></tr>
                  <tr><td>threshold</td><td>${threshold.toFixed(1)}</td></tr>
                </table>
            `;
            drawDebugLine();
        }

        lastKnownScrollPosition = scrollTop;
    }

    function drawDebugLine() {
        if (!document.body) {
            return;
        }
        const id = 'mdbook-threshold-debug-line';
        const existingLine = document.getElementById(id);
        if (existingLine) {
            existingLine.remove();
        }
        const line = document.createElement('div');
        line.id = id;
        line.style.cssText = `
            position: fixed;
            top: ${threshold}px;
            left: 0;
            width: 100vw;
            height: 2px;
            background-color: red;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(line);
    }

    function mdbookEnableThresholdDebug() {
        thresholdDebug = true;
        updateThreshold();
        drawDebugLine();
    }

    window.mdbookEnableThresholdDebug = mdbookEnableThresholdDebug;

    // Updates which headers in the sidebar should be expanded. If the current
    // header is inside a collapsed group, then it, and all its parents should
    // be expanded.
    function updateHeaderExpanded(currentA) {
        // Add expanded to all header-item li ancestors.
        let current = currentA.parentElement;
        while (current) {
            if (current.tagName === 'LI' && current.classList.contains('header-item')) {
                current.classList.add('expanded');
            }
            current = current.parentElement;
        }
    }

    // Updates which header is marked as the "current" header in the sidebar.
    // This is done with a virtual Y threshold, where headers at or below
    // that line will be considered the current one.
    function updateCurrentHeader() {
        if (!headers || !headers.length) {
            return;
        }

        // Reset the classes, which will be rebuilt below.
        const els = document.getElementsByClassName('current-header');
        for (const el of els) {
            el.classList.remove('current-header');
        }
        for (const toggle of headerToggles) {
            toggle.classList.remove('expanded');
        }

        // Find the last header that is above the threshold.
        let lastHeader = null;
        for (const header of headers) {
            const rect = header.getBoundingClientRect();
            if (rect.top <= threshold) {
                lastHeader = header;
            } else {
                break;
            }
        }
        if (lastHeader === null) {
            lastHeader = headers[0];
            const rect = lastHeader.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top >= windowHeight) {
                return;
            }
        }

        // Get the anchor in the summary.
        const href = '#' + lastHeader.id;
        const a = [...document.querySelectorAll('.header-in-summary')]
            .find(element => element.getAttribute('href') === href);
        if (!a) {
            return;
        }

        a.classList.add('current-header');

        updateHeaderExpanded(a);
    }

    // Updates which header is "current" based on the threshold line.
    function reloadCurrentHeader() {
        if (disableScroll) {
            return;
        }
        updateThreshold();
        updateCurrentHeader();
    }


    // When clicking on a header in the sidebar, this adjusts the threshold so
    // that it is located next to the header. This is so that header becomes
    // "current".
    function headerThresholdClick(event) {
        // See disableScroll description why this is done.
        disableScroll = true;
        setTimeout(() => {
            disableScroll = false;
        }, 100);
        // requestAnimationFrame is used to delay the update of the "current"
        // header until after the scroll is done, and the header is in the new
        // position.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Closest is needed because if it has child elements like <code>.
                const a = event.target.closest('a');
                const href = a.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    threshold = targetElement.getBoundingClientRect().bottom;
                    updateCurrentHeader();
                }
            });
        });
    }

    // Takes the nodes from the given head and copies them over to the
    // destination, along with some filtering.
    function filterHeader(source, dest) {
        const clone = source.cloneNode(true);
        clone.querySelectorAll('mark').forEach(mark => {
            mark.replaceWith(...mark.childNodes);
        });
        dest.append(...clone.childNodes);
    }

    // Scans page for headers and adds them to the sidebar.
    document.addEventListener('DOMContentLoaded', function() {
        const activeSection = document.querySelector('#mdbook-sidebar .active');
        if (activeSection === null) {
            return;
        }

        const main = document.getElementsByTagName('main')[0];
        headers = Array.from(main.querySelectorAll('h2, h3, h4, h5, h6'))
            .filter(h => h.id !== '' && h.children.length && h.children[0].tagName === 'A');

        if (headers.length === 0) {
            return;
        }

        // Build a tree of headers in the sidebar.

        const stack = [];

        const firstLevel = parseInt(headers[0].tagName.charAt(1));
        for (let i = 1; i < firstLevel; i++) {
            const ol = document.createElement('ol');
            ol.classList.add('section');
            if (stack.length > 0) {
                stack[stack.length - 1].ol.appendChild(ol);
            }
            stack.push({level: i + 1, ol: ol});
        }

        // The level where it will start folding deeply nested headers.
        const foldLevel = 3;

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const level = parseInt(header.tagName.charAt(1));

            const currentLevel = stack[stack.length - 1].level;
            if (level > currentLevel) {
                // Begin nesting to this level.
                for (let nextLevel = currentLevel + 1; nextLevel <= level; nextLevel++) {
                    const ol = document.createElement('ol');
                    ol.classList.add('section');
                    const last = stack[stack.length - 1];
                    const lastChild = last.ol.lastChild;
                    // Handle the case where jumping more than one nesting
                    // level, which doesn't have a list item to place this new
                    // list inside of.
                    if (lastChild) {
                        lastChild.appendChild(ol);
                    } else {
                        last.ol.appendChild(ol);
                    }
                    stack.push({level: nextLevel, ol: ol});
                }
            } else if (level < currentLevel) {
                while (stack.length > 1 && stack[stack.length - 1].level > level) {
                    stack.pop();
                }
            }

            const li = document.createElement('li');
            li.classList.add('header-item');
            li.classList.add('expanded');
            if (level < foldLevel) {
                li.classList.add('expanded');
            }
            const span = document.createElement('span');
            span.classList.add('chapter-link-wrapper');
            const a = document.createElement('a');
            span.appendChild(a);
            a.href = '#' + header.id;
            a.classList.add('header-in-summary');
            filterHeader(header.children[0], a);
            a.addEventListener('click', headerThresholdClick);
            const nextHeader = headers[i + 1];
            if (nextHeader !== undefined) {
                const nextLevel = parseInt(nextHeader.tagName.charAt(1));
                if (nextLevel > level && level >= foldLevel) {
                    const toggle = document.createElement('a');
                    toggle.classList.add('chapter-fold-toggle');
                    toggle.classList.add('header-toggle');
                    toggle.addEventListener('click', () => {
                        li.classList.toggle('expanded');
                    });
                    const toggleDiv = document.createElement('div');
                    toggleDiv.textContent = '❱';
                    toggle.appendChild(toggleDiv);
                    span.appendChild(toggle);
                    headerToggles.push(li);
                }
            }
            li.appendChild(span);

            const currentParent = stack[stack.length - 1];
            currentParent.ol.appendChild(li);
        }

        const onThisPage = document.createElement('div');
        onThisPage.classList.add('on-this-page');
        onThisPage.append(stack[0].ol);
        const activeItemSpan = activeSection.parentElement;
        activeItemSpan.after(onThisPage);
    });

    document.addEventListener('DOMContentLoaded', reloadCurrentHeader);
    document.addEventListener('scroll', reloadCurrentHeader, { passive: true });
})();

