import { PDFDocument } from 'pdf-lib';
import download from 'downloadjs';

import './App.css';

async function downloadPdf(url) {
  // Fetch the PDF with form fields
  const formPdfBytes = await fetch(url).then(res => res.arrayBuffer())

  // Load a PDF with form fields
  const pdfDoc = await PDFDocument.load(formPdfBytes)

  return pdfDoc;
}

function App() {

  async function handleButtonClick() {
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
        localidad: designacionDeRepresentanteForm.getTextField('DEX_LOCAL_PAIS'),
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
        lugarNac: mitForm.getTextField('DEX_LN'),
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
    <div className="App">
      <p>Click the button to fill form fields in an existing PDF document with <code>pdf-lib</code></p>
      <button
        onClick={handleButtonClick}
      >
        Fill PDF
      </button>
      <p className="small">(Your browser will download the resulting file)</p>
    </div>
  );
}

export default App;
