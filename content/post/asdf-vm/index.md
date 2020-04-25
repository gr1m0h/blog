---
title: asdf-vm を使用したバージョン管理
description: asdf-vm(asdf version manager)を使用したバージョン管理について紹介します
date: 2019-07-18
date: 2019-07-18T22:03:23+09:00
lastmod: 2020-02-01T22:03:23+09:00
tags: ["asdf-vm"]
categories: ["tech"]
draft: false
---

## asdf-vm とは

asdf-vm(以下asdf)は、バージョン管理ツールです。

使い方がシンプルで、いろんな言語に使えるため、重宝しています。また、プラグイン作成が簡単なので、普段自分が使用している言語が無いなと思っても、プラグインを作成、バージョン管理ができてしまいます。

公式には[これら](https://asdf-vm.com/#/plugins-all?id=plugin-list)の言語をプラグインとしていますが、プラグイン作成ガイドラインに則ってプラグインを作成することで、自分で作ったプラグインを公式のプラグインとして追加してもらうことも可能です。

個人的にも、負荷試験ツールであるloadimpact/k6の[プラグイン](https://github.com/grimoh117/asdf-k6)や、catをシンタックスハイライト出来るようにしたccatの[プラグイン](https://github.com/grimoh117/asdf-ccat)を作成しています。

## How to use asdf-vm

asdf-vmの使い方について簡単に説明します。

### Install asdf-vm

まず、asdf-vm自体の導入です。公式の手順[^1]を参照するのが良いでしょう。

以下は、`Bash on macOS` の場合です。

```sh
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.7.3

echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bash_profile
echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bash_profile
```

個人的な[dotfiles](https://github.com/grimoh117/dotfiles)にもasdf-vmを導入する手順が含まれているので、参考にしてみても良いかもしれません。

### Add plugin

ここからは、↑で紹介したloadimpact/k6を例にして紹介します。<br>
loadimpact/k6のプラグインを追加します。

```sh
asdf plugin-add k6 https://github.com/grimoh117/asdf-k6.git
```

公式のプラグインの場合、インストールもとのURLが不要となります。

### Remove plugin

loadimpact/k6のプラグインをアンインストールします。

```sh
asdf plugin-remove k6
```

### List all available versions

loadimpact/k6のプラグインを使用してインストール可能なバージョンの一覧を表示します。<br>
この中から使用するバージョンを選択し、インストールして使用します。

```sh
asdf list-all k6
```

### Install version

loadimpact/k6の0.24.0をインストールしてみます。<br>
インストールを行ってもパスが通っているわけでは無いので、使用することはできません。

```sh
asdf install k6 0.24.0
```

### Uninstall version

loadimpact/k6の0.24.0をアンインストールしてみます。

```sh
asdf uninstall k6 0.24.0
```

### Set current version

global設定で全環境で使用するバージョンを固定します。

```sh
asdf global k6 0.24.0
```

このバージョンの指定を行うことで、使用することができるようになります。

local設定で今いるディレクトリ内で使用するバージョンを固定します。

```sh
asdf local k6 0.24.0
```

## プラグインの作成

プラグインの作成方法についてです。プラグイン作成ガイドライン[^2]を参照するのが良いでしょう。

プラグインは、他の言語やツールのバージョン管理をサポートするための、いくつかの実行可能スクリプトを含むgitリポジトリです。含まれるスクリプトについて簡単に紹介します。

### Required scripts

必要なスクリプトとしては以下があります。

* bin/list-all
	* インストール可能なすべてのバージョンを一覧表示します
* bin/install
	* 指定されたバージョンをインストールします

### Optional scripts

任意で追加できるスクリプトとしては以下があります。

* bin/list-bin-path
	* 指定されたバージョンのツールの実行可能ファイルを一覧表示します
* bin/exec-env
	* パッケージ内のバイナリを実行するようにenvを設定します
* bin/exec-path
	* 指定されたバージョンのツールの実行可能パスを取得します
* bin/uninstall
	* 特定のバージョンのツールをアンインストールします
* bin/parse-legacy-file
	* このプラグイン用の追加の設定ファイルを登録します

## まとめ

簡単にですが、asdf-vmの使用方法とプラグインの作成方法について記載してみました。
asdf-vmのプラグインはシェルスクリプトで簡単に作成できるので、作ってみると面白いと思います。
最後まで、ありがとうございました。

[^1]: [asdf-vm install](https://asdf-vm.com/#/core-manage-asdf-vm?id=install-asdf-vm)
[^2]: [asdf-vm creating plugins](https://asdf-vm.com/#/plugins-create)
