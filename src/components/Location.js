import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-flex;
  font-size: 2.4rem;
  padding: 2rem 0;
  a {
    font-size: 2.4rem;
  }
  // Mobile view
  @media only screen and (max-width: 500px) {
    display: flex;
    flex-flow: column wrap;
    a,
    p {
      font-size: 2rem;
    }
  }
  // Landscape view
  @media only screen and (max-height: 600px) {
    height: calc(100% + 10rem);
  }
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  // Mobile view
  @media only screen and (max-width: 750px) {
    height: 90%;
  }
  @media only screen and (max-height: 500px) {
    height: calc(100% - 15rem);
  }
`

const Address = styled.p`
  padding-right: 4rem;
  padding-bottom: 1rem;
`

const Email = styled.a`
  padding-bottom: 1rem;
  word-break: break-word;
`

const Phone = styled.a``

export default function Location() {
  const { location } = useStaticQuery(graphql`
    query {
      location: allSanityContact {
        nodes {
          id
          title
          streetaddress
          citystatezip
          email
          phone
        }
      }
    }
  `)
  const { nodes } = location
  return (
    <>
      {nodes.map(node => (
        <Section key={node.id}>
          <Container>
            <Address>{node.streetaddress}</Address>
            <Address>{node.citystatezip}</Address>
          </Container>
          <Container>
            <Email href={`mailto:${node.email}`}>{node.email}</Email>
            <Phone href={`tel:${node.phone}`}>{`(${node.phone
              .split('', 3)
              .join('')}) ${node.phone
              .split('')
              .slice(3, 6)
              .join('')}-${node.phone.split('').slice(6, 10).join('')}`}</Phone>
          </Container>
        </Section>
      ))}
    </>
  )
}
