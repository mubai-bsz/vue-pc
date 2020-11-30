<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="isSearchShow = false">
      <h2 class="all" @mouseenter="isSearchShow = true">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="search">
        <div class="sort" v-show="isHomeShow || isSearchShow">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item bo"
              v-for="category in categoryList"
              :key="category.categoryId"
            >
              <h3>
                <!-- 一级分类名称 -->
                <!-- <a href="">{{ category.categoryName }}</a> -->

                <!-- 方法一：路由链接导航 
                  可以实现，跳转的时候，路径发生变化，但是当点击三级路由时，组件加载过多，导致性能不好
              -->
                <!-- <router-link
                :to="`/search?categoryName=${category.categoryName}&category1Id=${category.categoryId} `"
                >{{ category.categoryName }}</router-link
              > -->
                <!-- 方法二：编程式导航，用到那个点那个，就加载那个，性能比较好
              但是这种方法会出现一个问题，就是点击那样组件，那个组件就要有点击事件，所需要的点击事件太多了，可以使用事件委托的方法，减少事件的绑定
               -->
                <!-- <a
                @click.prevent="
                  $router.push({
                    name: 'search',
                    query: {
                      categoryName: category.categoryName,
                      ategory1Id: category.categoryId,
                    },
                  })
                "
                >{{ category.categoryName }}</a
              > -->

                <!-- 方法三：事件委托， -->
                <a
                  :data-categoryName="category.categoryName"
                  :data-categoryId="category.categoryId"
                  :data-categoryType="1"
                  >{{ category.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="child in category.categoryChild"
                    :key="child.categoryId"
                  >
                    <dt>
                      <!-- 二级分类名称 -->
                      <!-- <a href="">{{ child.categoryName }}</a> -->
                      <!-- <router-link
                      :to="`/search?categoryName=${child.categoryName}&category2Id=${child.categoryId} `"
                      >{{ child.categoryName }}</router-link
                    > -->
                      <!-- <a
                      @click.prevent="
                        $router.push({
                          name: 'search',
                          query: {
                            categoryName: child.categoryName,
                            categoryId: child.categoryId,
                          },
                        })
                      "
                      >{{ child.categoryName }}</a
                    > -->

                      <a
                        :data-categoryName="child.categoryName"
                        :data-categoryId="child.categoryId"
                        :data-categoryType="2"
                        >{{ child.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <!-- 三级分类名称 -->
                      <em
                        v-for="grandChild in child.categoryChild"
                        :key="grandChild.categoryId"
                      >
                        <!-- <a href="">{{ grandChild.categoryName }}</a> -->
                        <!-- <router-link
                        :to="`/search?categoryName=${grandChild.categoryName}&category3Id=${grandChild.categoryId} `"
                        >{{ grandChild.categoryName }}</router-link
                      > -->

                        <!-- <a
                        @click.prevent="
                          $router.push({
                            name: 'search',
                            query: {
                              categoryName: grandChild.categoryName,
                              categoryId: grandChild.categoryId,
                            },
                          })
                        "
                        >{{ grandChild.categoryName }}</a
                      > -->

                        <a
                          :data-categoryName="grandChild.categoryName"
                          :data-categoryId="grandChild.categoryId"
                          :data-categoryType="3"
                          >{{ grandChild.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "TypeNav",
  data() {
    return {
      isHomeShow: this.$route.path === "/",
      isSearchShow: false,
    };
  },
  computed: {
    // 使用vuex模块化，mapState使用对象，而不是用数组,对象中的函数会调用接收的值
    ...mapState({
      categoryList: (state) => state.home.categoryList.slice(0, 15),
    }),
  },

  methods: {
    ...mapActions(["getCategoryList"]),
    // 跳转到search
    /* 
      使用事件委托的方法来给Ul li帮定点击事件
      这种方式需要获取到所要点击事件的名字与id添加到路径产参数上
      使用自定义属性的方法来获取
     */
    goSearch(e) {
      const { categoryname, categoryid, categorytype } = e.target.dataset;

      // 一个新的问题，点击空白处，也会触发点击事件，这样不好
      // 解决方法：
      if (!categoryname) return;
      const location = {
        name: "search",
        query: {
          categoryName: categoryname,
          [`category${categorytype}Id`]: categoryid,
        },
      };
      // 判断当前是否有params参数
      const { searchText } = this.$route.params;
      if (searchText) {
        location.params = { searchText };
      }
      this.$router.push(location);
    },
  },
  mounted() {
    // console.log(this.$route);
    // 判断之前有没有vuex数据，有的话就不加载了
    if (this.categoryList.length) return;

    this.getCategoryList();
  },
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      // search显示隐藏
      &.search-enter-active {
        transition: height 0.5s;
        overflow: hidden;
      }
      &.search-enter {
        height: 0px;
      }
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
