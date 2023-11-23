import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'
import SanityImage from 'gatsby-plugin-sanity-image'
import Cta from './Cta'

const Header = styled.header`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  // optional
  background: linear-gradient(
    0deg,
    var(--black) 0%,
    rgb(255, 127, 56) 31.51%,
    rgb(255, 196, 108) 66.75%,
    var(--white) 100%
  );
  img {
    max-width: 100%;
    max-height: 70rem;
    position: absolute;
    top: 15%;
    @media only screen and (max-width: 750px) {
      max-width: 100%;
      max-height: 100%;
      top: 0;
    }
    // Landscape View
    @media only screen and (max-height: 500px) {
      max-width: 100%;
      max-height: 100%;
      top: 0;
    }
  }

  @media only screen and (max-width: 565px) {
    height: calc(100vh - 26rem);
    top: 0;
  }
  // Landscape view
  @media only screen and (max-height: 600px) {
    height: calc(100vh - 13rem);
  }
`

const Alignment = styled.div`
  max-width: 108rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
`

const Right = styled.div`
  max-width: 50%;
  width: 50%;
  height: 100%;
  margin: 0 auto;
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 750px) {
    max-width: 100%;
    max-height: 50%;
    width: 100%;
    top: 0;
  }
  // Landscape View
  @media only screen and (max-height: 420px) {
    max-height: 100%;
    max-width: 50%;
  }
`

const Left = styled.div`
  max-width: 50%;
  width: 50%;
  height: 100%;
  margin: 0 auto;
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  @media only screen and (max-width: 750px) {
    max-width: 100%;
    width: 100%;
    max-height: 50%;
    bottom: 0;
  }
  // Landscape View
  @media only screen and (max-height: 420px) {
    max-height: 100%;
    max-width: 50%;
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
  .cta {
    align-self: end;
    @media only screen and (max-width: 750px) {
      align-self: center;
      margin: 0;
    }
  }

  // Mobile view
  @media only screen and (max-width: 750px) {
    height: 100%;
  }
  // @media only screen and (max-height: 500px) {
  //   height: calc(100% - 15rem);
  // }
`

const TitleContainer = styled.div`
  max-height: 10rem;
  display: flex;
  align-items: center;
  position: relative;
  margin: 2rem 0;
`

const Title = styled.h1`
  width: 100%;
  font-size: 4.5rem;
  text-transform: uppercase;
  line-height: 1.5;
  letter-spacing: 1.15rem;
  text-shadow: 0.1rem 0 0 var(--gray), -0.1rem 0 0 var(--gray),
    0 0.1rem 0 var(--gray), 0 -0.1rem 0 var(--gray);

  // Mobile view

  // Landscape view
  @media only screen and (max-height: 600px) {
    font-size: 3.75rem;
    margin: 0;
  }
`

const Motto = styled.h2`
  width: 100%;
  margin: 0;
  font-size: 2rem;
  color: gold;
  position: absolute;
  text-align: center;
  top: 40%;
  padding-right: 2rem;
  text-shadow: 0.1rem 0 0 var(--gray), -0.1rem 0 0 var(--gray),
    0 0.1rem 0 var(--gray), 0 -0.1rem 0 var(--gray);

  // Mobile view
  @media only screen and (max-width: 750px) {
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
          <Alignment>
            <Right>
              {node.image ? (
                <SanityImage
                  {...node.image}
                  alt={node.alt}
                  style={{
                    backgroundImage: 'fixed',
                    objectFit: 'cover',
                    auto: 'format',
                  }}
                />
              ) : (
                <div />
              )}
            </Right>
            <Left>
              <Container>
                <TitleContainer>
                  <Title>{node.title}</Title>
                  <Motto>{node.tagline}</Motto>
                </TitleContainer>
                <Cta />
              </Container>
            </Left>
          </Alignment>
        </Header>
      ))}
    </>
  )
}
