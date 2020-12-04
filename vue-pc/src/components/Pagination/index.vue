<template>
  <div class="pagination">
    <button
      :disabled="myCurrentPage <= 1"
      @click="setCurrentPage(myCurrentPage - 1)"
    >
      上一页
    </button>
    <button :class="{ active: myCurrentPage === 1 }" @click="setCurrentPage(1)">
      1
    </button>
    <button v-show="startEnd.start > 2">...</button>
    <button
      v-for="item in mapBtnsCount"
      :key="item"
      @click="setCurrentPage(startEnd.start + item - 1)"
      :class="{ active: myCurrentPage === startEnd.start + item - 1 }"
    >
      {{ startEnd.start + item - 1 }}
    </button>

    <!-- <button
      v-for="item in mapBtnsCount"
      :key="item"
      @click="myCurrentPage(startEnd.start + item - 1)"
      :class="{ active: myCurrentPage === startEnd.start + item - 1 }"
    >
      {{ startEnd.start + item - 1 }}
    </button> -->

    <button v-show="startEnd.end < totalPage - 1">...</button>
    <button
      :class="{ active: myCurrentPage === totalPage }"
      v-show="totalPage > 1"
      @click="setCurrentPage(totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="myCurrentPage >= totalPage"
      @click="setCurrentPage(myCurrentPage + 1)"
    >
      下一页
    </button>
    <button>总数：{{ total }}</button>
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

    // 显示按钮的数量，这里一般是设置7条
    paperCount: {
      type: Number,
      // 需要进行验证的，大于等于5 小于等于21 并且为奇数才可以
      // 返回true验证成功
      // 返回false验证失败
      validator(val) {
        return val >= 5 && val <= 21 && val % 2 === 1;
      },
      default: 7,
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10,
    },
    // 总数
    total: {
      type: Number,
      // required: true,
      default: 0,
    },
  },
  // props中传递过来的数据不可以直接修改，需要在data中定义一个新的值来保存传递过来的数据
  data() {
    return {
      // 方便修改props中的currentPage
      myCurrentPage: this.currentPage,
    };
  },
  watch: {
    // 每次改变页面时更新数据
    myCurrentPage(currentPage) {
      this.$emit("current-change", currentPage);
    },
    // 当外面的页面发生变化时，里面的页面也要发生变化
    currentPage(currentPage) {
      this.currentPage = currentPage;
    },
  },

  // 计算当前页、每页的值
  computed: {
    // 页面中显示总按钮数:数据总数 / 每一页展示的数据
    // 如果相除有余数的话，需要向上取整，需要添加新的一页
    totalPage() {
      // console.log(this.total);
      return Math.ceil(this.total / this.pageSize);
    },

    // 中间按钮的开始和结束的值

    startEnd() {
      // 首先要先收集到需要用到的数据，如每页按钮的数量，当前页
      const { myCurrentPage, paperCount, totalPage } = this;
      /*  
        要知道显示在中间的按钮的开始和结束的值，首先需要知道中间一共有多少按钮，显示的总数 - 2 就是中间的按钮的值
        然后在依据中间按钮的总数，得到中间开始和结束的值
        情况1：
        1 ...  3 4 5 6 7 ... 10
        中间开始的值是3，计算方法：中间按钮想 / 2
    */
      // 中间总计的按钮数量,不包含开头和结尾
      const count = paperCount - 2;
      // 中间按钮数量的一半
      const halfCount = Math.floor(count / 2);

      // 定义开始 结尾
      let start, end;

      /* 
      start
          1. start = myCurrentPage - halfCount
            1...3 4 [5] 6 7...10
               3   =       5       -    2
            问题：
              1 [2] 3 4 5 6 ...10  
               0    =      2        -    2
            解决：修正start的值，不能小于1

            问题：
              1 ... 5 6 7 8 [9] 10  
              7  =   9  - 2
           
        end 
          2. end = start + count - 1
            1...3 4 [5] 6 7...10
               7   =  3  +  5 - 1
        当前页所在的几种情况：
        1 [2] 3 4 5 6 ... 10
        1 ... 3 4 [5] 6 7 ... 10
        1 ... 5 6 7 8 [9] 10 当前页大于总按钮数 - 按钮的一半
        1 [2] 3 
        [1]  --如果start大于总页数，不显示
        中间页默认是5
      */
      if (myCurrentPage > totalPage - halfCount) {
        start = totalPage - count;
      } else {
        start = myCurrentPage - halfCount;
      }
      if (start <= 1) {
        start = 2;
      }

      end = start + count - 1;
      if (end >= totalPage) {
        end = totalPage - 1;
      }
      // 返回计算结果
      return {
        start,
        end,
      };
    },
    // 需要遍历的按钮的数量,即中间按钮的数量
    mapBtnsCount() {
      const { start, end } = this.startEnd;
      const count = end - start + 1;
      return count >= 1 ? count : 0;
    },
  },
  methods: {
    setCurrentPage(currentPage) {
      this.myCurrentPage = currentPage;
      // console.log(this.myCurrentPage);
    },
  },
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