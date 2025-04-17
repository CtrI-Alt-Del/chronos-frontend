import { useZustandCollaboratorStore } from '../zustand/use-zustand-collaborator-store'
import { INITIAL_COLLABORATOR_STORE_STATE } from './constants'
import type { CollaboratorStoreState } from './types'

export function useCollaboratorStore() {
  return {
    useCollaboratorSlice() {
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

    useDayOffScheduleSlice() {
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

    useTabSlice() {
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
