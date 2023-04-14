// https://www.robinwieruch.de/react-form/
import * as React from 'react';
const LoginForm = ({listElements,todoElementsUpdate}) => {
    const handleChange = (event) => {
        setForm({
            [event.target.id]: event.target.value,
        });
    };
    const [form, setForm] = React.useState({
        desc: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        todoElementsUpdate(form.desc);
        // console.log(listElements);
        alert(form.desc);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="desc">Task Description</label>
                <input
                    className='text-black'
                    id="desc"
                    type="text"
                    value={form.desc}
                    onChange={handleChange} />
            </div>
            <button>Submit</button>
        </form>
    );
};

export { LoginForm };