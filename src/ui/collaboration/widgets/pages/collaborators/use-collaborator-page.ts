// import { useApi, useCache, useUrlParamNumber, useUrlParamString } from '../../../../global/hooks'
// import { PAGINATION, CACHE } from '@/@core/global/constants'

// export function useCollaboratorsPage() {
//   const [page, setPage] = useUrlParamNumber('page', 1)
//   const { collaboratorService } = useApi()
//   const [nameSearchvalue,setNameSearchValue] = useUrlParamString('name')
//   function handleNameSearchChange(name:string){
//     setNameSearchValue(name)
//   }
//   async function fetchLocations() {
//     const response = await collaboratorService.listCollaborators({
//       page,
//       name: nameSearchvalue
//     })
//     return response.body
//   }
//   const { data, isFetching, refetch } = useCache({
//     fetcher: fetchLocations,
//     dependencies: [page,nameSearchvalue],
//     key: CACHE.collaborator.key,
//   })
//   function handlePageChange(page: number) {
//     setPage(page)
//   }
//   function handleRegisterCollaborator() {
//     refetch()
//   }
//   const totalItems = data ? data.itemsCount : 0
//   return {
//     page,
//     totalPages: Math.ceil(totalItems / PAGINATION.itemsPerPage),
//     collaborators: data?.items,
//     isFetching,
//     handlePageChange,
//     nameSearchvalue,
//     handleNameSearchChange,
//     handleRegisterCollaborator,
//   }
// }
