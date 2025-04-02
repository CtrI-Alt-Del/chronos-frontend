import type { CollaboratorStoreState } from '../types'

export const INITIAL_COLLABORATOR_STORE_STATE: CollaboratorStoreState = {
  collaborator: null,
  dayOffSchedule: null,
  weekSchedule: [],
  tab: 'collaborator-tab',
}
