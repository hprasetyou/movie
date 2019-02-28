export const balanceMixins = {
    data(){ 
        return {
            balance: 0
        }
    },
    mounted(){
        if(localStorage.getItem('balance')){
            this.balance = localStorage.getItem('balance');
        }else{
            this.balance = 100000;
        }
    },
    watch: {
        balance(val){
            localStorage.balance = val;
        }
    },
}