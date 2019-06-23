import { VISA_APPLICATION_FORM_FILEDS, VISA_APPLICATION_FORM_ENUMS } from '../pages/visa-application-form/VisaApplicationFormModel';
const FIELDS = VISA_APPLICATION_FORM_FILEDS;

export default function getPrintCoords() {
  return [{
    [FIELDS.LAST_NAME]: { x: 158, y: 273 },//1_family
    [FIELDS.BIRTH_LAST_NAME]: { x: 375, y: 297 },// '2_previosFamily'
    [FIELDS.FIRST_NAME]: { x: 158, y: 324 },//'3_name'
    [FIELDS.BIRTH_DATE]: { x: 90, y: 374 },//'4_birthDate'
    [FIELDS.BIRTH_PLACE]: { x: 268, y: 378 },//'5_birthPlace'
    [FIELDS.BIRTH_COUNTRY]: { x: 275, y: 428 },//'6_birth_Country'
    [FIELDS.CITIZENSHIP]: { x: 433, y: 369 },//'7_citizenship'
    [FIELDS.BIRTH_CITIZENSHIP]: { x: 433, y: 443 },//'7_birth_Citizenship'
    [FIELDS.FORM_GENDER]: {//'8_gender'
      "мужской": {
        x1: 65, y1: 495, //чекушки разные по размеру, эти больше других
        x2: 83, y2: 513,
      },
      "женский": {
        x1: 120, y1: 495,
        x2: 139, y2: 513,
      },
    },
    [FIELDS.MARITAL_STATUS]: {//'9_maritalStatus'
      "холост/незамужем": {
        x1: 260, y1: 484,
      },
      "женат/замужем": {
        x1: 365, y1: 483,
      },
      "не проживает с супругой": {
        x1: 462, y1: 483,
      },
      "разведен(а)": {
        x1: 261, y1: 509,
      },
      "вдовец/вдова": {
        x1: 338, y1: 509,
      },
      "иное": {
        x1: 425, y1: 509,
      },
      // "несовершеннолетний" такого поля нет на бланке но есть на веб форме
    },
    [FIELDS.TRUSTEE_FIRST_NAME]: { x: 85, y: 593 },//'10_TRUSTEE'
    '11_personalNumber': { x: 272, y: 661 },//'11_personalNumber'
    '12_pasportType': {//'12_pasportType'
      0: {
        x1: 68, y1: 693,
      },
      1: {
        x1: 173, y1: 693,
      },
      2: {
        x1: 311, y1: 693,
      },
      3: {
        x1: 423, y1: 693,
      },
      4: {
        x1: 68, y1: 718,
      },
      5: {
        x1: 166, y1: 716,
      },

    },
    [FIELDS.INTERNATIONAL_PASSPORT_NUMBER]: { x: 82, y: 785 },//'13_docNumber'
    [FIELDS.INTERNATIONAL_PASSPORT_STARTDATE]: { x: 241, y: 785 },//'14_docStartDate'
    [FIELDS.INTERNATIONAL_PASSPORT_ENDDATE]: { x: 359, y: 785 },//'15_docEndDate'
    [FIELDS.INTERNATIONAL_PASSPORT_DELIVERY_STRUCTURE]: { x: 464, y: 785 },//'16_docIssuedBy'
    [FIELDS.EMAIL]: { x: 100, y: 831 },//'17_adress_email'
    [FIELDS.NUMBER]: { x: 435, y: 831 },//'17_telNumber'
    [FIELDS.RESIDENCE_CAPTION]: {//'18_liveCounty'
      "Да": {
        x1: 70, y1: 871,
      },
      "Нет": {
        x1: 95, y1: 871,
      },
    },
    [FIELDS.RESIDENCE_CAPTION]: { x: 340, y: 872 },//'18_liveCounty_2'
    [FIELDS.RESIDENCE_NUMBER]: { x: 396, y: 872 },//'18_liveCounty_3'
    [FIELDS.RESIDENCE_ENDDATE]: { x: 535, y: 872 },//'18_liveCounty_4'
    [FIELDS.EMPLOYMENT_STATUS]: { x: 344, y: 941 },//'19_profession'
  },
    {
      [FIELDS.EMPLOYER_CAPTION]: { x: 90, y: 125 },//'20_employer'
      [FIELDS.TARGET]: {//'21_target'
        "туризм": {
          x1: 68, y1: 202,
        },
        "деловая": {
          x1: 122, y1: 202,
        },
        "спорт": {
          x1: 173, y1: 202,
        },
        "культура": {
          x1: 337, y1: 202,
        },
        "учёба": {
          x1: 389, y1: 202,
        },
        "официальная": {
          x1: 437, y1: 202,
        },
        "лечение": {
          x1: 504, y1: 202,
        },
        "транзит": {
          x1: 69, y1: 227,
        },
        "посещение родственников или друзей": {
          x1: 119, y1: 227,
        },
        "транзит через аэропорт": {
          x1: 171, y1: 227,
        },
        "иное": {
          x1: 288, y1: 227,
        },
      },
      [FIELDS.TARGET_DETAILS]: { x: 407, y: 235 },//'21_target_other'
      [FIELDS.TARGET_COUNTRY]: { x: 90, y: 290 },//'22_targetCountry'
      [FIELDS.ENTRY_COUNTRY]: { x: 350, y: 290 },//'23_enterCountry'
      [FIELDS.ENTRY_TYPE_COUNT]: {//'24_entryCount'
        "однократного въезда": {
          x1: 70, y1: 339,
        },
        "двукратного въезда": {
          x1: 148, y1: 339,
        },
        "многократного въезда": {
          x1: 217, y1: 339,
        },
      },
      '25_duration': { x: 485, y: 365 },//'25_duration'
      [FIELDS.SCHENGEN_EXISTS]: {//'26_schengen'
        "Да": {
          x1: 69, y1: 398,
        },
        "Нет": {
          x1: 94, y1: 398,
        },
      },
      // [FIELDS.SCHENGEN_VISA_NUMBER] ??????
      [FIELDS.SCHENGEN_VISA_START_DATE]: { x: 237, y: 413 },//'26_schengenStart'
      [FIELDS.SCHENGEN_VISA_END_DATE]: { x: 345, y: 415 },//'26_schengenEnd'
      [FIELDS.FINGERPRINTS_EXISTS]: {//'27_prints'
        "Да": {
          x1: 69, y1: 532,
        },
        "Нет": {
          x1: 94, y1: 532,
        },
      },
      [FIELDS.FINGERPRINTS_DATE]: { x: 260, y: 550 },//'27_printsDate'
      [FIELDS.PERMISSION_NAME]: { x: 150, y: 620 },//'28_permExpired'
      [FIELDS.PERMISSION_STARTDATE]: { x: 413, y: 620 },//'28_permStartDate'
      [FIELDS.PERMISSION_ENDDATE]: { x: 511, y: 620 },//'28_permEndDate'
      '29_entryStartDate': { x: 90, y: 665 },//'29_entryStartDate'
      '30_entryEndDate': { x: 360, y: 665 },//'30_entryEndDate'

      [FIELDS.INVATE_COMPANY_CONTACT_NAME]: { x: 125, y: 775 },//'31_invatePerson'
      [FIELDS.INVATE_COMPANY_CONTACT_ADRESS]: { x: 125, y: 955 },//'31_invatePersonAdress'
      [FIELDS.INVATE_COMPANY_CONTACT_PHONE]: { x: 435, y: 955 }//'31_invatePersonPhone'
    },
    {
      [FIELDS.INVATE_COMPANY]: { x: 90, y: 120 },//'32_attractingCompany'
      [FIELDS.INVATE_COMPANY_PHONE]: { x: 440, y: 120 },//'32_attractingCompanyPhone'
      [FIELDS.INVATE_COMPANY_ADRESS]: { x: 95, y: 220 },//'32_attractingCompanyAdress'
      //[FIELDS.PAYER]
      '33_costs': { x: 385, y: 275 },//'33_costs'
      '33_costs_left': {//'33_costs_left'
        0: {
          x1: 70, y1: 302,
        },
        1: {
          x1: 70, y1: 386,
        },
        2: {
          x1: 70, y1: 398,
        },
        3: {
          x1: 70, y1: 412,
        },
        4: {
          x1: 70, y1: 421,
        },
        5: {
          x1: 70, y1: 447,
        },
        6: {
          x1: 70, y1: 460,
        },
      },
      '33_costs_right': {//'33_costs_right'
        0: {
          x1: 340, y1: 302,
        },
        1: {
          x1: 340, y1: 348,
        },
        2: {
          x1: 340, y1: 372,
        },
        3: {
          x1: 340, y1: 423,
        },
        4: {
          x1: 340, y1: 433,
        },
        5: {
          x1: 340, y1: 458,
        },
        6: {
          x1: 340, y1: 479,
        },
        7: {
          x1: 340, y1: 494,
        },
      },
      '33_costs_left_details': { x: 89, y: 487 },//'33_costs_left_details'
      '33_costs_right_details': { x: 458, y: 389 },//'33_costs_right_details'
      // '34_ES_citizen': { x: 225, y: 545 },//'34_ES_citizen'
      [FIELDS.RELATIVE_FAMILY]: { x: 115, y: 595 },//'34_ES_citizen_family'
      [FIELDS.RELATIVE_NAME]: { x: 440, y: 600 },//'34_ES_citizenName'
      [FIELDS.RELATIVE_BIRTH_DATE]: { x: 100, y: 660 },//'34_ES_citizen_birthday'
      [FIELDS.RELATIVE_CITIZENSHIP]: { x: 275, y: 660 },//'34_ES_citizen_citizenship'
      [FIELDS.RELATIVE_PASSPORT]: { x: 475, y: 680 },//'34_ES_citizen_passport'
      [FIELDS.RELATIVE_RANK]: {//'35_citMarried'
        "супруг/-а": {
          x1: 68, y1: 721,
        },
        "ребенок": {
          x1: 127, y1: 721,
        },
        "внук/-чка": {
          x1: 174, y1: 721,
        },
        "иждивенец": {
          x1: 226, y1: 721,
        },
      },
      '36_placeAndDate': { x: 100, y: 800 },//'36_placeAndDate'
      '37_sign': { x: 400, y: 830 },//'37_sign'
      'sign_2': { x: 533, y: 876 },//'sign_2'
      'sign_3': { x: 349, y: 932 }//'sign_3'
    },
    {
      'dateAndPlace': { x: 137, y: 937 },//'dateAndPlace'
      'sign_1': { x: 433, y: 937 },//'sign_1'
    }
  ]
}