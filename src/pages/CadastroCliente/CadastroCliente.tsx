import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../components/Input";

const CadastroClienteSchema = z.object({
    nome: z.string().min(8, "Precisa ter 8 caracteres"),
    phone: z.string().max(10, "Precisa ter 10 caracteres").regex(/^\d{10}$/, "incorreto"),
    email: z.string().email('Digite um email valido')
})

type CadastroClienteSchema = z.infer<typeof CadastroClienteSchema>

export function CadastroCliente() {
    const { register, handleSubmit, formState: { errors } } = useForm<CadastroClienteSchema>({
        resolver: zodResolver(CadastroClienteSchema)
    });


    const handleSubmitForm = (data: CadastroClienteSchema) => {
        console.log("data", data);
    }

    return (
        <div className="h-50 bg-zinc-400 p-5 rounded">
            <h1 className="text-2xl font-medium mb-2">Cadastro de Clientes</h1>
            <form className="flex flex-col text-left" onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="mb-1">
                    <Input className="p-2 w-full rounded" val="first" placeholder="Nome Completo" type="text" {...register("nome")} />
                    {errors.nome && <p className="text-sm text-red-800">{errors.nome.message}</p>}
                </div>
                <div className="mb-1">
                    <Input className="p-2 w-full rounded" val="second" placeholder="Telefone" type="tel" {...register("phone")} />
                    {errors.phone && <p className="text-sm text-red-800">{errors.phone.message}</p>}
                </div>
                <div className="mb-1">
                    <Input className="p-2 w-full rounded" val="third" placeholder="Email" type="email" {...register("email")} />
                    {errors.email && <p className="text-sm text-red-800">{errors.email.message}</p>}
                </div>

                <button type="submit" className="text-white bg-green-700 hover:bg-green-900">Enviar</button>
            </form>
        </div>
    )
}