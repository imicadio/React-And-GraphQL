import { useState } from "react";

export default function useForm(initial ={}) {
    const [inputs, setInputs] = useState(initial);

    function handleChange(e) {
        let { value, name, type } = e.target;

        if(type === 'number') {
            value = parseInt(value);
        }

        if(type === 'file') {
            [value] = e.target.files;
        }

        setInputs({
            ...inputs,
            [name]: value
        });
    }

    function resetForm() {
        setInputs(initial);
    }

    function clearForm() {
        // map(([key, value]) => [key, '']) == map((value) => value[1] = '')
        // Object.entries - zamienia obiekt w tablice [key, value]
        // Object.fromEntries - tablice na obiekt { key: value }
        const blankState = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, '']));
        setInputs(blankState);
    }

    return {
        inputs,
        handleChange,
        resetForm,
        clearForm
    };
}