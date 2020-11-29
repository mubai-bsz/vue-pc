<template>
  <div class="footer">
    <ul class="footer-ul">
      <li>关于我们</li>
      <li>联系我们</li>
      <li>联系我们</li>
      <li>联系客服</li>
      <li>商家入驻</li>
      <li>营销中心</li>
      <li>手机尚品汇</li>
      <li>销售联盟</li>
      <li>尚品汇社区</li>
    </ul>
    <span>地址：北京市昌平区宏福科技园综合楼6层</span>
    <span>京ICP备19006430号</span>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="less" scoped>
.footer {
  width: 1200px;
  margin: 0 auto;
}

.footer-ul {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}
.footer-ul li {
  padding: 0 20px;
  border-right: 1px solid #999;
}
.footer-ul li :nth-of-type(9) {
  border: none;
}
span {
  display: block;
  line-height: 24px;
  height: 24px;
  text-align: center;
}
</style>
