import { useRegisterCollaboratorForm } from "./use-register-collaborator-form";
import { Button, Input, Form, SelectItem, Select } from "@heroui/react";

type RegisterCollaboratorFormProps = {
  onCancel: VoidFunction;
  onSubmit: VoidFunction;
};

export const RegisterCollaboratorForm = ({
  onSubmit,
  onCancel,
}: RegisterCollaboratorFormProps) => {
  const { errors, isSubmiting, register, handleSubmit } = useRegisterCollaboratorForm({ onSubmit });

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        isRequired
        errorMessage={errors.name ? errors.name.message : ""}
        label="Nome"
        labelPlacement="outside"
        placeholder="Nome"
        {...register("name")}
      />
      {errors.name && <p>{errors.name.message}</p>}
      <Input
        isRequired
        errorMessage={errors.email ? errors.email.message : ""}
        label="Email"
        labelPlacement="outside"
        placeholder="Email"
        {...register("email")}
      />
      <Input
        errorMessage={errors.password ? errors.password.message : ""}
        label="Senha"
        labelPlacement="outside"
        placeholder="Senha"
        {...register("password")}
      />
      <Input
        errorMessage={errors.cpf ? errors.cpf.message : ""}
        label="CPF"
        labelPlacement="outside"
        placeholder="CPF"
        {...register("cpf")}
      />
      <Select className="max-w-xs" label="Cargo" placeholder="Cargo" {...register("role")}>
        <SelectItem key={"collaborator"}>Colaborador</SelectItem>
        <SelectItem key={"manager"}>Gestor</SelectItem>
      </Select>
      {errors.role && <p>{errors.role.message}</p>}
      <Input
        errorMessage={errors.sector ? errors.sector.message : ""}
        label="Setor"
        labelPlacement="outside"
        placeholder="Setor"
        {...register("sector")}
      />
      <div className="flex items-center gap-3">
        <Button onPress={onCancel} isDisabled={isSubmiting}>
          Cancelar
        </Button>
        <Button type="submit" color="primary" isLoading={isSubmiting}>
          <span className="text-zinc-50">Confirmar</span>
        </Button>
      </div>
    </Form>
  );
};
