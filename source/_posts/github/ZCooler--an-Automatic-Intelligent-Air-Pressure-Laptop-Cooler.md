---
title: "ZCooler 智能笔记本风压式散热器"
date: 2025-09-19 12:00:00
categories:
  - GitHub项目
tags: ["ESP32", "Arduino", "GitHub"]
permalink: projects/ZCooler--an-Automatic-Intelligent-Air-Pressure-Laptop-Cooler/
cover: /img/covers/github/ZCooler--an-Automatic-Intelligent-Air-Pressure-Laptop-Cooler.svg
description: "能够自动运行的智能笔记本风压式散热器，基于esp32设计，可通过蓝牙与电脑通信并进行自动开关和参数调节。本开源为电脑程序、单片机程序部分，PCB设计请移步至嘉立创开源平台，机械建模设计请移步至Bamboo Lab 能够自动运行的智能笔记本…"
top_img: /img/top-plain.png
toc: true
---
> 仓库：[ZCooler--an-Automatic-Intelligent-Air-Pressure-Laptop-Cooler](https://github.com/TATZhaohn/ZCooler--an-Automatic-Intelligent-Air-Pressure-Laptop-Cooler) · 语言 **-** · ⭐ **17** · 更新于 2025-09-19

<img src="/img/covers/github/ZCooler--an-Automatic-Intelligent-Air-Pressure-Laptop-Cooler.svg" alt="ZCooler 智能笔记本风压式散热器" style="width:100%;border-radius:10px">

## 这是什么

**ZCooler** 是一个能自动运行的智能笔记本风压式散热器：ESP32 主控搭配涡轮风扇与风压风道，根据机身温度自动调节转速，支持蓝牙与手机端联动。

## 硬件组成

- ESP32 主控（蓝牙 BLE 通信）
- 涡轮风扇 + 定向风压风道
- 温度传感器实时采集

## 相关工程

- 结构件（3D 打印）：MakerWorld 搜索 `ZCooler`

- PCB / 开源工程：嘉立创 OSHUB

## 为什么做这个

市面上的散热器大多是「一直全速转」或者手动调档，噪音和效率都不理想。用 ESP32 让风扇跟着温度走，既能压住温度又不用一直听风扇嚎。

## 相关链接

- 🔗 [GitHub 仓库](https://github.com/TATZhaohn/ZCooler--an-Automatic-Intelligent-Air-Pressure-Laptop-Cooler)