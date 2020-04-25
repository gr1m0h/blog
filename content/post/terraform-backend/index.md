---
title: "Terraform backend の管理"
description: Terraform backend を S3(+DynamoDB) で作成した時の管理について紹介します
date: 2019-10-06T22:03:23+09:00
lastmod: 2020-02-01T22:03:23+09:00
tags: ["Terraform", "AWS"]
categories: ["tech"]
draft: false
---

## Terraform backend について

Terraform は、構成要素の状態を保存するために、tfstateファイルを生成します。<br>
Terraform では、このtfstateファイルとHCL(*.tf)で記述されたコードの内容に差分があれば、それに応じて、その差分のみを更新するように振る舞います。<br>

このtfstateファイルは、バージョン管理システム(e.g. Github)で保存することは良くないとされています。それは、以下の理由からです。

1. tfstateファイルの追従
	* 以下のようなミスよって、期限切れのtfstateファイルで適用してしまう危険性がある
		* バージョン管理システムへPushし忘れ
			* local に最新のtfstateファイルを持ったままの状態
		* 2人以上のメンバーが同じtfstateファイルで同時に実行することによる競合
			* バージョン管理システムの多くは、2人のメンバーが同じtfstateファイルで同時に実行することを防ぐロック([State Locking](https://www.terraform.io/docs/state/locking.html))を提供していない
1. 秘匿情報
	* tfstateファイルはプレーンテキストで情報を保持するので、リソースの秘匿情報が記載されてしまう
		* e.g. DBのパスワード

以上の問題から、backendリソースを使用して、tfstateファイルを外部のストレージに保存します。ここでは、AWSを使用するため、S3(tfstateファイルの保存、暗号化)+DynamoDB(State Locking)をbackendに指定します。S3のバケットはバージョニング設定ができるため、より安全な管理が行えます。<br>

## Terraform backend の管理

Terraform backend は、`terraform init`時に必要となります。その為、Terraform で管理するには、AWS上に事前に作成しておき、Terraform にimportする方法が考えられます。また、外部ストレージとなるS3をTerraform で管理しているAWSアカウント上で管理することが考えられますが、公式では推奨していません。[^1]<br>
後者については、別のAWSアカウントでTerraform backend を管理することが考えられますが、前者については、Terraform で管理すると、Terraform backend を管理するための Terraform の Terraform backend について考えなければならなくなり、堂々巡りに陥ってしまったので、CloudFormation を使用して管理することにしました。

[grimoh/terraform-backend-setup-scripts](https://github.com/grimoh/terraform-backend-setup-scripts)

上記のスクリプトを使用すれば、CloudFormationスタック名、S3バケット名、DynamoDBテーブル名を指定することで、Terraform backend 用のS3、DynamoDBを作成することができます。

[^1]: https://www.terraform.io/docs/backends/types/s3.html
