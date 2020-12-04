<template>
  <div class="pagination">
    <button>上一页</button>
    <button class="active">1</button>
    <button>2</button>
    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>下一页</button>
    <button>总数：xxx</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    // 当前页
    currentPage: {
      type: Number,
      default: 1, //默认值 1
    },

    // 显示按钮的数量
    paperCount: {
      type: Number,
      // 需要进行验证的，大于等于5 小于等于21 并且为奇数才可以
      // 返回true验证成功
      // 返回false验证失败
      validator(val) {
        return val >= 5 && val <= 21 && val % 2 === 1;
      },
    },
    // 每页条数
    pageSize: {
      tyep: Number,
      deafault: 10,
    },
    // 总数
    total: {
      type: Number,
      required: true,
    },
  },

  // 计算当前页、每页的值
  computed:{
    
  }
};
</script>

<style  lang="less" scoped>
.pagination {
  display: flex;
  white-space: nowrap;
  font-weight: 700;
  button {
    margin: 0 5px;
    padding: 0 4px;
    font-size: 13px;
    min-width: 30px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: none;
    outline: none;
    display: block;
    background-color: #f4f4f5;
    color: #606266;
    border-radius: 2px;
  }
}

button.active {
  background-color: #409eff;
  color: #fff;
}
</style>