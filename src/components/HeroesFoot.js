import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
  width: 100%;
  height: 10rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(auto, 1fr));
  position: absolute;
  bottom: -10rem;
  background: var(--black);
  color: var(--white);
  .first,
  .second {
    border-right: 0.5rem solid var(--green);
  }
  // Mobile view
  @media only screen and (max-width: 565px) {
    height: 19rem;
    grid-template-columns: 1fr;
    .first,
    .second {
      border-right: none;
      border-bottom: 0.5rem solid var(--green);
    }
  }
  // Landscape view
  @media only screen and (max-height: 600px) {
    height: 6rem;
  }
`

const Three = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    padding: 0 1rem;
    font-size: 3rem;
    text-align: center;
  }
  // Mobile view
  @media only screen and (max-width: 565px) {
    padding: 1rem;
  }
  // Landscape view
  @media only screen and (max-height: 600px) {
    p {
      font-size: 2rem;
    }
  }
`

export default function HeroesFoot() {
  const { hero } = useStaticQuery(graphql`
    query {
      hero: allSanityHero {
        nodes {
          id
          footerthree
          footertwo
          footerone
        }
      }
    }
  `)
  const { nodes } = hero
  return (
    <>
      {nodes.map(node => (
        <Footer key={node.id}>
          <Three className="first">
            <p>{node.footerone}</p>
          </Three>
          <Three className="second">
            <p>{node.footertwo}</p>
          </Three>
          <Three>
            <p>{node.footerthree}</p>
          </Three>
        </Footer>
      ))}
    </>
  )
}
