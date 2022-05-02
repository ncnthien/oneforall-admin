export interface EventsResponse {
  data: Event[]
  pagination: {
    limit: number
    page: number
    total: number
  }
}

export interface EventResponse {
  data: Event
}

export interface Event {
  createdAt: string
  description: string
  images: null | File | string[]
  title: string
  updatedAt: string
  __v: 0
  _id: string
}

export interface EventTableProps {
  events: Event[]
  deleteEvent: (eventId: string, eventTitle: string) => void
}

export interface CreatingEvent {
  title: string
  description: string
  images: File | null
}

export interface LocationState {
  _id: string
}
