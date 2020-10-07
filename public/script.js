const Price = 5.90;

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
            { id: 1, title: "Item_1" },
            { id: 2, title: "Item_2" },
            { id: 3, title: "Item_3" }
        ],
        cart: []
    },
    methods: {
        addItem: function (index) {
            this.total += Price;
            var item = this.items[index];
            var found = false;
            for (i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    found = true;
                    this.cart[i].qty++;
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

        }
    }
});
