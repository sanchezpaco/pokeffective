import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const attackTypes = require('./attack_types_list.json')

const getAttackInfo = (attackTypeName) => {
  return attackTypes.filter((attackType) => { 
    return attackType.key === attackTypeName; 
  })[0]
}

class AttackTypesList extends React.Component {
  constructor() {
    super();
    this.saveAttack = this.saveAttack.bind(this)
  }

  saveAttack(event, data) {
    this.props.saveAttack(getAttackInfo(data.value))
  }

  render() {
    return (
      <Dropdown
        placeholder='Select attack type'
        fluid
        search
        selection
        defaultValue={attackTypes[0].key}
        onChange={this.saveAttack}
        options={attackTypes}
      />
    )
  }
}

export default AttackTypesList 