import { PortableText, defaultComponents } from '@portabletext/react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import SanityImage from 'gatsby-plugin-sanity-image'
import * as React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  width: 100%;
  min-height: 20rem;
  margin: 5rem 0;
  text-align: center;
`

const Slider = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 0 auto;
  perspective: 10rem;
`

const Reviews = styled.ol`
  max-width: 80rem;
  display: flex;
  align-items: baseline;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scroll-margin-top: 10rem;
  list-style-type: none;
  li {
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }
  &::-webkit-scrollbar {
    width: 1rem;
    height: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--black);
    border-radius: 1rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::marker {
    position: absolute;
    top: 0;
  }
`

const Review = styled.li`
  padding-top: 50vh;
  margin-top: -50vh;
  width: 100%;
  position: relative;
  border-radius: 1rem;
  flex: 0 0 100%;
`

const Nav = styled(Link)`
  width: 12.75rem;
  height: 4.75rem;
  margin: 0.25rem 0.75rem 0.5rem 0;
  padding: 0.75rem;
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 5rem;
  background: var(--black);
  color: var(--white);
  text-decoration: none;
  &:active {
    top: 0.1rem;
  }
  &:focus {
    background: var(--blue);
    color: var(--black);
  }
  &:hover {
    background: var(--blue);
    color: var(--black);
  }
`

const Content = styled.div`
  width: 80%;
  max-height: 30rem;
  margin: 0 auto;
  display: grid;
  grid-template-rows: repeat(2, minmax(auto, 1fr));
  justify-items: center;
  alight-content: center;
  overflow-x: auto;
  p {
    font-style: italic;
    font-size: 2rem;
  }
  p::before {
    content: '"';
  }
  p::after {
    content: '"';
  }
  @media only screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
`

const Top = styled.div`
  max-width: 50rem;
  margin: 1rem 1rem 1rem 0;
  display: inline-flex;

  @media only screen and (max-width: 500px) {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    p {
      max-width: 100%;
      padding: 2rem 0 0;
    }
  }
`

const Bottom = styled.div`
  width: 70%;
  margin: 1rem 0 3rem;
  text-align: right;
`

const H3 = styled.h3`
  font-size: 1.5rem;
  &::before {
    content: '- ';
  }
`

const Image = styled.div`
  img {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
  }
`

const ParaContainer = styled.div`
  max-width: calc(100% - 10rem);
  p {
    padding-bottom: 0.75rem;
  }
  @media only screen and (min-height: 501px) {
    padding-left: 3rem;
  }
`

export default function Testimonials() {
  const { testimonials } = useStaticQuery(graphql`
    query {
      testimonials: allSanityTestimonials {
        nodes {
          id
          name
          alt
          source
          _rawContent
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
  const { nodes } = testimonials
  return (
    <Section id="carousels-testimonial">
      <Slider>
        <Reviews className="testimonials">
          {nodes.map((node, index) => (
            <Review
              className="testimonial"
              id={`testimonial${index}`}
              key={node.id}
            >
              <Content>
                <Top>
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
                  <ParaContainer>
                    <PortableText
                      value={node._rawContent}
                      components={defaultComponents}
                    />
                  </ParaContainer>
                </Top>
                <Bottom>
                  <H3>{node.name}</H3>
                </Bottom>
              </Content>
            </Review>
          ))}
        </Reviews>
        <div className="navContainer">
          {nodes.map((node, index) => (
            <Nav to={`/#testimonial${index}`} key={node.id} id="nav-dots">
              {node.name}
            </Nav>
          ))}
        </div>
      </Slider>
    </Section>
  )
}
