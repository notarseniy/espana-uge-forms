const MES_ES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

const formConfig = [
  {
    prefixTitle: 'Titular',
    titleEn: 'Applicant data',
    titleRu: 'Данные заявителя',
    name: 'dex',
    fieldGroups: [
      {
        titleRu: 'Персональные данные',
        titleEn: 'Personal data',
        fields: [
          {
            name: 'nombre',
            labelEn: 'Name',
            labelRu: 'Имя',
            labelEs: 'Nombre',
            type: 'text',
            required: true,
            column: 6
          },
          {
            name: 'apellido_1',
            labelEn: 'Surname',
            labelRu: 'Фамилия',
            labelEs: 'Apellido',
            type: 'text',
            required: true,
            column: 4
          },
          {
            name: 'apellido_2',
            labelEn: '2-nd surname',
            labelRu: '2-я фамилия',
            labelEs: 'Apellido 2',
            type: 'text',
            required: false,
            column: 6
          },
          {
            name: 'nacionalidad',
            labelEn: 'Nationality',
            labelRu: 'Национальность',
            labelEs: 'Nacionalidad',
            type: 'text',
            required: true,
            column: 4
          },
          {
            name: 'pais',
            labelEn: 'Country of birth',
            labelRu: 'Страна рождения',
            labelEs: 'País',
            type: 'text',
            required: true,
            column: 4
          },
          {
            name: 'passport',
            labelEn: 'Passport num.',
            labelRu: 'Номер паспорта',
            labelEs: 'Pasaporte',
            type: 'text',
            required: true,
            column: 4
          },
          {
            name: 'nie',
            labelEn: 'NIE',
            type: 'text',
            required: false,
            column: 4
          },
          {
            name: 'sexo',
            labelEn: 'Sex',
            labelRu: 'Пол',
            labelEs: 'Sexo',
            type: 'select',
            required: true,
            column: 6,
            options: [
              {
                value: 'H',
                labelEn: 'Man',
                labelRu: 'Мужской',
                labelEs: 'Hombre',
              },
              {
                value: 'M',
                labelEn: 'Woman',
                labelRu: 'Женский',
                labelEs: 'Mujer',
              },
              {
                value: 'X',
                labelEn: 'Other',
                labelRu: 'Другой',
                labelEs: 'Otro',
              },
            ],
          },
          {
            name: 'ec',
            labelEn: 'Marital status',
            labelRu: 'Семейное положение',
            labelEs: 'Estado civil',
            type: 'select',
            required: true,
            column: 6,
            options: [
              {
                value: 'S',
                labelEn: 'Single',
                labelRu: 'Холост',
                labelEs: 'Soltero',
              },
              {
                value: 'C',
                labelEn: 'Married',
                labelRu: 'Женат',
                labelEs: 'Casado',
              },
              {
                value: 'V',
                labelEn: 'Widowed',
                labelRu: 'Вдовец',
                labelEs: 'Viudo',
              },
              {
                value: 'D',
                labelEn: 'Divorced',
                labelRu: 'Разведен',
                labelEs: 'Divorciado',
              },
              {
                value: 'SP',
                labelEn: 'Separated',
                labelRu: 'Разделен',
                labelEs: 'Separado',
              },
            ],
          },
          {
            name: 'padre_nombre',
            labelEn: 'Father\'s name',
            labelRu: 'Имя отца',
            labelEs: 'Nombre del padre',
            type: 'text',
            required: true,
            column: 8
          },
          {
            name: 'madre_nombre',
            labelEn: 'Mother\'s name',
            labelRu: 'Имя матери',
            labelEs: 'Nombre de la madre',
            type: 'text',
            required: true,
            column: 8
          }
        ],
      },
      {
        titleRu: 'Дата и место рождения',
        titleEn: 'Birth and place of birth',
        fields: [
          {
            name: 'nac_dia',
            labelEn: 'Day',
            labelRu: 'День',
            labelEs: 'Día',
            type: 'number',
            required: true,
            column: 4
          },
          {
            name: 'nac_mes',
            labelEn: 'Month',
            labelRu: 'Месяц',
            labelEs: 'Mes',
            type: 'number',
            required: true,
            column: 4
          },
          {
            name: 'nac_anyo',
            labelEn: 'Year',
            labelRu: 'Год',
            labelEs: 'Año',
            type: 'number',
            required: true,
            column: 4
          },
          {
            name: 'nac_lugar',
            labelEn: 'Place of Birth',
            labelRu: 'Место рождения по паспорту',
            labelEs: 'Lugar de nacimiento',
            type: 'text',
            required: true,
            column: 8
          },
        ],
      },
      {
        titleRu: 'Адрес в Испании',
        titleEn: 'Address in Spain',
        fields: [
          {
            name: 'address_domicilio',
            labelEn: 'Address',
            labelRu: 'Адрес',
            labelEs: 'Domicilio',
            type: 'text',
            required: true,
            column: 8
          },
          {
            name: 'address_num',
            labelEn: 'House num.',
            labelRu: 'Номер дома',
            labelEs: 'Núm',
            type: 'text',
            required: true,
            column: 4
          },
          {
            name: 'address_piso',
            labelEn: 'Door',
            labelRu: 'Дверь',
            labelEs: 'Piso',
            type: 'text',
            required: true,
            column: 4
          },
          {
            name: 'address_localidad',
            labelEn: 'City',
            labelRu: 'Город',
            labelEs: 'Localidad',
            type: 'text',
            required: true,
            column: 6
          },
          {
            name: 'address_provincia',
            labelEn: 'Province',
            labelRu: 'Провинция',
            labelEs: 'Provincia',
            type: 'text',
            required: true,
            column: 5
          },
          {
            name: 'address_cp',
            labelEn: 'Postal Code',
            labelRu: 'Почтовый индекс',
            labelEs: 'Código Postal',
            type: 'text',
            required: true,
            column: 5
          },
        ],
      },
      {
        titleRu: 'Контактные данные',
        titleEn: 'Contact information',
        fields: [
          {
            name: 'phone',
            labelEn: 'Phone Number',
            labelRu: 'Телефон',
            labelEs: 'Teléfono de contacto',
            type: 'text',
            required: true,
            column: 6
          },
          {
            name: 'email',
            labelEn: 'Email',
            type: 'text',
            required: true,
            column: 6
          },
        ],
      },
    ],
  },
  {
    titleEn: 'Representative data',
    titleRu: 'Данные представителя',
    titleEs: 'Datos del representante',
    name: 'dr',
    fieldGroups: [
      {
        titleRu: 'Персональные данные',
        titleEn: 'Personal data',
        fields: [
          {
            name: 'nombre',
            labelEn: 'Name',
            labelRu: 'Имя',
            labelEs: 'Nombre',
            type: 'text',
            required: true,
            column: 6
          },
          {
            name: 'apellido_1',
            labelEn: 'Surname',
            labelRu: 'Фамилия',
            labelEs: 'Apellido',
            type: 'text',
            required: true,
            column: 4
          },
          {
            name: 'apellido_2',
            labelEn: '2-nd surname',
            labelRu: '2-я фамилия',
            labelEs: 'Apellido 2',
            type: 'text',
            required: false,
            column: 6
          },
          {
            name: 'nie',
            labelEn: 'NIE',
            type: 'text',
            required: true,
            column: 4
          },
        ],
      },
      {
        titleRu: 'Адрес в Испании',
        titleEn: 'Address in Spain',
        fields: [
          {
            name: 'address_domicilio',
            labelEn: 'Address',
            labelRu: 'Адрес',
            labelEs: 'Domicilio',
            type: 'text',
            required: true,
            column: 8
          },
          {
            name: 'address_num',
            labelEn: 'House num.',
            labelRu: 'Номер дома',
            labelEs: 'Núm',
            type: 'text',
            required: true,
            column: 4
          },
          {
            name: 'address_piso',
            labelEn: 'Door',
            labelRu: 'Дверь',
            labelEs: 'Piso',
            type: 'text',
            required: true,
            column: 4
          },
          {
            name: 'address_localidad',
            labelEn: 'City',
            labelRu: 'Город',
            labelEs: 'Localidad',
            type: 'text',
            required: true,
            column: 6
          },
          {
            name: 'address_provincia',
            labelEn: 'Province',
            labelRu: 'Провинция',
            labelEs: 'Provincia',
            type: 'text',
            required: true,
            column: 5
          },
          {
            name: 'address_cp',
            labelEn: 'Postal Code',
            labelRu: 'Почтовый индекс',
            labelEs: 'Código Postal',
            type: 'text',
            required: true,
            column: 5
          },
        ],
      },
      {
        titleRu: 'Контактные данные',
        titleEn: 'Contact information',
        fields: [
          {
            name: 'phone',
            labelEn: 'Phone Number',
            labelRu: 'Телефон',
            labelEs: 'Teléfono de contacto',
            type: 'text',
            required: true,
            column: 6
          },
          {
            name: 'email',
            labelEn: 'Email',
            type: 'text',
            required: true,
            column: 6
          },
        ],
      },
    ],
  },
  {
    titleEn: 'Signature of documents',
    titleRu: 'Подпись документов',
    name: 'fir',
    fieldGroups: [
      {
        name:'fir',
        fields: [
          {
            name: 'provincia',
            labelEn: 'Province',
            labelRu: 'Провинция',
            labelEs: 'Provincia',
            type: 'text',
            required: true,
            column: 7
          },
          {
            name: 'dia',
            labelEn: 'Day',
            labelRu: 'День',
            labelEs: 'Día',
            type: 'number',
            required: true,
            column: 3,
            defaultValue: `${new Date().getDate()}`,
          },
          {
            name: 'mes',
            labelEn: 'Month',
            labelRu: 'Месяц',
            labelEs: 'Mes',
            type: 'number',
            required: true,
            column: 3,
            defaultValue: `${MES_ES[(new Date().getMonth())]} test`,
          },
          {
            name: 'anyo',
            labelEn: 'Year',
            labelRu: 'Год',
            labelEs: 'Año',
            type: 'number',
            required: true,
            column: 3,
            defaultValue: `${new Date().getFullYear()} test`,
          },
        ],
      },
    ],
  },
  {
    titleEn: 'Settings',
    titleRu: 'Настройки',
    name: 'settings',
    fieldGroups: [
      {
        name: 'files',
        titleRu: 'Какие файлы сгененировать?',
        titleEn: 'Which files to generate?',
        fields: [
          {
            name: 'mi_t',
            labelEn: 'MI_T',
            type: 'checkbox',
            defaultValue: false,
            column: 7
          },
          {
            name: 'declaracion_penales',
            labelEn: 'Declaracion de carecer de antecedentes penales',
            type: 'checkbox',
            defaultValue: true,
            column: 7
          },
          {
            name: 'designacion_de_representante',
            labelEn: 'Designacion de representante',
            type: 'checkbox',
            defaultValue: false,
            column: 7
          },
          {
            name: 'reta_letter',
            labelEn: 'RETA Letter',
            type: 'checkbox',
            defaultValue: false,
            column: 7
          },
        ],
      },
    ],
  },
]

export default formConfig