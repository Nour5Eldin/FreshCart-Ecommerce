import React from 'react'
import Container from '../common/Container'
import Logo from '../common/Logo'
import SearchBar from './SearchBar'
import Offers from './Offers'
import CartIcon from './CartIcon'
import Account from './Account'
import MobileMenu from './MobileMenu'
import Deal from '@/components/header/Deal'

const Header = () => {
  return (
    <header className="py-5 sticky top-0 bg-tech_blue text-tech_white/80 backdrop:blur-md z-50">
          <Container className="flex items-center justify-between gap-5">
              <div className="flex items-center justify-start gap-2.5 lg:gap-0">
                  <MobileMenu/>
                  <Logo/>
              </div>
              <div className="flex items-center gap-5 lg:flex-1">
                  <SearchBar/>
                  <Offers/>
                  <Deal/>
                  <CartIcon/>
                  <Account/>
              </div>
      </Container>
    </header>
  )
}

export default Header
