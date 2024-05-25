/* eslint-disable max-len */
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function getOrders() {
    await sleep(1000);
    const order_list_data = {
        data: [
            {
                id: "1",
                order_number: "123366",
                order_status: "en attente",
                order_owner: "Toutii",
                order_price: "15",
                order_number_of_items: "10",
                order_date: "11 Mars 2021",
                order_photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                dishes: [
                    {
                        id: "1",
                        photo:
              "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        dish_name: "Poulet Yassa",
                        dish_unit_price: "10",
                        dish_quantity: "2",
                        dish_order_date: "9 Mars 2021",
                    },
                ],
            },
            {
                id: "2",
                order_number: "123367",
                order_status: "en attente",
                order_owner: "Toutii",
                order_price: "15",
                order_date: "11 Mars 2021",
                order_photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                dishes: [
                    {
                        id: "1",
                        photo:
              "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        dish_name: "Poulet Yassa",
                        dish_unit_price: "10",
                        dish_quantity: "2",
                        dish_order_date: "10 Mars 2021",
                    },
                ],
            },
            {
                id: "3",
                order_number: "123368",
                order_status: "en attente",
                order_owner: "Toutii",
                order_price: "15",
                order_date: "9 Mars 2021",
                order_photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                dishes: [
                    {
                        id: "1",
                        photo:
              "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        dish_name: "Poulet Yassa",
                        dish_unit_price: "10",
                        dish_quantity: "2",
                        dish_order_date: "10 Mars 2021",
                    },
                ],
            },
            {
                id: "4",
                order_number: "123369",
                order_status: "en attente",
                order_owner: "Toutii",
                order_price: "15",
                order_date: "11 Mars 2021",
                order_photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                dishes: [
                    {
                        id: "1",
                        photo:
              "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        dish_name: "Poulet Yassa",
                        dish_unit_price: "10",
                        dish_quantity: "2",
                        dish_order_date: "10 Mars 2021",
                    },
                ],
            },
            {
                id: "5",
                order_number: "123370",
                order_status: "en attente",
                order_owner: "Toutii",
                order_price: "15",
                order_date: "11 Mars 2021",
                order_photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                dishes: [
                    {
                        id: "1",
                        photo:
              "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        dish_name: "Poulet Yassa",
                        dish_unit_price: "10",
                        dish_quantity: "2",
                        dish_order_date: "10 Mars 2021",
                    },
                ],
            },
            {
                id: "6",
                order_number: "123371",
                order_status: "en attente",
                order_owner: "Toutii",
                order_price: "15",
                order_date: "11 Mars 2021",
                order_photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                dishes: [
                    {
                        id: "1",
                        photo:
              "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        dish_name: "Poulet Yassa",
                        dish_unit_price: "10",
                        dish_quantity: "2",
                        dish_order_date: "10 Mars 2021",
                    },
                ],
            },
        ],
    };
    return order_list_data;
}
