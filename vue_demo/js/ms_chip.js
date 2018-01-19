//chip-empty-born 加载+ 会有震颤的效果
//chip-empty 是 + 效果
//chip-focuc 是输入框效果（完成后的）
//无以上三者的效果输入正常的状态
Vue.component('ms-chip',{
    template:'<div class="container transit">' +
    '<div class="chip" :class="{\'chip-focuc\': isfocus,\'chip-empty\': index==ips.length-1,\'chip-empty-born\':index==ips.length-1}" @click="focusIn($event)" v-for="(item, index) in ips">' +
    '<div class="chipLabel">{{item}}</div>' +
    '<input class="chipInput" :placeholder="item" v-model="ips[index]">' +
    '<div class="chipXbutton"></div>' +
    '</div>' +
    '</div>',
    props: {
        phvalue:{
            type:String,
            default:'请输入ip'
        },
        iparr:{
            type:Array,
            default:function(){
                return [];
            }
        }
    },
    data:function(){
        return {
            isfocus:false,
            isempty:false,
            //classObject: {
            //    'chip':true,
            //    'chip-focuc': false,
            //    'chip-empty': false,
            //    'chip-empty-born':false
            //},
            ip_value:'',
            //placeholdervalue:this.phvalue,
            ips:this.iparr
        }
    },
    mounted:function(){
        this.ips.push('wo shi xin xiang mu')
    },
    computed: {
        classObject: function () {

            return {

            }
        }
    },
    methods:{
        focusIn:function(event){
            var $el = this.$el;
            $el.className = "";
            $el.className = "chip chip-focus";
            $el.getElementsByTagName('input')[0].focus();
            this.containerClicked(event.target);
        },
        focusOut:function(){
            this.$el.className = "";
            this.$el.className = "chip";
            this.placeholdervalue = this.ip_value
        },
        containerClicked:function(target){
            var _t = this;
            var clickedHandler = function(e){
                if(e.target==_t.$el.parentNode){
                    _t.focusOut()
                }
//                        document.removeEventListener('click',clickedHandler,false);
            }
            document.addEventListener('click',clickedHandler,false);
        }
    }
})