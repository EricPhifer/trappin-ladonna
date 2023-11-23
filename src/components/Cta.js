import { Link } from 'gatsby'
import * as React from 'react'
import { PiCaretRightBold } from 'react-icons/pi'
import styled from 'styled-components'

const Buttonesque = styled(Link)`
  width: 22rem;
  margin-top: 4rem;
  background-color: var(--ctaback);
  color: var(--ctafore);
  border: 0.2rem solid var(--ctafore);
  padding: 1rem 2rem;
  font-size: 2.4rem;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: var(--ctafore);
    color: var(--ctaback);
    border: 0.2rem solid var(--ctaback);
  }
`

export default function Cta() {
  return (
    <Buttonesque to="/#contact" className="cta">
      Contact Now <PiCaretRightBold />
    </Buttonesque>
  )
}
