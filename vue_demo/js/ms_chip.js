//chip-empty-born 加载+ 会有震颤的效果
//chip-empty 是 + 效果
//chip-focuc 是输入框效果（完成后的）
//无以上三者的效果输入正常的状态
Vue.component('ms-chip',{
    template:'<div class="container transit">' +
    '<div class="chip"  :class="{\'chip-focuc\': isfocus,\'chip-empty\': index==ips.length-1,\'chip-empty-born\':index==ips.length-1}" @click="clickHandler($event,index)" v-for="(item, index) in ips">' +
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
            ip_value:'',
            ips:this.iparr
        }
    },
    mounted:function(){
        this.ips.push(' ');
    },
    methods:{
        clickHandler:function(event,index){
            console.log(event.target);
            var $t = $(event.target);
            if($t.hasClass('chip')||$t.parent().hasClass('chip')){//点击到元素或者元素内部就得增加focus

                if($t.hasClass('chipXbutton')&&!$t.parent().hasClass('chip-empty')){//删除单个节点
                    this.ips.splice(index, 1)
                }

                if($t.hasClass('chip')){//确保focus class 添加到chip上面
                    this.focusIn($t,index);
                }else if($t.parent().hasClass('chip')){
                    this.focusIn($t.parent(),index);
                }
            }

            //if($t.hasClass('chip')){//点击到元素增加focus
            //    this.focusIn($t);
            //}else if($t.parent().hasClass('chip')){//点击到元素增加focus
            //    this.focusIn($t.parent());
            //}else if($t.hasClass('chipXbutton')&&!$t.parent().hasClass('chip-empty-born')){//删除单个节点
            //    this.ips.splice(index, 1)
            //}else if($t.hasClass('chipXbutton')&&$t.parent().hasClass('chip-empty-born')){//增加新节点
            //    this.focusIn($t.parent());
            //    //this.ips.splice(this.ips.length-1, 0,'')
            //}
        },

        focusIn:function($t,index){
            $t.removeClass()
                .addClass('chip')
                .addClass('chip-focus');
            $t.find('input').focus();
            this.containerClicked($t,index);
        },
        focusOut:function($t,index){
            console.log(index);
            var _t = this;
            console.log(this.ips[index]);
            if(this.ips[index]==' '||this.ips[index]==''||typeof this.ips[index]=='undefined'){
                $t.removeClass()
                    .addClass('chip')
                    .addClass('chip-empty');
            }else if(this.ips[index]){
                $t.removeClass().addClass('chip');
                if($(_t.$el).find('.chip-focus')!=0&&index==this.ips.length){
                    this.addChip();
                }
            }
        },
        addChip:function(){
            this.ips.splice(this.ips.length, 0,'')
        },
        containerClicked:function($target,index){
            var _t = $target[0];
            var that = this;
            var clickedHandler = function(e){
                if($(e.target).parent().hasClass('chip'))return;//点击元素不能是chip元素内部
                if(e.target!=_t){
                    //if(index){
                        that.focusOut($target,index);
                        //index = null;
                    //}
                }

                return false;
            }
            document.addEventListener('click',clickedHandler,false);
        }
    }
})