# 架构设计

这文档来阐述该插件是如何工作的。它的目的是帮助大家理解代码，理解插件是如何工作的，并希望使大家能够参与到插件的开发。

## 概览

Taro 在 3.1 版本提出了开放式架构的思想，让开发者可以通过编写插件来支持一个新的平台。

> 阅读文档了解更多：https://taro-docs.jd.com/taro/blog/2021-03-10-taro-3-1-lts#1-%E5%BC%80%E6%94%BE%E5%BC%8F%E6%9E%B6%E6%9E%84

该项目就是通过编写 Taro 插件，将 React 生态中知名框架 Next.js 作为 Taro 的一个目标平台，以此让 Taro 能够支持 Pre-rendering、SSR 和 ISR。

插件的工作可以分为两个主要阶段：生成 Next.js 项目和适配 Taro 项目代码。

### 生成 Next.js 项目

### 适配 Taro 代码