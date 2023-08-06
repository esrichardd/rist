import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { signup } from '../../auth/utils';
import { saveDocument } from '../../persistence/data-access';
import { AuthComponent } from '../components';
import { writeMessageError } from '../../utils/write-message-error';
import './register.component.scss'

const defaultValues = {
    email: "",
    name: "",
    lastname: "",
    password: "",
}

export const RegisterPageComponent = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
    });
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);
        try {
            const { name, lastname, email, password } = data;
            const { user: { uid } } = await signup(email, password)
            await saveDocument('users', { displayName: `${name} ${lastname}`, googleId: uid, email });
            setIsLoading(false);
            navigate('/login');
        } catch (err) {
            const message = writeMessageError(err);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
            setIsLoading(false);
        }
    });


    return (
        <>
            <Toast ref={toast} />
            <AuthComponent>
                <form onSubmit={onSubmit}>
                    <InputText placeholder="Email" type='email' className={classNames({ 'w-full': true, 'p-invalid': errors.email })} {...register("email", {
                        required: true,
                    })} />
                    <InputText placeholder="Name" className={classNames({ 'w-full mt-2': true, 'p-invalid': errors.name })} type='text' {...register("name", {
                        required: true,
                    })} />
                    <InputText placeholder="Lastname" className={classNames({ 'w-full mt-2': true, 'p-invalid': errors.lastname })} type='text' {...register("lastname", {
                        required: true,
                    })} />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'Password is required.' }}
                        render={({ field }) => (
                            <>
                                <Password placeholder="Password" id={field.name} {...field} inputRef={field.ref} feedback={false} toggleMask className={classNames({ 'w-full mt-2': true, 'p-invalid': errors.password })} />
                            </>
                        )}
                    />

                    <Button label="Register" type='submit' className="p-button-raised ml-auto mr-auto w-full mt-3" disabled={isLoading} loading={isLoading} />
                </form>
                <Link to='/login' className='text-center mt-2 text'>
                    <p className='text-center mt-2 text'>Do you already have an account? Register here!</p>
                </Link>
            </AuthComponent>
        </>
    );
}