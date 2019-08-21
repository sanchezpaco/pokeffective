import React from 'react'
import { Button } from 'semantic-ui-react'


class CalculatorButton extends React.Component {
  calculate() {
    this.props.calculate()
  }

  render() {
    return(
        <Button
          size='massive'
          onClick={() => this.calculate()}
        >Calculate!
        </Button>
    )
  }
}

export default CalculatorButton 