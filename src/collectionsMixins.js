export const collectionsMixins = {
    data(){
        return{
            collections:[]
        }
    },
    methods:{
        addCollections(movie){
            let collections = [];
            if (this.getCollections()) {
                collections = this.getCollections();
            }            
            collections.push(movie);
            localStorage.setItem('collections',JSON.stringify(collections));
            this.collections = collections;
        },
        getCollections(){
            if (localStorage.getItem('collections')) {
                return JSON.parse(localStorage.getItem('collections'));
            }
            return false;
        },
        isInCollections(movie){
            if(this.collections.indexOf(movie) < 0){
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