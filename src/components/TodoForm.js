// https://www.robinwieruch.de/react-form/
import * as React from 'react';
import { addListEntry } from '@/callFuncts/dbFuncts';
const TodoEntry = ({ listElements, userToken, todoElementsUpdate, category }) => {
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
        if (form.desc != '') {
            addListEntry(form.desc, category, userToken);
            todoElementsUpdate(form.desc);
            // console.log(listElements);
            form.desc = '';
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col'>
                <label htmlFor="desc">Task Description</label>
                <input
                    className='text-black'
                    id="desc"
                    type="text"
                    value={form.desc}
                    onChange={handleChange} />
            </div>
            <button>Add New Entry To List</button>
        </form>
    );
};

export { TodoEntry };