import { graphql, useStaticQuery } from 'gatsby'
import SanityImage from 'gatsby-plugin-sanity-image'
import * as React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  width: 100%;
  min-height: 20rem;
  display: flex;
  margin: 5rem 0;
`

const Logos = styled.ol`
  width: 80rem;
  max-width: 80rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  gap: 1rem;
`

const Logo = styled.li`
  max-height: 25rem;
`

const Image = styled.a`
  img {
  }
`

export default function Gallery() {
  const { gallery } = useStaticQuery(graphql`
    query {
      gallery: allSanityGallery {
        nodes {
          id
          alt
          title
          source
          link
          image {
            asset {
              id
              publicUrl
            }
            ...ImageWithPreview
          }
        }
      }
    }
  `)
  const { nodes } = gallery
  return (
    <Section id="carousels-logo" aria-label="Logo Gallery">
      <Logos className="logos">
        {nodes.map((node, index) => (
          <Logo className="logo" id={`#logo[${index}]`} key={node.id}>
            <Image
              href={node.image.asset.publicUrl}
              title={node.alt}
              rel="noopener noreferrer"
              target="_blank"
            >
              <SanityImage
                {...node.image}
                alt={node.alt}
                style={{
                  width: '25rem',
                  height: '25rem',
                  objectFit: 'cover',
                  auto: 'format',
                }}
              />
            </Image>
          </Logo>
        ))}
      </Logos>
    </Section>
  )
}
