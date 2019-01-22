import React from 'react'
import PropTypes from 'prop-types'

const EventLabel = ({ label }) => <div className="rbc-event-label">{label}</div>

EventLabel.propTypes = {
  label: PropTypes.string.isRequired,
}

export default EventLabel
