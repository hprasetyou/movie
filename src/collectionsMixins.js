export const collectionsMixins = {
    methods:{
        addCollections(id){
            let collections = [];
            if (this.getCollections()) {
                collections = this.getCollections();
            }            
            collections.push(id);
            localStorage.setItem('collections',JSON.stringify(collections));
        },
        getCollections(){
            if (localStorage.getItem('collections')) {
                return JSON.parse(localStorage.getItem('collections'));
            }
            return false;
        },
        isInCollections(id){
            if(!this.getCollections()){
                return false;
            }
            if(this.getCollections().indexOf(id) < 0){
                return false;
            }
            return true;
        }
    },
    mounted(){
        if(!this.getBalance()){
            this.setBalance(1000000);
        }
    }
}