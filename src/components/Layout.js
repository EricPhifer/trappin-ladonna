import 'normalize.css'
import React from 'react'
import styled from 'styled-components'
import GlobalStyles from '../styles/GlobalStyles'
import Typography from '../styles/Typography'
import Copyright from './Copyright'
import Navigation from './Navigation'

const SiteStyles = styled.div`
  width: 100vw;
  min-height: 100vh;
  .copyright {
    bottom: -10rem;
  }
`

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      <Typography />
      <SiteStyles>
        <Navigation />
        {children}
        <Copyright />
      </SiteStyles>
    </>
  )
}
