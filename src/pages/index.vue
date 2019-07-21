<template>
  <div class="page page-index">
   <keyboard :plateNumber.sync="plateNumber" @change="change"></keyboard>
 </div>
</template>
<script>
    import keyboard from "@/components/keyboard/index";
    export default {
        name: "keyboardDemo",
        mounted: function() {},
        components: {
            keyboard
        },
        data() {
            return {
                plateNumber: '粤A12345'.split('')
            };
        },
        watch: {
            plateNumber(v){
                console.log(v)
            }
        },
        created() {
        },
        methods: {
           change(v){
             console.log('当前车牌号码：'+v.join(''));
           }

        }
    };
</script>

<style lang="scss">
   .page{
       padding:20px;
   }
</style>