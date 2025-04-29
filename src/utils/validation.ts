import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
   firstName: yup
      .string()
      .required('Le prénom est requis')
      .min(2, 'Le prénom doit contenir au moins 2 caractères'),
   lastName: yup
      .string()
      .required('Le nom est requis')
      .min(2, 'Le nom doit contenir au moins 2 caractères'),
   siret: yup
      .string()
      .required('Le SIRET est requis')
      .matches(/^[0-9]{14}$/, 'Le SIRET doit contenir 14 chiffres'),
   city: yup
      .string()
      .required('La ville est requise')
      .min(2, 'La ville doit contenir au moins 2 caractères'),
   phone: yup
      .string()
      .required('Le numéro de téléphone est requis')
      .matches(/^\+?[0-9\s]{8,}$/, 'Format de téléphone invalide'),
});
