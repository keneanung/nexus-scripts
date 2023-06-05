---
id: default_events
sidebar_position: 5
---
# Standard Events

Event without manually adding any code to raise events, the event bus automatically raises some events automatically.
These are the following:

## `onGMCP`

argument: `{gmcp_method: string, gmcp_args: object}`

description: Raised when a GMCP message is received. The argument contains the actual GMCP message received as well as the data that came with it. This is basically forwarding the Nexus event within the event bus.

## GMCP method specific events

argument: `gmcp_args: object`

description: Each GMCP method raises its own event within the event bus. The argument is the data that came with the GMCP message. This allows to react to specific GMCP methogs without manual filtering.
