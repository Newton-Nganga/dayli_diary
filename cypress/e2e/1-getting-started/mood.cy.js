describe('test mood component',()=>{
    beforeEach(()=>{
        //visit the dashboard component using the user created
        cy.visit('http://localhost:3000/dashboard/m6n50df888c5c1abd2efeb2a')

    })
    it('displays Dashboard content',()=>{
        //get all the components and match those that have a class 
        //.conent_section which should have only one element returned
        //
        cy.get('section #home').should('have.length',1)
        
        //check to confirm that the Home component contains a header text 'Welcome back'
    
    })


})