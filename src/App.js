import React, { useCallback, useMemo } from 'react'

import * as Yup from 'yup';
import { PDFDocument } from 'pdf-lib'
import download from 'downloadjs'

import { useFormik } from 'formik'

import { styled } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid'
import Typography from '@mui/joy/Typography'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import FormHelperText from '@mui/joy/FormHelperText'
import Input from '@mui/joy/Input'
import Checkbox from '@mui/joy/Checkbox'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Button from '@mui/joy/Button'

import formConfig from './formConfig'

import './App.css'

async function downloadPdf(url) {
  // Fetch the PDF with form fields
  const formPdfBytes = await fetch(url).then(res => res.arrayBuffer())

  // Load a PDF with form fields
  const pdfDoc = await PDFDocument.load(formPdfBytes)

  return pdfDoc;
}



/*
[
  
]
*/

function App() {
  const form = useFormik({
    initialValues: generateInitialValues(formConfig),
    validationSchema: generateValidationSchema(formConfig),
    onSubmit: handleSubmit
  })

  /*
  data.forEach((field) => {
    initialValues[field.name] = field.value || '';
    if (field.required) {
      validationSchema[field.name] = Yup.string().required(`${field.label} is required`);
    }
  });
  */

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

  function generateValidationSchema(formConfig) {
    const validationSchema = {}
    formConfig.forEach((section) => {
      section.fieldGroups.forEach((fieldGroup) => {
        fieldGroup.fields.forEach((field) => {
          const fieldName = `${section.name}_${field.name}`;
          if (field.required) {
            validationSchema[fieldName] = Yup.string().required('Required field / Обязательное поле');
          }
        })
      })
    })
    return Yup.object().shape(validationSchema);
  }

  const FormSection = React.memo(({ section, form }) => (
    <div
      key={section.name}
      style={{
        marginBottom: '20px'
      }}
    >
      <Typography level="h2" sx={{ marginBottom: '10px' }}>
        {section.prefixTitle ? `${section.prefixTitle}: ` : ''}{section.titleEn}{section.titleRu ? ` / ${section.titleRu}` : ''}
      </Typography>
      {section.fieldGroups.map((fieldGroup, index) => (
        <FieldGroup
          key={fieldGroup.name}
          section={section}
          fieldGroup={fieldGroup}
          form={form}
        />
      ))}
    </div>
  ));
  
  const FieldGroup = React.memo(({ section, fieldGroup, form }) => (
    <div
      key={`${section.name}_${fieldGroup.name}`}
    >
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
            <Field key={fieldName} field={field} fieldName={fieldName} form={form} />
          );
        })}
      </Grid>
    </div>
  ));
  
  const Field = React.memo(({ field, fieldName, form }) => (
    <Grid
      key={fieldName}
      xs={field.column}
    >
      <FormControl error={form.errors[fieldName]}>
        {field.type !== 'checkbox' ? (
          <FormLabel>
            {field.labelEn}{field.labelRu ? ` / ${field.labelRu}` : ''}
          </FormLabel>
        ) : null}
        {(() => {
          if (field.type === 'select') {
            return (
              <Select
                id={fieldName}
                name={fieldName}
                defaultValue={form.values[fieldName] || null}
                placeholder={field.labelEs || field.labelEn}
                onChange={(event, newValue) => {
                  form.handleChange(event)
                  form.setFieldValue(fieldName, newValue)
                }}
              >
                {field.options.map((option, index) => (
                  <Option key={index} value={option.value}>
                    {option.labelEn} / {option.labelRu} / {option.labelEs}
                  </Option>
                ))}
              </Select>
            );
          } else if (field.type === 'checkbox') {
            return (
              <Checkbox
                id={fieldName}
                name={fieldName}
                defaultChecked={form.values[fieldName] || ''}
                label={field.labelEs || field.labelEn}
                onChange={form.handleChange}
              />
            );
          } else {
            return (
              <Input
                id={fieldName}
                name={fieldName}
                defaultValue={form.values[fieldName] || ''}
                placeholder={field.labelEs || field.labelEn}
                onChange={form.handleChange}
              />
            );
          }
        })()}
        {form.errors[fieldName] ? (
          <FormHelperText>{form.errors[fieldName]}</FormHelperText>
        ) : null}
      </FormControl>
    </Grid>
  ));
  
  const generateForm = useCallback((formConfig, form) => {
    return formConfig.map((section, index) => (
      <FormSection
        key={section.name}
        section={section}
        form={form}
      />
    ))
  }, [form.errors]);

  async function handleSubmit() {
    console.log('handleSubmit', form.values);
    const combinedApellidos = (`${form.values.dex_apellido_1 || ''} ${form.values.dex_apellido_2 || ''}`).trim();

    // Get all fields in the PDF by their names

    // Fill in fields
    if (form.values.settings_declaracion_penales) {
      const declaracionPenalesPdf = await downloadPdf(process.env.PUBLIC_URL + '/files/DECLARACION_DE_CARECER_ANTECEDENTES_DE_PENALES.pdf')
      const declaracionPenalesForm = declaracionPenalesPdf.getForm()

      const declaracionPenalesFields = {
        dex: {
          nombre_apellidos: declaracionPenalesForm.getTextField('DEX_NOM_APE'),
          nacionalidad: declaracionPenalesForm.getTextField('DEX_NACION'),
          nac_dia: declaracionPenalesForm.getTextField('DEX_DIA_NAC'),
          nac_mes: declaracionPenalesForm.getTextField('DEX_MES_NAC'),
          nac_anyo: declaracionPenalesForm.getTextField('DEX_ANYO_NAC'),
          passport_nie: declaracionPenalesForm.getTextField('DEX_PASANIE'),
          address_domicilio: declaracionPenalesForm.getTextField('DEX_DOMIC'),
          address_cp: declaracionPenalesForm.getTextField('DEX_CP'),
          address_localidad: declaracionPenalesForm.getTextField('DEX_LOCAL'),
          address_provincia: declaracionPenalesForm.getTextField('DEX_PROV'),
        },
        fir: {
          provincia: declaracionPenalesForm.getTextField('FIR_PROV'),
          dia: declaracionPenalesForm.getTextField('FIR_DIA'),
          mes: declaracionPenalesForm.getTextField('FIR_MES'),
          anyo: declaracionPenalesForm.getTextField('FIR_ANYO'),
        },
      }

      declaracionPenalesFields.dex.nombre_apellidos.setText(`${form.values.dex_nombre} ${combinedApellidos}`)
      declaracionPenalesFields.dex.nacionalidad.setText(form.values.dex_nacionalidad)
      declaracionPenalesFields.dex.passport_nie.setText(form.values.dex_nie || form.values.dex_passport)
      declaracionPenalesFields.dex.nac_dia.setText(form.values.dex_nac_dia)
      declaracionPenalesFields.dex.nac_mes.setText(form.values.dex_nac_mes)
      declaracionPenalesFields.dex.nac_anyo.setText(form.values.dex_nac_anyo)
      declaracionPenalesFields.dex.address_domicilio.setText(
        `${form.values.dex_address_domicilio} ${form.values.dex_address_num} ${form.values.dex_address_piso || ''}`
      )
      declaracionPenalesFields.dex.address_cp.setText(form.values.dex_address_cp)
      declaracionPenalesFields.dex.address_localidad.setText(form.values.dex_address_localidad)
      declaracionPenalesFields.dex.address_provincia.setText(form.values.dex_address_provincia)

      declaracionPenalesFields.fir.provincia.setText(form.values.fir_provincia)
      declaracionPenalesFields.fir.dia.setText(form.values.fir_dia)
      declaracionPenalesFields.fir.mes.setText(form.values.fir_mes)
      declaracionPenalesFields.fir.anyo.setText(form.values.fir_anyo)

      const pdfBytes = await declaracionPenalesPdf.save()

      download(pdfBytes, "DECLARACION_DE_CARECER_ANTECEDENTES_DE_PENALES.pdf", "application/pdf");
    }

    if (form.values.settings_designacion_de_representante) {
      const designacionDeRepresentantePdf = await downloadPdf(process.env.PUBLIC_URL + '/files/DESIGNACION_DE_REPRESENTANTE.pdf')
      const designacionDeRepresentanteForm = designacionDeRepresentantePdf.getForm()

      const designacionDeRepresentanteFields = {
        dex: {
          nombre: designacionDeRepresentanteForm.getTextField('DEX_NOMBRE'),
          apellido_1: designacionDeRepresentanteForm.getTextField('DEX_APE1'),
          apellido_2: designacionDeRepresentanteForm.getTextField('DEX_APE2'),
          nacionalidad: designacionDeRepresentanteForm.getTextField('DEX_NACION'),
          nie: designacionDeRepresentanteForm.getTextField('DEX_NIE1'),
          passport: designacionDeRepresentanteForm.getTextField('DEX_PASA'),
          nac_dia: designacionDeRepresentanteForm.getTextField('DEX_DIA_NAC'),
          nac_mes: designacionDeRepresentanteForm.getTextField('DEX_MES_NAC'),
          nac_anyo: designacionDeRepresentanteForm.getTextField('DEX_ANYO_NAC'),
          nac_lugar: designacionDeRepresentanteForm.getTextField('DEX_LN'),
          pais: designacionDeRepresentanteForm.getTextField('DEX_PAIS'),
          padre_nombre: designacionDeRepresentanteForm.getTextField('DEX_NP'),
          madre_nombre: designacionDeRepresentanteForm.getTextField('DEX_NM'),
          ec: designacionDeRepresentanteForm.getRadioGroup('DEX_EC'),
          address_domicilio: designacionDeRepresentanteForm.getTextField('DEX_DOMIC'),
          address_num: designacionDeRepresentanteForm.getTextField('DEX_NUM'),
          address_piso: designacionDeRepresentanteForm.getTextField('DEX_PISO'),
          address_cp: designacionDeRepresentanteForm.getTextField('DEX_CP'),
          address_localidad: designacionDeRepresentanteForm.getTextField('DEX_LOCAL'),
          address_provincia: designacionDeRepresentanteForm.getTextField('DEX_PROV'),
          phone: designacionDeRepresentanteForm.getTextField('DEX_TFNO'),
          email: designacionDeRepresentanteForm.getTextField('DEX_EMAIL'),
        },
        residenceType: designacionDeRepresentanteForm.getTextField('RESIDENCE_TYPE'),
        dr: {
          nie: designacionDeRepresentanteForm.getTextField('DR_NIE'),
          razonSocial: designacionDeRepresentanteForm.getTextField('DR_RS'),
          nombre: designacionDeRepresentanteForm.getTextField('DR_NOMBRE'),
          apellido_1: designacionDeRepresentanteForm.getTextField('DR_APE1'),
          apellido_2: designacionDeRepresentanteForm.getTextField('DR_APE2'),
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



      const pdfBytes = await designacionDeRepresentantePdf.save()

      download(pdfBytes, "DESIGNACION_DE_REPRESENTANTE.pdf", "application/pdf");
    }

    if (form.values.settings_reta_letter) {
      const retaLetterPdf = await downloadPdf(process.env.PUBLIC_URL + '/files/RETA_LETTER.pdf')
      const retaLetterForm = retaLetterPdf.getForm()

      const retaLetterFields = {
        dex: {
          nombre_apellidos: retaLetterForm.getTextField('DEX_NOM_APE'),
        },
        fir: {
          provincia: retaLetterForm.getTextField('FIR_PROV'),
          dia: retaLetterForm.getTextField('FIR_DIA'),
          mes: retaLetterForm.getTextField('FIR_MES'),
          anyo: retaLetterForm.getTextField('FIR_ANYO'),
        },
      }


      const pdfBytes = await retaLetterPdf.save()

      download(pdfBytes, "RETA_LETTER.pdf", "application/pdf");
    }

    if (form.values.settings_mi_t) {
      const mitPdf = await downloadPdf(process.env.PUBLIC_URL + '/files/MI_T.pdf')
      const mitForm = mitPdf.getForm()

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
          nac_lugar: mitForm.getTextField('DEX_LN'),
          sexo: mitForm.getRadioGroup('DEX_SEXO'),
          ec: mitForm.getRadioGroup('DEX_EC'),
          nac_dia: mitForm.getTextField('DEX_DIA_NAC'),
          nac_mes: mitForm.getTextField('DEX_MES_NAC'),
          nac_anyo: mitForm.getTextField('DEX_ANYO_NAC'),
          pais: mitForm.getTextField('DEX_PAIS'),
          nacionalidad: mitForm.getTextField('DEX_NACION'),
          padre_nombre: mitForm.getTextField('DEX_NP'),
          madre_nombre: mitForm.getTextField('DEX_NM'),
          address_domicilio: mitForm.getTextField('DEX_DOMIC'),
          address_num: mitForm.getTextField('DEX_NUM'),
          address_piso: mitForm.getTextField('DEX_PISO'),
          address_localidad: mitForm.getTextField('DEX_LOCAL'),
          address_cp: mitForm.getTextField('DEX_CP'),
          address_provincia: mitForm.getTextField('DEX_PROV'),
          address_country: mitForm.getTextField('DEX_PAISRES'),
          phone: mitForm.getTextField('DEX_TFNO'),
          email: mitForm.getTextField('DEX_EMAIL'),
        },
        // datos de la empresa/entidad en espana
        dee: {
          nombreRazonSocial: mitForm.getTextField('DEE_NOM'),
          dni: mitForm.getTextField('DEE_DNI'),
          actividad: mitForm.getTextField('DEE_ACT'),
          ocupacion: mitForm.getTextField('DEE_OCUP'),
          address_domicilio: mitForm.getTextField('DEE_DOMIC'),
          address_num: mitForm.getTextField('DEE_NUM'),
          address_piso: mitForm.getTextField('DEE_PISO'),
          address_localidad: mitForm.getTextField('DEE_LOCAL'),
          address_cp: mitForm.getTextField('DEE_CP'),
          address_provincia: mitForm.getTextField('DEE_PROV'),
          phone: mitForm.getTextField('DEE_TFNO'),
          email: mitForm.getTextField('DEE_EMAIL'),
          nombre_razon_social_desplasa: mitForm.getTextField('DEE_NRZE'),
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


      const pdfBytes = await mitPdf.save()

      download(pdfBytes, "MI_T.pdf", "application/pdf");
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    
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

      <form onSubmit={form.handleSubmit}>
        {useMemo(() => generateForm(formConfig, form), [form.errors])}

        <Button
          onClick={() => { console.log('values', form.values) }}
        >
          Check form values
        </Button>

        <Button
          type="submit"
        >
          Fill PDFs
        </Button>
      </form>
    </div>
  );
}

export default App;
