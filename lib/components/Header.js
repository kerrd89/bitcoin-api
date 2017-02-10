import React from 'react';

const Header = ({ getTransactions, address }) => {
  return <header>
          <form name='enter-address' onSubmit={(e)=> {
            e.preventDefault();
            e.target.address.value = null;
            getTransactions(e.target.address.value)
          }}>
            <input placeholder="Enter Address" name="address"/>
            <button type='submit'>+</button>
          </form>
          <p className="selectedAddress">{address}</p>
        </header>
}

export default Header;
