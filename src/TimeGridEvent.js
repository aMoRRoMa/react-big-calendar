import get from 'lodash/get'

import React from 'react'
import cn from 'classnames'

import DefaultEventLabel from './EventLabel'

const getEventComponent = (componentsMap, type) =>
  get(componentsMap, type, null)

/* eslint-disable react/prop-types */
function TimeGridEvent(props) {
  const {
    style,
    className,
    event,
    event: { viewType: eventViewType, mainColor: eventMainColor, disabled },
    accessors,
    isRtl,
    selected,
    label,
    continuesEarlier,
    continuesLater,
    getters,
    onClick,
    onDoubleClick,
    components: {
      event: eventComponentsMap,
      eventWrapper: EventWrapper,
      label: EventLabelComponent,
    },
  } = props

  const EventLabel = EventLabelComponent || DefaultEventLabel
  const Event = getEventComponent(eventComponentsMap, eventViewType)

  let title = accessors.title(event)
  let tooltip = accessors.tooltip(event)
  let end = accessors.end(event)
  let start = accessors.start(event)

  let userProps = getters.eventProp(event, start, end, selected)

  let { height, top, width, xOffset } = style
  const inner = [
    <EventLabel key="1" {...props} />,
    <div key="2" className="rbc-event-content">
      {Event ? <Event event={event} title={title} /> : title}
    </div>,
  ]

  return (
    <EventWrapper type="time" {...props}>
      <div
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        style={{
          ...userProps.style,
          top: `${top}%`,
          height: `${height}%`,
          [isRtl ? 'right' : 'left']: `${Math.max(0, xOffset)}%`,
          width: `${width}%`,
        }}
        title={
          tooltip
            ? (typeof label === 'string' ? label + ': ' : '') + tooltip
            : undefined
        }
        className={cn(
          'rbc-event',
          `rbc-event-${eventViewType}`,
          eventMainColor && `rbc-event-main-color__${eventMainColor}`,
          disabled && `rbc-event-disabled`,
          className,
          userProps.className,
          {
            'rbc-selected': selected,
            'rbc-event-continues-earlier': continuesEarlier,
            'rbc-event-continues-later': continuesLater,
          }
        )}
      >
        {inner}
      </div>
    </EventWrapper>
  )
}

export default TimeGridEvent
