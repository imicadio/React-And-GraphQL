import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password){
            ... on UserAuthenticationWithPasswordSuccess {
                item {
                    id
                    name
                    email
                }
            }
            ... on UserAuthenticationWithPasswordFailure {
                code
                message
            }
        }        
    }
`;

export default function SignIn() {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: ''
    });

    const [signin, {data, loading}] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        // refetch the currently logged in user
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });

    async function handleSubmit(e) {
        e.preventDefault(); // stop the form from submitting
        console.log(inputs);
        const res = await signin();
        console.log(res);
        resetForm();
        // Send the email and password to the graphdqlAPI
    }

    const error = data?.authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordFailure" ? data?.authenticateUserWithPassword : undefined;

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Into Your Account</h2>
            <DisplayError error={error} />
            <fieldset>
                <label htmlFor="email">
                    Email
                    <input 
                        type="email"
                        name="email"
                        placeholder="Your email adsress"
                        autoComplete="email" 
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="password" 
                        value={inputs.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Sign In!</button>
                </label>
            </fieldset>
        </Form>
    );
}