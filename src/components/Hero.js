import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'
import SanityImage from 'gatsby-plugin-sanity-image'
import Cta from './Cta'

const Header = styled.header`
  height: 100%;
  position: relative;
  z-index: 0;
  // optional
  background-image: linear-gradient(
    to bottom,
    var(--white),
    var(--gray),
    var(--black)
  );
  img {
    position: absolute;
    @media only screen and (max-height: 400px) {
      top: -5rem;
    }
  }
  // Landscape view
  @media only screen and (max-height: 600px) {
    height: calc(100% + 10rem);
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  color: var(--white);
  text-align: center;
  z-index: 10;
  // Mobile view
  @media only screen and (max-width: 750px) {
    height: 90%;
  }
  @media only screen and (max-height: 500px) {
    height: calc(100% - 15rem);
  }
`

const Title = styled.h1`
  font-size: 8rem;
  line-height: 1;
  text-shadow: 0.1rem 0 0 var(--gray), -0.1rem 0 0 var(--gray),
    0 0.1rem 0 var(--gray), 0 -0.1rem 0 var(--gray);
  // Mobile view
  @media only screen and (max-width: 750px) {
    font-size: 6rem;
  }
  @media only screen and (max-width: 615px) {
    font-size: 5rem;
  }
  @media only screen and (max-width: 500px) {
    font-size: 3rem;
  }
  // Landscape view
  @media only screen and (max-height: 600px) {
    font-size: 3.75rem;
    margin: 0;
  }
`

const Motto = styled.h2`
  margin: 0;
  font-size: 3.5rem;
  text-shadow: 0.1rem 0 0 var(--gray), -0.1rem 0 0 var(--gray),
    0 0.1rem 0 var(--gray), 0 -0.1rem 0 var(--gray);
  .address {
    font-size: 3rem;
    @media only screen and (max-width: 615px) {
      font-size: 2.5rem;
    }
    @media only screen and (max-width: 500px) {
      font-size: 2rem;
    }
  }
  // Mobile view
  @media only screen and (max-width: 615px) {
    font-size: 3.5rem;
  }
  @media only screen and (max-width: 500px) {
    font-size: 2.15rem;
  }
  // Landscape view
  @media only screen and (max-height: 600px) {
    font-size: 2rem;
  }
`

export default function StoryHero() {
  const { hero } = useStaticQuery(graphql`
    query {
      hero: allSanityHero {
        nodes {
          id
          alt
          title
          source
          tagline
          image {
            asset {
              id
            }
            ...ImageWithPreview
          }
        }
      }
    }
  `)
  const { nodes } = hero
  return (
    <>
      {nodes.map(node => (
        <Header key={node.id}>
          {node.image ? (
            <SanityImage
              {...node.image}
              alt={node.alt}
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: 'fixed',
                objectFit: 'cover',
                auto: 'format',
              }}
            />
          ) : (
            <div />
          )}
          <Container>
            <Title>{node.title}</Title>
            <Motto>{node.tagline}</Motto>
            <Cta />
          </Container>
        </Header>
      ))}
    </>
  )
}
