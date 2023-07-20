const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function getHomeViewData() {
  await sleep(1000);
  const homeview_data = {
    data: {
      balance: "20.00",
      delivery_data: [
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
      bardata: [
        {
          value: 2,
          frontColor: "#006DFF",
          gradientColor: "#009FFF",
          label: "Lun",
        },

        {
          value: 3,
          frontColor: "#006DFF",
          gradientColor: "#009FFF",
          label: "Mar",
        },

        {
          value: 4,
          frontColor: "#006DFF",
          gradientColor: "#009FFF",
          label: "Mer",
        },

        {
          value: 5,
          frontColor: "#006DFF",
          gradientColor: "#009FFF",
          label: "Jed",
        },
        {
          value: 6,
          frontColor: "#006DFF",
          gradientColor: "#009FFF",
          label: "Ven",
        },
        {
          value: 7,
          frontColor: "#006DFF",
          gradientColor: "#009FFF",
          label: "Sam",
        },
      ],
    },
  };
  return homeview_data;
}
