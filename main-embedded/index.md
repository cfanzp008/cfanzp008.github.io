# 嵌入式开发

# 嵌入式开发
## 知识结构图
```
{{< mermaid >}}
graph LR
  1[嵌入式开发]-->1.1[编程基础]
  1-->1.2[嵌入式系统]
  1-->1.3[硬件设计]
  1-->1.4[焊接技术]
  1-->1.5[行业应用]

  1.1-->1.1.1[C语言]
{{< /mermaid >}}
```

### 嵌入式系统
```
{{< mermaid >}}
graph LR
  1.2[嵌入式系统]-->1.2.1[FPGA]
  1.2-->1.2.2[ARM]
  1.2-->1.2.3[实时系统]
  1.2-->1.2.4[通讯协议]
  1.2-->1.2.5[外设]
  1.2.5-->a[存储]
  a-->a1[spi flash]
  a-->a2[eeprom]
  a-->a3[nandflash]
  a-->a4[norflash]
  a-->a5[sdio]

  1.2.5-->b[音频]
  1.2.5-->c[视频]
  1.2.5-->d[传感器]

  1.2-->1.2.6[接口协议]
  1.2-->1.2.7[硬件基础]
  1.2-->1.2.8[单片机]

{{< /mermaid >}}
```


### 单片机
```
{{< mermaid >}}
graph LR
  1[单片机]-->1.1[分类]
  1.1-->1.1.1[51单片机]
  1.1-->1.1.2[AVR]
  1.1-->1.1.3[STM32]

  1[单片机]-->1.2[外设]
  1.2-->1.2.1[GPIO]
  1.2-->1.2.2[外部中断]
  1.2-->1.2.3[定时器]
  1.2-->1.2.4[看门狗]
  1.2-->1.2.5[Flash]
  1.2-->1.2.6[DAC]
  1.2-->1.2.7[ADC]
  1.2-->1.2.8[EEPROM]

{{< /mermaid >}}
```


## 参考
- https://blog.csdn.net/u010632165/article/details/111564304


---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/main-embedded/  

