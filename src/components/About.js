import { PortableText, defaultComponents } from '@portabletext/react'
import { graphql, useStaticQuery } from 'gatsby'
import SanityImage from 'gatsby-plugin-sanity-image'
import * as React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  height: 100%;
  position: relative;
  z-index: 0;
  img {
    position: absolute;
    @media only screen and (max-height: 400px) {
      top: -5rem;
    }
  }
  // Mobile view
  @media only screen and (max-width: 500px) {
  }
  // Landscape view
  @media only screen and (max-height: 600px) {
    height: calc(100% + 10rem);
  }
`

const Container = styled.div`
  width: 100%;
  height: 90%;
  font-size: 2.4rem;
  padding: 2rem 0;
  // Mobile view
  @media only screen and (max-width: 750px) {
    height: 90%;
  }
  @media only screen and (max-height: 500px) {
    height: calc(100% - 15rem);
  }
`

const Image = styled.div`
  height: 35rem;
  display: flex;
  justify-content: center;
  background-color: var(--tan);
  img {
    max-width: 38rem;
    height: 35rem;
  }
`

export default function About() {
  const { about } = useStaticQuery(graphql`
    query {
      about: allSanityAbout {
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
  const { nodes } = about
  return (
    <>
      {nodes.map(node => (
        <Section key={node.id}>
          {node.image ? (
            <Image>
              <SanityImage
                {...node.image}
                alt={node.alt}
                style={{
                  objectFit: 'cover',
                  auto: 'format',
                }}
              />
            </Image>
          ) : (
            <div />
          )}
          <Container>
            <PortableText
              value={node._rawContent}
              components={defaultComponents}
            />
          </Container>
        </Section>
      ))}
    </>
  )
}
