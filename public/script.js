const Price = 5.90;

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        search: 'love',
        searchResult: [],
        lastSearch: '',
        loading: false,
        price: Price
    },
    computed: {
        noMoreItems: function () {
            return this.items.length === this.searchResult.length & this.searchResult.length > 0
        },
    },
    methods: {
        appendItems: function () {
            if (this.items.length < this.searchResult.length) {
                var append = this.searchResult.slice(this.items.length, this.items.length + 10);
                this.items = this.items.concat(append);
            };
        },
        onSubmit: function () {
            if (this.search.length) {
                this.items = [];
                this.loading = true;
                this.$http.get('/search/'.concat(this.search)).then(function (res) {
                    this.searchResult = res.data;
                    this.lastSearch = this.search;
                    this.loading = false;
                    this.appendItems();
                });
            };

        },
        addItem: function (index) {
            this.total += Price;
            var item = this.items[index];
            var found = false;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    found = true;
                    this.cart[i].qty++;
                    break;
                };

            }
            if (!found) {
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    qty: 1,
                    price: Price
                });

            }

        },
        inc: function (item) {
            item.qty++;
            this.total += Price;
        },
        dec: function (item) {
            item.qty--;
            this.total -= Price;
            if (item.qty <= 0) {
                for (let i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id === item.id) {
                        this.cart.splice(i, 1);
                        break;
                    }
                }
            }
        }
    },
    filters: {
        currency: function (price) {
            return '$'.concat(price.toFixed(2));
        }
    },
    mounted: function () {
        this.onSubmit();
        var vueInstance = this;
        var elem = document.getElementById('product-list-bottom')
        var watcher = scrollMonitor.create(elem);
        watcher.enterViewport(function () {
            vueInstance.appendItems();;
        })
    }

});

