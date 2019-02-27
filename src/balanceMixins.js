export const balanceMixins = {
    methods:{
        setBalance(amount){
            localStorage.setItem('balance',amount)
        },
        getBalance(){
            if (localStorage.getItem('balance')) {
                return localStorage.getItem('balance');
            }else{
                return false;
            }
        }
    },
    mounted(){
        if(!this.getBalance()){
            this.setBalance(1000000);
        }
    }
}