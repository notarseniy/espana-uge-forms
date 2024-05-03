import { PDFDocument } from 'pdf-lib'
import download from 'downloadjs'

import { useFormik } from 'formik'

import { styled } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid'
import Typography from '@mui/joy/Typography'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Button from '@mui/joy/Button'

import './App.css'

async function downloadPdf(url) {
  // Fetch the PDF with form fields
  const formPdfBytes = await fetch(url).then(res => res.arrayBuffer())

  // Load a PDF with form fields
  const pdfDoc = await PDFDocument.load(formPdfBytes)

  return pdfDoc;
}

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
            name: 'apellido1',
            labelEn: 'Surname',
            labelRu: 'Фамилия',
            labelEs: 'Apellido',
            type: 'text',
            required: true,
            column: 4
          },
          {
            name: 'apellido2',
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
            type: 'radio',
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
            type: 'radio',
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
            name: 'padreNombre',
            labelEn: 'Father\'s name',
            labelRu: 'Имя отца',
            labelEs: 'Nombre del padre',
            type: 'text',
            required: true,
            column: 8
          },
          {
            name: 'madreNombre',
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
            name: 'nacDia',
            labelEn: 'Day',
            labelRu: 'День',
            labelEs: 'Día',
            type: 'number',
            required: true,
            column: 4
          },
          {
            name: 'nacMes',
            labelEn: 'Month',
            labelRu: 'Месяц',
            labelEs: 'Mes',
            type: 'number',
            required: true,
            column: 4
          },
          {
            name: 'nacAnyo',
            labelEn: 'Year',
            labelRu: 'Год',
            labelEs: 'Año',
            type: 'number',
            required: true,
            column: 4
          },
          {
            name: 'nacLugar',
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
            name: 'addressDomicilio',
            labelEn: 'Address',
            labelRu: 'Адрес',
            labelEs: 'Domicilio',
            type: 'text',
            required: true,
            column: 8
          },
          {
            name: 'addressNum',
            labelEn: 'House num.',
            labelRu: 'Номер дома',
            labelEs: 'Núm',
            type: 'text',
            required: true,
            column: 4
          },
          {
            name: 'addressPiso',
            labelEn: 'Door',
            labelRu: 'Дверь',
            labelEs: 'Piso',
            type: 'text',
            required: true,
            column: 4
          },
          {
            name: 'addressLocalidad',
            labelEn: 'City',
            labelRu: 'Город',
            labelEs: 'Localidad',
            type: 'text',
            required: true,
            column: 6
          },
          {
            name: 'addressProvincia',
            labelEn: 'Province',
            labelRu: 'Провинция',
            labelEs: 'Provincia',
            type: 'text',
            required: true,
            column: 5
          },
          {
            name: 'addressCp',
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
            name: 'apellido1',
            labelEn: 'Surname',
            labelRu: 'Фамилия',
            labelEs: 'Apellido',
            type: 'text',
            required: true,
            column: 4
          },
          {
            name: 'apellido2',
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
            name: 'addressDomicilio',
            labelEn: 'Address',
            labelRu: 'Адрес',
            labelEs: 'Domicilio',
            type: 'text',
            required: true,
            column: 8
          },
          {
            name: 'addressNum',
            labelEn: 'House num.',
            labelRu: 'Номер дома',
            labelEs: 'Núm',
            type: 'text',
            required: true,
            column: 4
          },
          {
            name: 'addressPiso',
            labelEn: 'Door',
            labelRu: 'Дверь',
            labelEs: 'Piso',
            type: 'text',
            required: true,
            column: 4
          },
          {
            name: 'addressLocalidad',
            labelEn: 'City',
            labelRu: 'Город',
            labelEs: 'Localidad',
            type: 'text',
            required: true,
            column: 6
          },
          {
            name: 'addressProvincia',
            labelEn: 'Province',
            labelRu: 'Провинция',
            labelEs: 'Provincia',
            type: 'text',
            required: true,
            column: 5
          },
          {
            name: 'addressCp',
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
            defaultValue: new Date().getDate(),
          },
          {
            name: 'mes',
            labelEn: 'Month',
            labelRu: 'Месяц',
            labelEs: 'Mes',
            type: 'number',
            required: true,
            column: 3,
            defaultValue: new Date().getMonth() + 1,
          },
          {
            name: 'anyo',
            labelEn: 'Year',
            labelRu: 'Год',
            labelEs: 'Año',
            type: 'number',
            required: true,
            column: 3,
            defaultValue: new Date().getFullYear(),
          },
        ],
      },
    ],
  },
]

/*
[
  
]
*/

function App() {
  const form = useFormik({
    initialValues: generateInitialValues(formConfig),
    // validationSchema: validationSchema,
    onSubmit: handleButtonClick
  })

  function generateInitialValues(formConfig) {
    const initialValues = {}
    formConfig.forEach((section) => {
      section.fieldGroups.forEach((fieldGroup) => {
        fieldGroup.fields.forEach((field) => {
          const fieldName = `${section.name}_${field.name}`;
          initialValues[fieldName] = field.defaultValue || ''
        })
      })
    })
    return initialValues
  }

  function generateForm(formConfig, form) {
    return formConfig.map((section, index) => {
      return (
        <div
          key={index}
          style={{
            marginBottom: '20px'
          }}
        >
          <Typography level="h2" sx={{ marginBottom: '10px' }}>
            {section.prefixTitle ? `${section.prefixTitle}: ` : ''}{section.titleEn}{section.titleRu ? ` / ${section.titleRu}` : ''}
          </Typography>
          {section.fieldGroups.map((fieldGroup, index) => {
            return (
              <>
                {fieldGroup.titleEn ? (
                  <Typography level="h3" sx={{ marginBottom: '15px' }}>
                    {fieldGroup.titleEn}{fieldGroup.titleRu ? ` / ${fieldGroup.titleRu}` : ''}
                  </Typography>
                ) : null}
                <Grid
                  container
                  spacing={1}
                  columns={16}
                  sx={{
                    flexGrow: 1,
                    marginBottom: '15px',
                  }}
                >
                  {fieldGroup.fields.map((field, index) => {
                    const fieldName = `${section.name}_${field.name}`;
                    return (
                      <Grid
                        xs={field.column}
                      >
                        <FormControl>
                          <FormLabel>
                            {field.labelEn}{field.labelRu ? ` / ${field.labelRu}` : ''}
                          </FormLabel>
                          {field.type === 'radio' ? (
                            <Select
                              id={field.name}
                              name={`${section.name}_${field.name}`}
                              value={form.values[fieldName]}
                              placeholder={field.labelEs || field.labelEn}
                              onChange={form.handleChange}
                            >
                              {field.options.map((option, index) => (
                                <Option key={index} value={option.value}>
                                  {option.labelEn} / {option.labelRu} / {option.labelEs}
                                </Option>
                              ))}
                            </Select>
                          ) : (
                            <Input
                              id={field.name}
                              name={`${section.name}_${field.name}`}
                              value={form.values[fieldName]}
                              placeholder={field.labelEs || field.labelEn}
                              onChange={form.handleChange}
                            />
                          )}
                        </FormControl>
                      </Grid>
                    )
                  })}
                </Grid>
              </>
            )
          })}
        </div>
      );
    })
  }

  async function handleButtonClick(values) {
    const declaracionPenalesPdf = await downloadPdf(process.env.PUBLIC_URL + '/files/DECLARACION_DE_CARECER_ANTECEDENTES_DE_PENALES.pdf')
    const designacionDeRepresentantePdf = await downloadPdf(process.env.PUBLIC_URL + '/files/DESIGNACION_DE_REPRESENTANTE.pdf')
    const retaLetterPdf = await downloadPdf(process.env.PUBLIC_URL + '/files/RETA_LETTER.pdf')
    const mitPdf = await downloadPdf(process.env.PUBLIC_URL + '/files/MI_T.pdf')

    const declaracionPenalesForm = declaracionPenalesPdf.getForm()
    const designacionDeRepresentanteForm = designacionDeRepresentantePdf.getForm()
    const retaLetterForm = retaLetterPdf.getForm()
    const mitForm = mitPdf.getForm()

    // Get all fields in the PDF by their names
    const declaracionPenalesFields = {
      dex: {
        nombreApellidos: declaracionPenalesForm.getTextField('DEX_NOM_APE'),
        nacionalidad: declaracionPenalesForm.getTextField('DEX_NACION'),
        passportNie: declaracionPenalesForm.getTextField('DEX_PASANIE'),
        addressDomicilio: declaracionPenalesForm.getTextField('DEX_DOMIC'),
        addressCp: declaracionPenalesForm.getTextField('DEX_CP'),
        addressLocalidad: declaracionPenalesForm.getTextField('DEX_LOCAL'),
        addressProvincia: declaracionPenalesForm.getTextField('DEX_PROV'),
      },
      fir: {
        provincia: declaracionPenalesForm.getTextField('FIR_PROV'),
        dia: declaracionPenalesForm.getTextField('FIR_DIA'),
        mes: declaracionPenalesForm.getTextField('FIR_MES'),
        anyo: declaracionPenalesForm.getTextField('FIR_ANYO'),
      },
    }
    
    const designacionDeRepresentanteFields = {
      dex: {
        nombre: designacionDeRepresentanteForm.getTextField('DEX_NOMBRE'),
        apellido_1: designacionDeRepresentanteForm.getTextField('DEX_APE1'),
        apellido_2: designacionDeRepresentanteForm.getTextField('DEX_APE2'),
        nacionalidad: designacionDeRepresentanteForm.getTextField('DEX_NACION'),
        nie: designacionDeRepresentanteForm.getTextField('DEX_NIE1'),
        passport: designacionDeRepresentanteForm.getTextField('DEX_PASA'),
        nacDia: designacionDeRepresentanteForm.getTextField('DEX_DIA_NAC'),
        nacMes: designacionDeRepresentanteForm.getTextField('DEX_MES_NAC'),
        nacAnyo: designacionDeRepresentanteForm.getTextField('DEX_ANYO_NAC'),
        nacLugar: mitForm.getTextField('DEX_LN'),
        pais: designacionDeRepresentanteForm.getTextField('DEX_PAIS'),
        padreNombre: designacionDeRepresentanteForm.getTextField('DEX_NP'),
        madreNombre: designacionDeRepresentanteForm.getTextField('DEX_NM'),
        ec: designacionDeRepresentanteForm.getRadioGroup('DEX_EC'),
        addressDomicilio: designacionDeRepresentanteForm.getTextField('DEX_DOMIC'),
        addressNum: designacionDeRepresentanteForm.getTextField('DEX_NUM'),
        addressPiso: designacionDeRepresentanteForm.getTextField('DEX_PISO'),
        addressCp: designacionDeRepresentanteForm.getTextField('DEX_CP'),
        addressLocalidad: designacionDeRepresentanteForm.getTextField('DEX_LOCAL'),
        addressProvincia: designacionDeRepresentanteForm.getTextField('DEX_PROV'),
        phone: designacionDeRepresentanteForm.getTextField('DEX_TFNO'),
        email: designacionDeRepresentanteForm.getTextField('DEX_EMAIL'),
      },
      residenceType: designacionDeRepresentanteForm.getTextField('RESIDENCE_TYPE'),
      dr: {
        nie: designacionDeRepresentanteForm.getTextField('DR_NIE'),
        razonSocial: designacionDeRepresentanteForm.getTextField('DR_RS'),
        nombre: designacionDeRepresentanteForm.getTextField('DR_NOMBRE'),
        apellido_1: designacionDeRepresentanteForm.getTextField('DR_APE1'),
        apellido_1: designacionDeRepresentanteForm.getTextField('DR_APE2'),
        addressDoicilio: designacionDeRepresentanteForm.getTextField('DR_DOMIC'),
        addressNum: designacionDeRepresentanteForm.getTextField('DR_NUM'),
        addressPiso: designacionDeRepresentanteForm.getTextField('DR_PISO'),
        addressLocalidad: designacionDeRepresentanteForm.getTextField('DR_LOCAL'),
        addressCp: designacionDeRepresentanteForm.getTextField('DR_CP'),
        addressProvincia: designacionDeRepresentanteForm.getTextField('DR_PROV'),
        phone: designacionDeRepresentanteForm.getTextField('DR_TFNO'),
        email: designacionDeRepresentanteForm.getTextField('DR_EMAIL'),
      },
      fir: {
        provincia: designacionDeRepresentanteForm.getTextField('FIR_PROV'),
        dia: designacionDeRepresentanteForm.getTextField('FIR_DIA'),
        mes: designacionDeRepresentanteForm.getTextField('FIR_MES'),
        anyo: designacionDeRepresentanteForm.getTextField('FIR_ANYO'),
      },
    }
    
    const retaLetterFields = {
      dex: {
        nombreApellidos: retaLetterForm.getTextField('DEX_NOM_APE'),
      },
      fir: {
        provincia: retaLetterForm.getTextField('FIR_PROV'),
        dia: retaLetterForm.getTextField('FIR_DIA'),
        mes: retaLetterForm.getTextField('FIR_MES'),
        anyo: retaLetterForm.getTextField('FIR_ANYO'),
      },
    }

    const mitFields = {
      // solicitud de autorización de residencia
      sa: mitForm.getRadioGroup('SA'),
      saSub: mitForm.getRadioGroup('SA_SUB'),
      // tipo de autorización
      ta: mitForm.getRadioGroup('SA'),
      taSub: mitForm.getRadioGroup('SA_SUB'),
      // datos del extranjero/a
      dex: {
        passport: mitForm.getTextField('DEX_PASA'),
        nie_1: mitForm.getTextField('DEX_NIE1'),
        nie_2: mitForm.getTextField('DEX_NIE_2'),
        nie_3: mitForm.getTextField('DEX_NIE_3'),
        apellidos: mitForm.getTextField('DEX_APE1'),
        nombre: mitForm.getTextField('DEX_NOMBRE'),
        nacLugar: mitForm.getTextField('DEX_LN'),
        sexo: mitForm.getRadioGroup('DEX_SEXO'),
        ec: mitForm.getRadioGroup('DEX_EC'),
        nacDia: mitForm.getTextField('DEX_DIA_NAC'),
        nacMes: mitForm.getTextField('DEX_MES_NAC'),
        nacAnyo: mitForm.getTextField('DEX_ANYO_NAC'),
        pais: mitForm.getTextField('DEX_PAIS'),
        nacionalidad: mitForm.getTextField('DEX_NACION'),
        padreNombre: mitForm.getTextField('DEX_NP'),
        madreNombre: mitForm.getTextField('DEX_NM'),
        addressDomicilio: mitForm.getTextField('DEX_DOMIC'),
        addressNum: mitForm.getTextField('DEX_NUM'),
        addressPiso: mitForm.getTextField('DEX_PISO'),
        addressLocalidad: mitForm.getTextField('DEX_LOCAL'),
        addressCp: mitForm.getTextField('DEX_CP'),
        addressProvincia: mitForm.getTextField('DEX_PROV'),
        addressCountry: mitForm.getTextField('DEX_PAISRES'),
        phone: mitForm.getTextField('DEX_TFNO'),
        email: mitForm.getTextField('DEX_EMAIL'),
      },
      // datos de la empresa/entidad en espana
      dee: {
        nombreRazonSocial: mitForm.getTextField('DEE_NOM'),
        dni: mitForm.getTextField('DEE_DNI'),
        actividad: mitForm.getTextField('DEE_ACT'),
        ocupacion: mitForm.getTextField('DEE_OCUP'),
        addressDomicilio: mitForm.getTextField('DEE_DOMIC'),
        addressNum: mitForm.getTextField('DEE_NUM'),
        addressPiso: mitForm.getTextField('DEE_PISO'),
        addressLocalidad: mitForm.getTextField('DEE_LOCAL'),
        addressCp: mitForm.getTextField('DEE_CP'),
        addressProvincia: mitForm.getTextField('DEE_PROV'),
        phone: mitForm.getTextField('DEE_TFNO'),
        email: mitForm.getTextField('DEE_EMAIL'),
        nombreRazonSocialDesplasa: mitForm.getTextField('DEE_NRZE'),
      },
      dr: {
        apellidos: mitForm.getTextField('DR_APELLIDOS'),
        nombre: mitForm.getTextField('DR_NOMBRE'),
        nie: mitForm.getTextField('DR_DNI'),
        phone: mitForm.getTextField('DR_TFNO'),
        email: mitForm.getTextField('DR_EMAIL'),
      },
      nrc: mitForm.getTextField('NRC_TITULAR'),
      fir: {
        provincia: mitForm.getTextField('FIR_PROV'),
        dia: mitForm.getTextField('FIR_DIA'),
        mes: mitForm.getTextField('FIR_MES'),
        anyo: mitForm.getTextField('FIR_ANYO'),
      },
    }

    // Fill in the basic info fields
    declaracionPenalesFields.dex.nombreApellidos.setText('Arseniy Maximov')
    declaracionPenalesFields.dex.nacionalidad.setText('Rusia')
    declaracionPenalesFields.dex.passportNie.setText('1337')
    declaracionPenalesFields.dex.addressDomicilio.setText('Vilanova i la Geltru')
    declaracionPenalesFields.dex.addressCp.setText('08800')
    declaracionPenalesFields.dex.addressLocalidad.setText('Carrer de la muralla, 26, 2')


    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await declaracionPenalesPdf.save()

    // Trigger the browser to download the PDF document
    download(pdfBytes, "DECLARACION_DE_CARECER_ANTECEDENTES_DE_PENALES.pdf", "application/pdf");
  }

  return (
    <div
      className="App"
    >
      <Typography level="h1">
        UGE Form Generator
      </Typography>
      <Typography level="h3" sx={{ marginBottom: '20px' }}>
        by <a href="https://t.me/notarseniy">@notarseniy</a>
      </Typography>

      {generateForm(formConfig, form)}

      <Button
        onClick={handleButtonClick}
      >
        Fill PDFs
      </Button>
    </div>
  );
}

export default App;
