import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserState } from '../../store/userStore';

const CadastroClienteMaterialSchema = z.object({
    nome: z.string().min(10, "Precisa ter 10 caracteres"),
    phone: z.string().min(11, "Precisa ter 11 números").max(11, "Precisa ter 11 números"),
    email: z.string().email('Digite um email valido'),
    senha: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Senha deve ter pelo menos 8 caracteres, conter letras maiúsculas e minúsculas, um número e um caractere especial.'),
    termos: z.boolean().refine(value => value === true, {
        message: "Você deve aceitar os termos."
    })
})


type CadastroClienteMaterialSchema = z.infer<typeof CadastroClienteMaterialSchema>


export function CadastroClienteMaterial() {

    const { user, registerUser } = useUserState();


    const createUserForm = useForm<CadastroClienteMaterialSchema>({
        resolver: zodResolver(CadastroClienteMaterialSchema)
    });

    const { register, handleSubmit, formState: { errors }, watch } = createUserForm

    const User = () => {

        const u = JSON.stringify(user)

        return (
            <>
                <p className="break-all text-sm mt-5"><code>{u}</code></p>
            </>
        )
    }

    const handleSubmitForm = (data: CadastroClienteMaterialSchema) => {
        registerUser(data)
    }

    const userName = watch('nome')
    const isCorrectName = userName && userName.length > 9 ? true : false

    const userEmail = watch('email')
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail);

    const phone = watch('phone')
    const isValidPhone = phone && phone.length === 11 ? true : false

    const userPassword = watch('senha')
    const isPasswordStrong = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(userPassword)

    const userTerms = watch('termos')
    const isCheckedTerms = userTerms === true ? true : false

    return (
        <Card className='p-5 flex flex-col w-96' shadow={true}>

            <form className="mt-8 mb-2 w-full max-w-screen-lg text-left" onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="mb-1 flex flex-col">

                    <div className='mb-2'>
                        <Typography variant="h6" color="blue-gray" className="-mb-1">
                            Seu Nome
                        </Typography>
                        <Input
                            size="lg"
                            onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/\d/g, '')}
                            placeholder="Nome"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            success={isCorrectName}
                            {...register("nome")}
                        />
                        {isCorrectName && <span className="text-sm text-green-400">Correto!</span>}
                        {errors.nome && <p className="text-sm text-red-800">{errors.nome.message}</p>}
                    </div>
                    <div className='mb-2'>
                        <Typography variant="h6" color="blue-gray" className="-mb-1">
                            Seu Email
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="nome@mail.com"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            {...register("email")}
                            success={isValidEmail}
                        />
                        {isValidEmail && <span className="text-sm text-green-400">Correto!</span>}
                        {errors.email && <p className="text-sm text-red-800">{errors.email.message}</p>}
                    </div>
                    <div className='mb-2'>
                        <Typography variant="h6" color="blue-gray" className="-mb-1">
                            Telefone
                        </Typography>
                        <Input
                            size="lg"
                            onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')}
                            placeholder="11999999999"
                            maxLength={11}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            success={isValidPhone}
                            {...register("phone")}
                        />
                        {isValidPhone && <span className="text-sm text-green-400">Correto!</span>}
                        {errors.phone && <p className="text-sm text-red-800">{errors.phone.message}</p>}
                    </div>
                    <div className='mb-2'>
                        <Typography variant="h6" color="blue-gray" className="-mb-1">
                            Senha
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            success={isPasswordStrong}
                            {...register("senha")}
                        />
                        {isPasswordStrong && <span className="text-sm text-green-400">Senha forte</span>}
                        {errors.senha && <span className="text-sm text-red-800">{errors.senha.message}</span>}
                    </div>
                </div>
                <Checkbox
                    label={
                        <Typography variant="small" color="gray" className="flex items-center font-normal">
                            Eu concordo com os
                            <a href="#" className="font-medium transition-colors hover:text-gray-900">
                                Termos e Condições
                            </a>
                        </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                    {...register("termos")}
                />
                {isCheckedTerms && <span className="text-sm text-green-400">Assinado</span>}
                {errors.termos && <p className="text-sm text-red-800">{errors.termos.message}</p>}
                <Button className="mt-6" fullWidth type='submit'>
                    Cadastrar
                </Button>
                {Object.keys(user).length > 0 && <User />}

                <Typography color="gray" className="mt-4 text-center font-normal">
                    Já tem uma conta?{" "}
                    <a href="#" className="font-medium text-gray-900">
                        Faça o login
                    </a>
                </Typography>
            </form>
        </Card>
    );
}
