/* eslint-disable max-len */
import { Dimensions } from "react-native";

let all_constants = {
    currency_symbol: " €",
    win: "Gain :",
    time: "min",
    cart: {
        button: {
            close: "FERMER",
        },
    },
    colors: {
        inputBorderColor: "#ffd700",
    },
    custom_alert: {
        homeview: {
            online_title: "Passer en ligne ?",
            offline_title: "Passer hors ligne ?",
            cancel_text: "ANNULER",
            go_online: "Vous pourrez à nouveau recevoir des livraisons.",
            go_offline: "ATTENTION, vous ne pourrez plus recevoir de livraisons !",
            logout_title: "DÉCONNEXION",
            logout_message: "Souhaitez-vous vous déconnecter ?",
            delete_account: "SUPPRIMER",
            keep_account: "CONSERVER",
        },
        form: {
            title: "ATTENTION",
            message: "Quitter le formulaire et revenir en arrière ?",
            delete_account_title: "ATTENTION SUPPRESSION DU COMPTE !",
            delete_account_message:
        "Souhaitez vous vraiment supprimer votre compte ? Attention toutes vos données seront perdues.",
        },
        sign_out_title: "DÉCONNEXION",
        sign_out_message: "Souhaitez-vous vous déconnecter ?",
        sign_out_confirm_text: "OUI",
        sign_out_cancel_text: "NON",
    },
    drawercontent: {
        logout: "Déconnexion",
        hello: "Bonjour ",
        settings: "Mes paramètres",
        drawer_item: {
            label: {
                account: "Mon compte",
                stats: "Mes statistiques",
                history: "Mes livraisons",
            },
            delivery_history: {
                title: "Mes anciennes livraisons",
                no_results: "Aucune livraison trouvée.",
                infos: {
                    number: "Commande N°",
                    status: "Statut:",
                    owner: "Passée par",
                    amount: "Total de la commande: ",
                    quantity: "Nombre d'item(s): ",
                    content: "Cette commande contient: ",
                    ordered_label: "le",
                    approved_label: "Commande acceptée le",
                    delivered_label: "Commande livrée le",
                    price: "Prix à l'unité(€): ",
                    dish_total: "Total: ",
                    ordered: "Commandé le ",
                    item: "item(s)",
                },
                status: {
                    delivered: "Livrée",
                },
            },
            orders_history: {
                title: "Mes anciennes livraisons",
                no_results: "Aucune livraison trouvée.",
                infos: {
                    number: "Commande N°",
                    status: "Statut:",
                    owner: "Passée par",
                    amount: "Total de la commande: ",
                    quantity: "Nombre d'item(s): ",
                    content: "Cette commande contient: ",
                    ordered_label: "le",
                    canceled_label: "Annulée le",
                    approved_label: "Commande acceptée le",
                    delivered_label: "Commande livrée le",
                    picking_label: "Ramassage prévu le",
                    price: "Prix à l'unité(€): ",
                    dish_total: "Total: ",
                    ordered: "Commandé le ",
                    item: "item(s)",
                },
                status: {
                    ordered: "Commandée",
                    canceled: "Annulée",
                    delivered: "Livrée",
                    pending: "En attente de prise en charge",
                    approved: "Acceptée",
                    cancelled_by_customer: "Vous avez annulé cette commande",
                    cancelled_by_cooker: "Le cuisinier a annulé cette commande",
                },
                original_status: {
                    cancelled_by_customer: "cancelled_by_customer",
                    cancelled_by_cooker: "cancelled_by_cooker",
                    delivered: "delivered",
                },
            },
        },
        button: {
            labels: {
                add_address: "AJOUTER UNE ADRESSE",
                delete_address: "SUPPRIMER CETTE ADRESSE",
            },
        },
        form: {
            title: "ATTENTION",
            messages: {
                remove_address_warning: "Supprimer définitivement cette adresse ?",
            },
        },
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
        autocomplete: "autocomplete",
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
                town: "Ville de livraison",
                image: "Photo de profil",
                delete_account: "SUPPRIMER MON COMPTE",
                delete_address: "SUPPRIMER CETTE ADRESSE",
                delivery_radius: "Zone de livraison",
                siret: "Numéro de SIRET",
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
    modal: {
        dish_modal: {
            hide: "FERMER",
            show: "AFFICHER LES PLATS",
        },
    },
    placeholders: {
        form: {
            settings: {
                street_number: "Numéro de rue",
                street_name: "Ex: rue René Cassin",
                address_complement: "Complément d'adresse",
                town: "Votre ville",
                firstname: "Votre prénom",
                lastname: "Votre nom de famille",
                phone: "Ex: 0612345678",
                delivery_radius: {
                    label: "Choisissez votre zone de livraison",
                    value: null,
                },
            },
        },
    },
    screen: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    stats: {
        labels: {
            start: "Date de début",
            end: "Date de fin",
        },
        kilometers: "KM",
        custom_alerts: {
            title: "Information",
            error_title: "Erreur",
            messages: {
                balance: "Votre solde cumulé sur la période demandée.",
                delivery_count:
          "Nombre de livraisons effectuées sur la période demandée.",
                delivery_mean_time: "Temps moyen de livraison sur la période demandée.",
                delivery_total_km: "Distance totale parcourue sur la période demandée.",
                both_dates_mandatory:
          "Merci de renseigner une date de début et une date de fin.",
            },
            units: {
                seconds: "s",
                minutes: "min",
                hours: "h",
            },
        },
    },
    tab: {
        main_tab_navigator: {
            home: "Home",
            pending: "En attente",
            delivery: "Livraison",
        },
    },
    validators: {
        max_text_length: 30,
        max_description_length: 200,
        global: {
            field: "Le champ ",
            is_empty: " est vide.",
            invalid_char: " est invalide. Veuillez enlever le ",
            invalid_price: " est invalide. Exemple: 13.90",
            invalid_postal_code: " est invalide. Exemple: 91100.",
            phone_mismatch:
        "Les deux numéros de téléphone saisis doivent être identiques.",
        },

        includes: {
            phone: "téléphone",
            siret: "siret",
        },

        settings: {
            char: " caractères.",
            phone_format_error: " doit contenir exactement 10 chiffres sans espace.",
            siret_format_error: " doit contenir exactement 14 chiffres sans espace.",
        },
    },
};

export default all_constants;
