import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { AuthComponent } from '../components';
import { login, loginWithGoogle } from '../../auth/utils';
import { getFilteredDocuments, saveDocument } from '../../persistence/data-access';
import { writeMessageError } from '../../utils/write-message-error';
import './login.component.scss'

const googleButtonStyle = {
    backgroundColor: '#DB4437',
    borderColor: '#DB4437',
    color: '#fff',
}

const facebookButtonStyle = {
    backgroundColor: '#3b5998',
    borderColor: '#3b5998',
    color: '#fff',
}

export const LoginPageComponent = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const toast = useRef<Toast>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);
        const { email, password } = data;
        try {
            const { user: { uid } } = await login(email, password);
            const user = await getFilteredDocuments('users', [{ field: 'googleId', operator: '==', value: uid }]);
            if (user.length === 0) throw new Error('User not found');
            setIsLoading(false);
            navigate('/');
        } catch (err: unknown) {
            const message = writeMessageError(err);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
            setIsLoading(false);
        }
    });

    const handleGoogle = async () => {
        setIsLoading(true);
        try {
            const { user: { email, displayName, uid } } = await loginWithGoogle();
            const user = await getFilteredDocuments('users', [{ field: 'googleId', operator: '==', value: uid }]);

            if (user.length === 0) {
                await saveDocument('users', { googleId: uid, displayName, email })
            }

            setIsLoading(false);
            navigate('/');
        } catch (err) {
            const message = writeMessageError(err);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
            setIsLoading(false);
        }
    };

    return (
        <>
            <AuthComponent>
                <Toast ref={toast} />
                <Button label="Sign in with Facebook" icon="pi pi-facebook" className="text-left p-button-raised ml-auto mr-auto w-18rem mb-2" style={facebookButtonStyle} disabled={isLoading} />
                <Button label="sign in with Google" icon="pi pi-google" className="text-left p-button-raised ml-auto mr-auto w-18rem" style={googleButtonStyle} disabled={isLoading} onClick={handleGoogle} />
                <Divider align="center" className="w-18rem" >
                    <p className='text'>or</p>
                </Divider>
                <div className='w-18rem flex align-items-center flex-column'>
                    <form onSubmit={onSubmit}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: 'Email is required.' }}
                            render={({ field }) => (
                                <>
                                    <InputText placeholder="Email" type='email' id={field.name} {...field} className={classNames({ 'w-full mt-2': true, 'p-invalid': errors.email })} />
                                </>
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required.' }}
                            render={({ field }) => (
                                <>
                                    <Password placeholder="Password" id={field.name} {...field} feedback={false} toggleMask className={classNames({ 'w-full mt-2': true, 'p-invalid': errors.password })} />
                                </>
                            )}
                        />
                        <Button label="Sign In" className="p-button-raised ml-auto mr-auto w-full mt-2" onClick={() => handleSubmit} disabled={isLoading} loading={isLoading} />
                    </form >
                </div>
                <div>
                    <Link to='/forgot-password' className='text-center mt-4 text-sm'>
                        <p className='text-center mt-4 text-sm'>Did you forget your password?</p>
                    </Link>
                    <Link to='/register' className='text-center mt-2 text'>
                        <p className='text-center mt-2 text'>Sign up for free by clicking here!</p>
                    </Link>
                </div>
            </AuthComponent>
        </>
    );
}
