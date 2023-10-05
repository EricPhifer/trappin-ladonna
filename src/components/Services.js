import { PortableText, defaultComponents } from '@portabletext/react'
import { graphql, useStaticQuery } from 'gatsby'
import SanityImage from 'gatsby-plugin-sanity-image'
import * as React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  height: 100%;
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-top: 2rem;
  z-index: 0;
  img {
    width: 30rem;
    height: 30rem;
    border-radius: 50%;
  }
  @media only screen and (max-width: 900px) {
    display: flex;
    flex-flow: column-reverse wrap;
  }
  @media only screen and (max-width: 340px) {
    img {
      width: 26rem;
      height: 26rem;
    }
  }
  // Landscape view
  @media only screen and (max-height: 600px) {
    height: calc(100% + 10rem);
  }
`

const Container = styled.div`
  width: 100%;
  p {
    padding: 0 5rem 1rem 0;
    font-size: 2.4rem;
  }
  // Mobile view
  @media only screen and (max-width: 750px) {
    height: 90%;
    p {
      padding: 0 0 1rem;
      font-size: 2rem;
    }
  }
  @media only screen and (max-height: 500px) {
    height: calc(100% - 15rem);
  }
`

const Title = styled.h3`
  margin: 0;
  padding: 2rem 0;
  font-size: 4rem;
  text-shadow: 0.1rem 0 0 var(--gray), -0.1rem 0 0 var(--gray),
    0 0.1rem 0 var(--gray), 0 -0.1rem 0 var(--gray);
  @media only screen and (max-width: 500px) {
    font-size: 2.5rem;
  }
`

export default function Services() {
  const { services } = useStaticQuery(graphql`
    query {
      services: allSanityServices {
        nodes {
          id
          title
          _rawContent
          alt
          source
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
  const { nodes } = services
  return (
    <>
      {nodes.map(node => (
        <Section key={node.id}>
          <Container>
            {/* <Title>{node.title}</Title> */}
            <PortableText
              value={node._rawContent}
              components={defaultComponents}
            />
          </Container>
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
        </Section>
      ))}
    </>
  )
}
