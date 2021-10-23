export interface Event {
  _id: string
  banner: string
  title: string
  isActive: boolean
  url: string
  __v: number
}

export interface EventTableProps {
  events: Event[]
  deleteEvent: (eventId: string, eventTitle: string) => void
  toggleActiveEvent: (event: Event) => void
}

export interface CreatingEvent {
  title: string
  url: string
  banner: string
}

export interface LocationState {
  _id: string
}
