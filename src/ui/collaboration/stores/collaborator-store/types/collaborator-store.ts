import type { CollaboratorStoreActions } from './collaborator-store-actions'
import type { CollaboratorStoreState } from './collaborator-store-state'

export type CollaboratorStore = {
  state: CollaboratorStoreState
  actions: CollaboratorStoreActions
}
