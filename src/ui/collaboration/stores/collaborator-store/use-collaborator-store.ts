import { useZustandCollaboratorStore } from '../zustand/use-zustand-collaborator-store'
import { INITIAL_COLLABORATOR_STORE_STATE } from './constants'
import type { CollaboratorStoreState } from './types'

export function useCollaboratorStore() {
  return {
    getCollaboratorSlice() {
      const collaborator = useZustandCollaboratorStore(
        (store) => store.state.collaborator,
      )
      const setCollaborator = useZustandCollaboratorStore(
        (store) => store.actions.setCollaborator,
      )

      return {
        collaborator,
        setCollaborator,
      }
    },

    getDayOffScheduleSlice() {
      const dayOffSchedule = useZustandCollaboratorStore(
        (store) => store.state.dayOffSchedule,
      )
      const setDayOffSchedule = useZustandCollaboratorStore(
        (store) => store.actions.setDayOffSchedule,
      )

      return {
        dayOffSchedule,
        setDayOffSchedule,
      }
    },

    getWeekScheduleSlice() {
      const weekSchedule = useZustandCollaboratorStore(
        (store) => store.state.weekSchedule,
      )
      const setWeekSchedule = useZustandCollaboratorStore(
        (store) => store.actions.setWeekSchedule,
      )

      return {
        weekSchedule,
        setWeekSchedule,
      }
    },

    getTabSlice() {
      const tab = useZustandCollaboratorStore((store) => store.state.tab)
      const setTab = useZustandCollaboratorStore((store) => store.actions.setTab)

      return {
        tab,
        setTab,
      }
    },

    resetStore() {
      return useZustandCollaboratorStore.setState({
        state: INITIAL_COLLABORATOR_STORE_STATE,
      })
    },
  }
}

export const CollaboratorStore = {
  getState() {
    return useZustandCollaboratorStore.getState().state
  },
  setState(state: CollaboratorStoreState) {
    return useZustandCollaboratorStore.setState({ state })
  },
}
