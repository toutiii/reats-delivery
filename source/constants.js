/* eslint-disable max-len */
import { Dimensions } from "react-native";

let all_constants = {
    currency_symbol: " €",
    win: "Gain :",
    time: "min",
    colors: {
        inputBorderColor: "#ffd700",
    },
    drawercontent: {
        stats: "Stats",
        account: "Compte",
        delivery: "Livraison",
        login: "Connexion",
        logout: "Déconnexion",
    },
    delivery: {
        infos: {
            number: "Commande N°",
            time: "Temps de livraison :",
        },
        money: "20,00",
    },
    homeview: {
        title_delivery: "Dernières livraisons",
        title_stats: "Statistique",
        title_barchart: "Hebdomadaire",
        currency: "EUR",
        balance: "Solde",
    },

    order: {
        infos: {
            dishe: "plats",
        },
    },
    field_type: {
        textinput: "textinput",
        image: "image",
        textarea: "textarea",
        select: "select",
        select_picker: "select_picker",
        date_picker: "date_picker",
    },
    label: {
        form: {
            settings: {
                firstname: "Prénom",
                lastname: "Nom",
                phone: "Numéro de téléphone",
                phone_confirmation: "Confirmation téléphone",
                street_number: "Numéro",
                street_name: "Rue",
                address_complement: "Complément d'adresse",
                postal_code: "Code postal",
                town: "Ville",
                image: "Photo de profil",
                delete_account: "SUPPRIMER MON COMPTE",
                delete_address: "SUPPRIMER CETTE ADRESSE",
            },
        },
    },
    max_length: {
        form: {
            siret: 14,
            firstname: 50,
            lastname: 50,
            phone: 10,
            street_number: 20,
            street_name: 100,
            address_complement: 100,
            postal_code: 5,
            town: 100,
        },
    },
    messages: {
        failed: {
            title: "Échec",
        },
        clear: "EFFACER",
        submit: "VALIDER",
        cancel: "ANNULER",
        delete: "SUPPRIMER",
        signup: "CRÉER UN COMPTE",
        send: "ENVOYER",
        send_again: "JE N'AI PAS REÇU DE CODE",
        errors: {
            title: "Erreur",
        },
        otp: {
            title: {
                send_again_title: "Nouvelle demande",
            },
            message: {
                send_again_message:
          "Un nouveau code vous sera envoyé par SMS dans quelques instants.",
                invalid_code:
          "Code invalide. Veuillez réessayer ou en demander un nouveau.",
            },
        },
        success: {
            title: "Succès",
            login_message: "Connexion réussie",
            signup_message:
        "Vous pouvez désormais vous connecter avec votre numéro de téléphone.",
            otp_message_signup:
        "Vous allez recevoir dans quelques instants un code par SMS que vous devrez renseigner dans le prochain écran.",
            otp_message_login:
        "Si vous avez déjà créé un compte, un code de connexion vous sera envoyé par SMS dans quelques instants.",
        },
    },
    placeholders: {
        form: {
            settings: {
                street_number: "Numéro de rue",
                street_name: "Ex: rue René Cassin",
                address_complement: "Complément d'adresse",
                postal_code: "Votre code postal",
                town: "Votre ville",
                firstname: "Votre prénom",
                lastname: "Votre nom de famille",
                phone: "Votre numéro de téléphone",
            },
        },
    },
    screen: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    tab: {
        main_tab_navigator: {
            home: "Home",
            pending: "En attente",
            delivery: "Livraison",
        },
    },
};

export default all_constants;
