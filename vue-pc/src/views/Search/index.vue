<template>
  <div>
    <!-- 三分类列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!-- 已选商品类别 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="options.keyword" @click="delKeyword">
              关键词：{{ options.keyword }}<i>×</i>
            </li>
            <!-- 商品分类的显示 -->
            <li
              class="with-x"
              v-show="options.categoryName"
              @click="delCategoryName"
            >
              分类名称：{{ options.categoryName }}<i>×</i>
            </li>

            <li class="with-x" v-show="options.trademark" @click="delTrademark">
              品牌：{{ options.trademark.split(":")[1] }}<i>×</i>
            </li>

            <li
              class="with-x"
              v-for="(prop, index) in options.props"
              :key="prop"
              @click="delProp(index)"
            >
              {{ prop.split(":")[2] }} {{ prop.split(":")[1] }}
              <i>×</i>
            </li>
          </ul>
        </div>

        <!-- 选择的商品类别 -->
        <SearchSelector :addTrademark="addTrademark" @add-prop="addProp" />

        <!--商品列表导航-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOrder(1) }" @click="setOrder('1')">
                  <a
                    >综合<i
                      :class="{
                        iconfont: true,
                        'icon-jiantou-xia': isAllDown,
                        'icon-jiantou1': !isAllDown,
                      }"
                    ></i
                  ></a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <!-- 实现按钮的切换 ，如果order是以2开头的话，就返回2的下标，如果不是，则返回-1 -->
                <li :class="{ active: isOrder(2) }" @click="setOrder('2')">
                  <a
                    >价格
                    <span>
                      <i
                        :class="{
                          iconfont: true,
                          'icon-jiantou2': true,
                          deactive: isOrder(2) && isPriceDown,
                        }"
                      ></i>

                      <i
                        :class="{
                          iconfont: true,
                          'icon-jiantouarrow486': true,
                          deactive: isOrder(2) && !isPriceDown,
                        }"
                      ></i>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="goodList in goodsList"
                :key="goodList.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goodList.id}`"
                      ><img :src="goodList.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goodList.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${goodList.id}`">{{
                      goodList.title
                    }}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            @current-change="handleCurrentChange"
            :currnet-page="options.pageNo"
            :paper-count="7"
            :paper-size="5"
            :total="total"
          />
          <!-- <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="options.pageNo"
            :page-size="options.pageSize"
            layout=" prev, pager, next,sizes,total"
            :page-sizes="[5, 10, 15, 20]"
            :total="total"
          >
          </el-pagination> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypeNav from "@comps/TypeNav";
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapActions } from "vuex";
import Pagination from "@comps/Pagination";

export default {
  name: "Search",
  data() {
    return {
      options: {
        category1Id: "", // 商品一级分类
        category2Id: "", // 商品二级分类
        category3Id: "", // 商品三级分类
        categoryName: "", // 商品分类名
        keyword: "", // 搜索关键字
        order: "1:desc", // 排序方式  1：综合排序  2：价格排序 acs：升序  desc：降序
        pageNo: 1, // 分页的页码（第几页）
        pageSize: 5, //每一页展示的数据
        props: [], // 商品属性
        trademark: "", // 品牌
        total: "",
      },
      isAllDown: true, //综合排序
      isPriceDown: false, //价格排序
    };
  },
  watch: {
    $route() {
      this.updataProductList();
    },
  },
  computed: {
    ...mapGetters(["goodsList", "total"]),
  },
  methods: {
    ...mapActions(["getProductList"]),
    // 定义更新商品的方法
    // 这个方法一上来就要触发一次,并且在数据变化的时候也要触发，所以，使用监视属性，监视地址参数变化，所以监视$route 可以实现
    updataProductList({ pageNo = 1, pageSize } = {}) {
      // console.log(pageNo, pageSize);
      // 数据地址变化，有params与query两种参数，但是不知道究竟会触发哪一种变化，这两种参数都要写
      // 解构赋值，提取params中的searchText参数，：指把searchText改名为keyword
      const { searchText: keyword } = this.$route.params;
      const {
        categoryName,
        category1Id,
        category2Id,
        category3Id,
      } = this.$route.query;

      // 发送请求所需要的参数
      const options = {
        ...this.options,
        keyword,
        categoryName,
        category1Id,
        category2Id,
        category3Id,
        pageNo,
        pageSize,
      };
      // 重新赋值，目的是使全部结果可以动态展示
      this.options = options;
      // 发送请求
      this.getProductList(options);
    },
    // 删关键字
    delKeyword() {
      // 删除时，keyword删除，但是路径也要变化,并且要清除params参数
      this.options.keyword = "";
      // 路径，重新跳转即可
      this.$router.replace({
        name: "search",
        query: this.options.query,
      });
      // 触发全局事件上的方法
      this.$bus.$emit("clearKeyWord");
    },
    // 删除分类
    delCategoryName() {
      // 把query参数全设置为空
      this.options.categoryName = "";
      this.options.category1Id = "";
      this.options.category2Id = "";
      this.options.category3Id = "";
      // 删除时，query参数也要删
      this.$router.replace({
        name: "search",
        params: this.$route.params,
      });
    },
    // 定义添加品牌并更新数据
    addTrademark(trademark) {
      this.options.trademark = trademark;
      this.updataProductList();
    },
    // 删除品牌并更新数据
    delTrademark() {
      this.options.trademark = "";
      this.updataProductList();
    },
    // 品牌属性的添加
    addProp(props) {
      // console.log(props);
      // 判断品牌属性是否存在，存在直接return，判断的方法是indexOf
      if (this.options.props.indexOf(props) > -1) return;
      this.options.props.push(props); //数组，不能使用=来赋值，只能使用数组的方法来添加数据
      this.updataProductList(); //更新数据
    },
    delProp(index) {
      this.options.props.splice(index, 1);
      this.updataProductList();
    },
    // 设置排序方式
    setOrder(order) {
      // 首先要先判断是升序还是降序
      // 先把order中的数据解构，orderNum表示综合或者价格，orderType表示升序或降序
      let [orderNum, orderType] = this.options.order.split(":");

      // 不相等表明是点击的第一次，这时不改变图标
      // 如果想等，表明是第二次，这时点击修改图标
      if (orderNum === order) {
        // 数字是1，为综合排序
        // 数字是2，为价格排序
        if (order === "1") {
          this.isAllDown = !this.isAllDown;
        } else {
          this.isPriceDown = !this.isPriceDown;
        }
        orderType = orderType === "desc" ? "asc" : "desc";
      } else {
        // 如果order是2，说明点击的是后面的那个
        if (order === "2") {
          this.isPriceDown = false;
          orderType = "asc";
        } else {
          orderType = this.isAllDown ? "desc" : "asc";
        }
      }

      /* 
        需求：重复点击某个按钮时，其order值会发生变化，并且下面的商品也会重新排序，
          1、商品重新排序，说明请求重新发送了，这就需要获得order的值，
          2、order的值是变化的，当重复点击同一个按钮时，order的值会在升降之间切换，
          3、这就需要判断，是点击哪个按钮，然后根据点击的情况，切换升降序
       */

      this.options.order = `${order}:${orderType}`;
      this.updataProductList();
    },
    // 每一页条数发生的变化
    handleSizeChange(pageSize) {
      // console.log("pageSize", pageSize);
      // this.options.pageSize = pageSize;
      // 每页选择的数据会有变化，所以需要把每页具体需要多少数据pageSize，传递到每一页pageNo上，所以将pageSize的值先保存到实例上，然后，通过实例传到所需要的地方
      this.pageSize = pageSize;
      this.updataProductList({ pageSize });
    },
    // 当页码发生变化，触发
    handleCurrentChange(pageNo) {
      // console.log("pageNo", pageNo);
      // this.options.pageNo = pageNo;
      this.updataProductList({ pageNo, pageSize: this.pageSize });
    },
    // 封装一个函数，用来复用 options.order.indexOf('1') > -1 达到优化代码的效果
    isOrder(order) {
      return this.options.order.indexOf(order) > -1;
    },
  },
  mounted() {
    this.getProductList();
    this.updataProductList();
  },
  components: {
    TypeNav,
    SearchSelector,
    Pagination,
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: flex;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;

                i {
                  padding-left: 5px;
                }
              }
              span {
                display: flex;
                flex-direction: column;
                line-height: 8px;
                i {
                  padding-top: 1px;
                  padding-left: -1px;
                  &.deactive {
                    color: rgba(255, 255, 255, 0.65);
                  }
                }
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>