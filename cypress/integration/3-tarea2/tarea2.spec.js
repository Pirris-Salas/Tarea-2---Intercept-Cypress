describe('Tarea 2 - Intercept', ()=>{

    it('Intercepting TSE Website', ()=>{
        let myID= '115710810'
        cy.visit('https://www.tse.go.cr/dondevotar/')

        cy.intercept({
            method: 'POST',
            url: 'https://www.tse.go.cr/dondevotar/prRemoto.aspx/ObtenerDondeVotar'
        },
        {
            statusCode: 200,
            body: 
                {"d":{"success":true,"lista":{"cedula":112500751,"nombre":"BRYAN JAFET","primerApellido":"RUIZ","segundoApellido":"GONZALEZ","alias":" ","genero":"1","descripcionProvincia":"SAN JOSE","descripcionCanton":"ALAJUELITA","descripcionDistrito":"SAN FELIPE","nombreCentroVotacion":"ESCUELA SAN FELIPE","junta":1303,"numeroElector":131,"direccionEscuela":"DE LA DELEGACION 100 MTS OESTE Y 100 MTS SUR","url":"https://maps.google.com/maps/ms?msid=206594451939537033415.0004eb75448dbbc9c3249\u0026msa=0\u0026ll=9.901821,-84.105017\u0026spn=0.002296,0.003425\u0026iwloc=0004eb7548a39179fab35","nombreCompleto":"BRYAN JAFET  RUIZ  GONZALEZ","codElectoral":110005,"codigoDistAdmin":0}}}
            
        }).as('interceptedResponse')

        cy.get('input.x30').type(myID)
        cy.get('#btn-consultar').click()

        cy.wait('@interceptedResponse')
        cy.get('.fsb.dataNombre').should('have.text','BRYAN JAFET  RUIZ  GONZALEZ')
        
        
    })
})
