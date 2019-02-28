export const priceMixins = {
    methods:{
        getPrice(rating){
            if (rating >= 1 && rating <= 3) {
                return 35000;
              } else if (rating > 3 && rating <= 6) {
                return 8250;
              } else if (rating > 6 && rating <= 8) {
                return 16350;
              } else if (rating > 8 && rating <= 10) {
                return 21250;
              } else {
                return 0;
              }
        },
        numberWithCommas(x) {
          var parts = x.toString().split(".");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          return parts.join(",");
        },
        formatRp(x){
          return `Rp ${this.numberWithCommas(x)}`;
        },
        getPriceString(rating){
          return this.formatRp(this.getPrice(rating));
        }
    }
}