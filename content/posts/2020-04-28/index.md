---
title: Github Actionsでブログのlintチェックしてみた
description:
date: 2020-04-28T22:03:23+09:00
tags: ["blog", "ci/cd"]
categories: ["tech"]
draft: false
---

## はじめに

Githubでブログを運用していくにあたって、複数人でブログをはじめとしたドキュメントを運用する際に必要となるmarkdown記法の統一や日本語の表現の統一などを意識したかったので、lintツールを導入してみました。
このブログは個人で運用していくものですが、未来の自分との表現の揺れは発生しうるので。

## Github Actions とは

Github ActionsとはGithubに組み込まれているCI, CDワークフローを駆動するCI/CDシステムです。
2018年10月のGithub Universeで「ワークフロー自動化機能」としてGithub Actionsがベータ版として発表されました。
そして、2019年８月にはGithub ActionsはCI/CDをサポートしました。Windows, Linux, macOSなどのプラットフォームでアクションを実行でき、設定ファイルの記述方法もHCLからYAMLに変更されました。
2019年11月のGithub UniverseでGithub ActiosはGAされました。

## 使用したツールについて

以下のツールをGithub Actionsでpush, pull_request時に実行しています。

### 1. [markdownlint](https://github.com/DavidAnson/markdownlint)

* Markdown/CommonMark file用のスタイルチェッカー/Lintツール

### 2. [markdown-link-check](https://github.com/tcort/markdown-link-check)

* Markdownテキスト内の全てのハイパーリンクの有効性を確認するツール

### 3. [textlint](https://github.com/textlint/textlint)

* テキストLintツール

## ツールに設定したルールについて

以下のルールを各ツールに設定しています。

### 1. markdownlint

.markdownlintrc.jsonにルールの記述をしています。


markdownlintの設定値については[ここ](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md)に記載があります。

### 2. mark-down-link-check

特に設定はしていません。

### 3. textlint

以下のツールを使用しています。

* [textlint-rule-preset-ja-technical-writing](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing)
  * 日本語の技術文書向けのtextlintルールプリセット

.textlintrc内にルールの記載をしています。

textlint-rule-preset-ja -technical-writingの設定値については[ここ](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing#%E3%83%AB%E3%83%BC%E3%83%AB%E4%B8%80%E8%A6%A7)に記載があります。

## 実現方法

以下の手順で実現してます。

1. 各ツールを[yarn](https://classic.yarnpkg.com/en)で追加
1. package.jsonにスクリプトを記述
1. Github Actionsから記述したスクリプトを実行

### Github Actions 設定内容について

.github/workflows/main.ymlは以下のように設定しています。

```yaml
name: main

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:
    runs-on: macOS-latest

    steps:
    - uses: actions/checkout@v2

    - name: Cache node_modules
      uses: actions/cache@v1
      with:
        path: ~/.cache/yarn
        key: ${{ runner.os }}-blog

    - name: Install packages
      if: steps.cache.outputs.cache-hit != 'true'
      run: yarn install

    - name: Run markdownlint
      run: yarn check:lint:md

    - name: Run textlint
      run: yarn check:lint:text

    - name: Run markdown-link-check
      run: yarn check:link
```

## まとめ

Github Actionsでブログのlintチェックを導入してみました。
複数人でドキュメント運用するとルールの締め付けが心配になる今日この頃ですが、個人ブログだと都合のいいように設定していけるので、実験の場として色々試していきたいです。
