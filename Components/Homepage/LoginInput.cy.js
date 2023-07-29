import React from 'react'
import LoginInput from './LoginInput'

describe('<LoginInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoginInput />)
  })
})