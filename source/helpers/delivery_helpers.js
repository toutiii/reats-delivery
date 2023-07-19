const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function getDeliveryData() {
  await sleep(1000);
  const delivery_list_data = {
    data: [
      {
        id: "1",
        delivery_number: "123364",
        delivery_amount: "15",
        delivery_time: "10",
        photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
      },
      {
        id: "2",
        delivery_number: "123365",
        delivery_amount: "15",
        delivery_time: "13",
        photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
      },
      {
        id: "3",
        delivery_number: "123366",
        delivery_amount: "15",
        delivery_time: "16",
        photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
      },
    ],
  };
  return delivery_list_data;
}
