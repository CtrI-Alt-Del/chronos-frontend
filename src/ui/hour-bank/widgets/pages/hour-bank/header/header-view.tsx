type HeaderViewProps = {
  collaboratorName: string
  isCollaboratorItself: boolean
}

export const HeaderView = ({
  collaboratorName,
  isCollaboratorItself,
}: HeaderViewProps) => {
  return (
    <div>
      {isCollaboratorItself && (
        <h2 className='text-4xl font-semibold'>{collaboratorName}</h2>
      )}
      <p className='font-normal text-[#7C7C7C]'>
        {isCollaboratorItself
          ? 'Banco de horas do colaborador'
          : 'Resumo do seu saldo banco de horas'}
      </p>
    </div>
  )
}
