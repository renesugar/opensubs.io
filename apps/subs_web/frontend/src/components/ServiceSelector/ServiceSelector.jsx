import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import colors from 'constants/colors'
import Styles from './Styles'

class SelectorOption extends Component {
  constructor() {
    super()

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  handleMouseDown(event) {
    const { onSelect, option } = this.props

    event.preventDefault()
    event.stopPropagation()

    onSelect(option, event)
  }

  handleMouseEnter(event) {
    const { onFocus, option } = this.props

    onFocus(option, event)
  }

  handleMouseMove(event) {
    const { onFocus, option } = this.props

    onFocus(option, event)
  }

  render() {
    const { option, children } = this.props

    const style = {
      background: option.color,
      color: colors.textColorForBg(option.color),
    }

    return (
      <div
        className="Select-option"
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        title={option.label}
        style={style}
      >
        {children}
      </div>
    )
  }
}

SelectorOption.propTypes = {
  option: PropTypes.object.isRequired,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  children: PropTypes.string.isRequired,
}

SelectorOption.defaultProps = {
  onFocus: () => {},
  onSelect: () => { },
}

const SelectorValue = ({ value, children }) => (
  <div
    className="Select-value"
    title={value.value}
    style={{ background: value.color, borderRadius: 4 }}
  >
    <span className="Select-value-label" style={{ color: colors.textColorForBg(value.color) }}>
      {children}
    </span>
  </div>
)

SelectorValue.propTypes = {
  value: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
}

const ServiceSelector = ({ className, options, value, onChange }) => (
  <Styles>
    <Select
      className={className}
      options={options}
      value={value}
      onChange={option => onChange(option)}
      optionComponent={SelectorOption}
      valueComponent={SelectorValue}
    />
  </Styles>
)

ServiceSelector.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  className: PropTypes.string,
}

ServiceSelector.defaultProps = {
  value: 'custom',
  options: [],
  onChange: () => {},
}

export default ServiceSelector
