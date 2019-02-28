<template>
    <div class="border rounded">
        <div class="crew--image">
            <img v-if="profilePath" :src="profilePicture" alt="">
        </div>
        <div class="crew--info-container p-2">
            <div class="crew--name">
                <span>{{ name }}</span>
            </div>
            <div class="crew--role">
                <span>{{ role }}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        name:String,
        role:String,
        profilePath:String
    },
    computed:{
        profilePicture(){
            return `https://image.tmdb.org/t/p/w185${this.profilePath}`
        }
    }
}
</script>
<style lang="less">
.crew{
    &--image{
        height: 130px;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
    &--info-container{
        font-size: 10px;
    }
}
</style>


