import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import DisplayError from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION(
            $email: String!
        ) {
        sendUserPasswordResetLink(email: $email) {
            code, 
            message
        }
    }
`;

export default function RequestReset() {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    });

    const [signup, {data, loading, error}] = useMutation(REQUEST_RESET_MUTATION, {
        variables: inputs,
        // refetch the currently logged in user
        // refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });

    async function handleSubmit(e) {
        e.preventDefault(); // stop the form from submitting
        console.log(inputs);
        const res = await signup().catch(console.error);
        console.log(res);
        console.log({data, loading, error});
        resetForm();
        // Send the email and password to the graphdqlAPI
    }

    // const error = data?.authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordFailure" ? data?.authenticateUserWithPassword : undefined;

    

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Request a Password Reset</h2>
            <DisplayError error={error} />
            <fieldset>
                {data?.sendUserPasswordResetLink === null && <p>Success! Check your email for a link!</p>}
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
                <button type="submit">Sign In!</button>
            </fieldset>
        </Form>
    );
}