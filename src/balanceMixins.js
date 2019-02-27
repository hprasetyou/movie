export const balanceMixins = {
    data(){ 
        return {
            balance: 0
        }
    },
    methods:{
        setBalance(amount){
            localStorage.setItem('balance',amount);
            this.balance = amount;
            console.log(this.balance);
            
        },
        getBalance(){
            if (localStorage.getItem('balance')) {
                let balance = parseInt(localStorage.getItem('balance'));
                this.balance = balance;
                return balance;
            }else{
                return false;
            }
        }
    },
    mounted(){
        if(this.getBalance() === false){
            this.setBalance(1000000);
        }
    }
}