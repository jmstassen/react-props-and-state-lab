import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeType = (data) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: data
      }
    })
  }

  handleButtonClick = () => {
    const baseURL = "/api/"

    if (this.state.filters.type === "all") {
      fetch(baseURL + "pets")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          pets: data
        })
      })
    } else {
      fetch(baseURL + "pets?type=" + this.state.filters.type)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          pets: data
        })
      })
    }
  }
  
  handlePetAdopt = (petId) => {
    const updatedPets = this.state.pets.map(pet => {
      return pet.id === petId ? { ...pet, isAdopted: true} : pet;
    })

    this.setState({
      pets: updatedPets
    })
  }
  
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.handleButtonClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handlePetAdopt} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
