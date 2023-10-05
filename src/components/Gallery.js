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
  max-width: 80rem;
  display: flex;
  align-items: center;
`

const Logo = styled.li`
  width: 100%;
  max-height: 25rem;
`

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(auto, 1fr));
  justify-items: center;
  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`

const Image = styled.a`
  img {
    padding: 0 2rem;
    mix-blend-mode: plus-lighter;
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
      <Grid>
        {nodes.map((node, index) => (
          <Logos className="logos" key={node.id}>
            <Logo className="logo" id={`#logo[${index}]`}>
              <Image href={node.link} rel="noopener noreferrer" target="_blank">
                <SanityImage
                  {...node.image}
                  alt={node.alt}
                  style={{
                    width: '30rem',
                    height: '30rem',
                    objectFit: 'contain',
                    auto: 'format',
                  }}
                />
              </Image>
            </Logo>
          </Logos>
        ))}
      </Grid>
    </Section>
  )
}
