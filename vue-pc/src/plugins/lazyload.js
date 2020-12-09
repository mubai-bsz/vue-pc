import Vue from "vue";
import VueLazyload from "vue-lazyload";
import timg from "../assets/img/timg.gif";

Vue.use(VueLazyload, {
	loading: timg,
});
