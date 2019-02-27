export const collectionsMixins = {
    data(){
        return{
            collections:[]
        }
    },
    methods:{
        addCollections(id){
            let collections = [];
            if (this.getCollections()) {
                collections = this.getCollections();
            }            
            collections.push(id);
            localStorage.setItem('collections',JSON.stringify(collections));
            this.collections = collections;
        },
        getCollections(){
            if (localStorage.getItem('collections')) {
                return JSON.parse(localStorage.getItem('collections'));
            }
            return false;
        },
        isInCollections(id){
            if(this.collections.indexOf(id) < 0){
                return false;
            }
            return true;
        }
    },
    mounted(){
        if(this.getCollections()){
            this.collections = this.getCollections();
        }
    }
}