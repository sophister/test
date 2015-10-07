# 目录说明

## TODO LIST

- status字段含义确认
- 移动端新增三个接口
- 原接口和pc一致性确认
- 宝箱背景圆切割，样式重新调整
- 重新模拟数据

## static 

> 存放静态资源文件

## components

> 基于requirejs的组件，每个UI组件包含自个的html js less css等文件

- **text.js** 用于异步加载html文件
- **css.js** 用于异步加载css文件

## event

> 该目录下为临时的原PC端模拟数据，且路径和实际请求的接口地址稍有差异，联调时需要修改代码中的路径

## five_annual

> 该目录下为移动端接口模拟数据

### 移动端接口反馈

- 目前代码中每个请求的URL都带有".json"结尾，联调时候需要去掉
- "/five_annual/lottery_today_info"接口中缺少"lotteryIndex"字段，需要补充（暂时模拟加上）
- "/five_annual/lottery_card"的"lotteryResult"字段值为数字（之前是字母），有八种情况，分别表示不同含义
- "/five_annual/lottery_card"的"lotteryIndex"为0和2时表示礼包和红包，应该如何展示
- 缺少查询用户收集的文字接口
- 缺少查询获奖名单的接口（宝箱和卡牌轮播获奖名单部分）
- 缺少查询用户收货地址接口（点击修改地址按钮时使用，将返回的信息填写在表单中供用户修改）
- finished：查询用户收集文字接口的异常情况兼容性处理（pc端）
- "/five_annual/show_box"的"box"字段，在pc为"boxCode"，此处暂时按目前移动端的接口为准（目测需要修改统一）
- "/five_annual/open_box"接口缺少"lotteryResult"字段
- "/five_annual/leader_board"接口缺少"myrank"字段（我的排名），且"board_list"内缺少"amount"字段