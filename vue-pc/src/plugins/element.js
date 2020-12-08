import Vue from "vue";
import { Pagination, InputNumber, Message, MessageBox } from "element-ui";

Vue.use(Pagination);
Vue.use(InputNumber);
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
