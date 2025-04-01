import { create } from 'zustand'
import type { CollaboratorStore } from '../collaborator-store/types'
import { INITIAL_COLLABORATOR_STORE_STATE } from '../collaborator-store/constants/initial-collaborator-store-state'

export const useZustandCollaboratorStore = create<CollaboratorStore>((set) => ({
  state: INITIAL_COLLABORATOR_STORE_STATE,
  actions: {
    setCollaborator(collaborator) {
      return set(({ state, actions }) => ({
        state: {
          ...state,
          collaborator,
        },
        actions,
      }))
    },

    setDayOffSchedule(dayOffSchedule) {
      return set(({ state, actions }) => ({
        state: {
          ...state,
          dayOffSchedule,
        },
        actions,
      }))
    },

    setWeekSchedule(weekSchedule) {
      return set(({ state, actions }) => ({
        state: {
          ...state,
          weekSchedule,
        },
        actions,
      }))
    },

    setTab(tab) {
      return set(({ state, actions }) => ({
        state: {
          ...state,
          tab,
        },
        actions,
      }))
    },

    resetStore() {
      return set(({ actions }) => ({
        state: INITIAL_COLLABORATOR_STORE_STATE,
        actions,
      }))
    },
  },
}))
