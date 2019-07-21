import "./utils/rem"
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;


const vue = new Vue({
    router:router,
    render: h => h(App),

    created:function(){

    },
    mounted:function(){
 
    }

}).$mount("#app");


